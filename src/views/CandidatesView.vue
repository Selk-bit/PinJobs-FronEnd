<script setup lang="ts">
import {computed, onMounted, onUnmounted, reactive, ref, watch} from 'vue';
import type {ClickRowArgument, Header, Item} from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import {useCandidateStore} from "@/stores/candidate";
import {useRouter} from "vue-router";
import type {Candidate} from "@/types/candidate";
import {toast} from "vue-sonner";
import {getPrimary} from "@/utils/UpdateColors";
import {FormatDate} from "@/utils/helpers/useDate";
import {slugify} from "@/utils/helpers/slug";
import PdfViewer from "@/components/candidates/PdfViewer.vue";
import FileSaver from 'file-saver'
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import Template from "@/components/model-settings/sections/Template.vue";
import {useCustomizerStore} from "@/stores/customizer";
import {useDisplay} from "vuetify";
import {useProgressBarStore} from "@/stores/progress-bar";
import ProgressBar from "@/components/shared/ProgressBar.vue";
import {storeToRefs} from "pinia";
import Alert from "@/components/shared/Alert.vue";
import {useModelStore} from "@/stores/model";
import DocViewer from "@/components/shared/DocViewer.vue";
import UILoader from "@/components/shared/UILoader.vue";
import CustomConfirmationDialog from "@/components/shared/CustomConfirmationDialog.vue";
import SendInvitationLink from "@/components/shared/SendInvitationLink.vue";
import SkillsInput from "@/components/shared/SkillsInput.vue";
import {useSettingStore} from "@/stores/settings";
import CustomAlert from "@/components/shared/CustomAlert.vue";


const settings = useSettingStore();
const {filter_options} = storeToRefs(settings)
const router = useRouter();
const {t} = useI18n();
const {sm, mobile, md} = useDisplay();
const str = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);
const customizer = useCustomizerStore()
const progressStore = useProgressBarStore()
const candidateStore = useCandidateStore();
const modelStore = useModelStore();
const {progress,} = storeToRefs(progressStore)
const {user} = storeToRefs(useAuthStore());
const page = ref({title: t('Candidates.title')});
const clientId = ref<string>();
const candidateId = ref<string>('');
const responseMessage = ref('');

// filter props

const show_filter = ref<boolean>(false);
const filter_languages = ref<string[]>([]);

function clearFilter() {
  Object.assign(filter_options.value, initial_filter_values);
}


watch(
    () => filter_options.value.matchOnlySelectedSkills,
    (newValue) => {
      if (newValue) {
        filter_options.value.matchAtLeastOneSkill = false;
      }
    }
);

watch(
    () => filter_options.value.matchAtLeastOneSkill,
    (newValue) => {
      if (newValue) {
        filter_options.value.matchOnlySelectedSkills = false;
      }
    }
);

const isFilterApplied = computed(() => {
  return (
      filter_options.value.reference !== "" ||
      filter_options.value.name !== "" ||
      filter_options.value.email !== "" ||
      filter_options.value.selectedModels.length > 0 ||
      filter_options.value.skills.length > 0 ||
      filter_options.value.experienceRange[0] !== initial_filter_values.experienceRange[0] ||
      filter_options.value.experienceRange[1] !== initial_filter_values.experienceRange[1] ||
      filter_options.value.headline !== "" ||
      filter_options.value.selectedLanguages.length > 0 ||
      filter_options.value.certification !== ""
  );
});
const initial_filter_values = {
  reference: "",
  name: "",
  email: "",
  selectedModels: [] as string[],
  skills: [],
  experienceRange: [0, 30], // Default range for experience
  headline: "",
  selectedLanguages: [] as string[],
  certification: "",
  matchOnlySelectedSkills: false,
  matchAtLeastOneSkill: false,
}

function updateInclusions() {
  // Create a Set to ensure unique values
  const newLanguages = new Set();

  // Check selected languages and add relevant inclusions
  if (filter_languages.value.includes('en')) {
    newLanguages.add('english').add('inglés').add('anglais');
  }
  if (filter_languages.value.includes('fr')) {
    newLanguages.add('french').add('francés').add('français');
  }
  if (filter_languages.value.includes('ar')) {
    newLanguages.add('arabic').add('árabe').add('arabe').add('العربية');
  }
  // Convert the Set back to an array and update selectedLanguages
  filter_options.value.selectedLanguages = Array.from(newLanguages) as string[];
}


function hasActiveFilters() {
  return (
      filter_options.value.reference ||
      filter_options.value.name ||
      filter_options.value.email ||
      filter_options.value.selectedModels.length ||
      filter_options.value.skills.length ||
      filter_options.value.experienceRange.length !== 2 ||
      filter_options.value.headline ||
      filter_options.value.selectedLanguages.length ||
      filter_options.value.certification
  );
}

const filteredList = computed(() => {
  // Get the min and max values from the experience range
  const [minExperience, maxExperience] = filter_options.value.experienceRange;

  // Define a utility function for searching in objects
  const searchInObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj.toLowerCase().includes(searchValue.value.toLowerCase());
    }
    if (Array.isArray(obj)) {
      return obj.some((item) => searchInObject(item));
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some((value) => searchInObject(value));
    }
    return false;
  };
  // Filter candidates based on years of experience first
  const experienceFilteredCandidates = candidateStore.candidates?.filter((candidate: Candidate) => {
    const candidateExperience = parseInt(candidate.resumeData?.yoe || "0", 10);
    return candidateExperience >= minExperience && candidateExperience <= maxExperience;
  }) || [];

  // If no other filters are applied, return only the candidates filtered by experience
  if (!searchValue.value && !hasActiveFilters()) {
    return experienceFilteredCandidates;
  }

  // Apply other filters if experience matches
  return experienceFilteredCandidates.filter((candidate: Candidate) => {
    const searchValueLower = searchValue.value.toLowerCase();

    const inResumeData = searchInObject(candidate.resumeData ?? {});
    const inReference = searchInObject(candidate.reference ?? "");
    const inModelName = candidate.template?.name?.toLowerCase().includes(searchValueLower) ?? false;

    const matchesReference = filter_options.value.reference
        ? candidate.reference?.toLowerCase().includes(filter_options.value.reference.toLowerCase())
        : true;

    const matchesName = filter_options.value.name
        ? candidate.resumeData?.name?.toLowerCase().includes(filter_options.value.name.toLowerCase())
        : true;

    const matchesEmail = filter_options.value.email
        ? candidate.resumeData?.email?.toLowerCase().includes(filter_options.value.email.toLowerCase())
        : true;

    // const matchesModel = filter_options.value.selectedModels.length
    //     ? filter_options.value.selectedModels.map(model => model.toLowerCase())
    //         .includes(candidate.template?.name.toLowerCase() ?? '')
    //     : true;
    // const matchesModel = filter_options.value.selectedModels.length
    //     ? filter_options.value.selectedModels
    //         .map((model:string) => model.toLowerCase())
    //         .includes(candidate?.template?.name?.toLowerCase() as string)
    //     : true;

    // Skill matching logic
    const candidateSkills = candidate.resumeData?.skills?.map(s => s.skill.toLowerCase()) || [];
    const selectedSkills = filter_options.value.skills.map((skill: string) => skill.toLowerCase());

    let matchesSkills = true;

    // Only apply skill filtering if there are selected skills
    if (selectedSkills.length > 0) {
      if (filter_options.value.matchOnlySelectedSkills) {
        // Check if candidate has all selected skills as partial matches
        matchesSkills = selectedSkills.every(skill =>
            candidateSkills.some(candidateSkill => candidateSkill.includes(skill))
        );
      } else if (filter_options.value.matchAtLeastOneSkill) {
        // Check if candidate has at least one of the selected skills as a partial match
        matchesSkills = selectedSkills.some(skill =>
            candidateSkills.some(candidateSkill => candidateSkill.includes(skill))
        );
      }
    }

    const matchesHeadline = filter_options.value.headline
        ? candidate.resumeData?.headline?.toLowerCase().includes(filter_options.value.headline.toLowerCase())
        : true;


    const matchesLanguages = filter_options.value.selectedLanguages.length
        ? (candidate.resumeData.languages || []).some((lang) =>
            filter_options.value.selectedLanguages
                .map(language => language.toLowerCase())
                .includes(lang.language?.toLowerCase() ?? '')
        )
        : true;

    const matchesModel = filter_options.value.selectedModels.length
        ? (candidate.template?.name
            ? filter_options.value.selectedModels
                .map(model => model.toLowerCase())
                .includes(candidate.template.name.toLowerCase())
            : false)
        : true;

    const matchesCertification = filter_options.value.certification
        ? candidate.resumeData?.certifications?.some((cert) =>
            cert.certification?.toLowerCase().includes(filter_options.value.certification.toLowerCase())
        )
        : true;

    // Return candidates that match all other criteria
    return (
        (inResumeData || inReference || inModelName) &&
        matchesModel &&
        matchesReference &&
        matchesName &&
        matchesEmail &&
        matchesSkills &&
        matchesHeadline &&
        matchesLanguages &&
        matchesCertification
    );
  });
});


// const filteredList = computed(() => {
//   // Get the min and max values from the experience range
//   const [minExperience, maxExperience] = filter_options.value.experienceRange;
//
//   if (searchValue.value !== '' || hasActiveFilters()) {
//     const searchValueLower = searchValue.value.toLowerCase();
//
//     const searchInObject = (obj: any): any => {
//       if (typeof obj === 'string') {
//         return obj.toLowerCase().includes(searchValueLower);
//       }
//       if (Array.isArray(obj)) {
//         return obj.some((item) => searchInObject(item));
//       }
//       if (typeof obj === 'object' && obj !== null) {
//         return Object.values(obj).some((value) => searchInObject(value));
//       }
//       return false;
//     };
//
//     return candidateStore.candidates?.filter((candidate: Candidate) => {
//       // Extract years of experience from the candidate data
//       const candidateExperience = parseInt(candidate.resumeData?.yoe || "0", 10);
//       if (isNaN(candidateExperience)) {
//         console.warn(`Invalid experience value for candidate: ${candidate.resumeData?.name}`);
//         return false;
//       }
//
//       const matchesExperience = candidateExperience >= minExperience && candidateExperience <= maxExperience;
//
//       // Ensure the candidate's experience matches the filter range
//       if (!matchesExperience) {
//         return false;
//       }
//
//       // Other filter criteria, evaluated only if experience matches
//       const inResumeData = searchInObject(candidate.resumeData ?? {});
//       const inReference = searchInObject(candidate.reference ?? "");
//       const inModelName = candidate.template?.name?.toLowerCase().includes(searchValueLower) ?? false;
//
//       const matchesReference = filter_options.value.reference
//           ? candidate.reference?.toLowerCase().includes(filter_options.value.reference.toLowerCase())
//           : true;
//
//       const matchesName = filter_options.value.name
//           ? candidate.resumeData?.name?.toLowerCase().includes(filter_options.value.name.toLowerCase())
//           : true;
//
//       const matchesEmail = filter_options.value.email
//           ? candidate.resumeData?.email?.toLowerCase().includes(filter_options.value.email.toLowerCase())
//           : true;
//
//       const matchesModel = filter_options.value.selectedModels.length
//           ? filter_options.value.selectedModels.includes(candidate.template?.name ?? "")
//           : true;
//
//       // Skill matching logic
//       const candidateSkills = candidate.resumeData?.skills?.map(s => s.skill.toLowerCase()) || [];
//       const selectedSkills = filter_options.value.skills.map((skill: string) => skill.toLowerCase());
//
//       let matchesSkills = true;
//
//       if (filter_options.value.matchOnlySelectedSkills) {
//         // Check if candidate has all selected skills as partial matches
//         matchesSkills = selectedSkills.length > 0 && selectedSkills.every(skill =>
//             candidateSkills.some(candidateSkill => candidateSkill.includes(skill))
//         );
//       } else if (filter_options.value.matchAtLeastOneSkill) {
//         // Check if candidate has at least one of the selected skills as a partial match
//         matchesSkills = selectedSkills.length > 0 && selectedSkills.some(skill =>
//             candidateSkills.some(candidateSkill => candidateSkill.includes(skill))
//         );
//       } else {
//         // Default: matches if no skill filter is applied
//         matchesSkills = true;
//       }
//
//       const matchesHeadline = filter_options.value.headline
//           ? candidate.resumeData?.headline?.toLowerCase().includes(filter_options.value.headline.toLowerCase())
//           : true;
//
//       const matchesLanguages = filter_options.value.selectedLanguages.length
//           ? (candidate.resumeData?.languages || []).some((lang) =>
//               filter_options.value.selectedLanguages.includes(lang.language?.toLowerCase())
//           )
//           : true;
//
//       const matchesCertification = filter_options.value.certification
//           ? candidate.resumeData?.certifications?.some((cert) =>
//               cert.certification?.toLowerCase().includes(filter_options.value.certification.toLowerCase())
//           )
//           : true;
//
//       // Return candidates that match all other criteria after matching experience
//       return (
//           (inResumeData || inReference || inModelName) &&
//           matchesReference &&
//           matchesName &&
//           matchesSkills &&
//           matchesEmail &&
//           matchesModel &&
//           matchesHeadline &&
//           matchesLanguages &&
//           matchesCertification
//       );
//     });
//   } else {
//     // If no search or filters, return all candidates
//     return candidateStore.candidates;
//   }
// });


// data-table

const searchValue = ref('');
const headers: Header[] = [
  // {text: 'Reference', value: "reference", sortable: true},
  {text: t('Candidates.headers.name'), value: "name", sortable: true},
  {text: t('Candidates.headers.email'), value: "email", sortable: true},
  {text: t('Candidates.filter.exp'), value: "yoe", sortable: true},
  {text: 'Model', value: "template", sortable: true},
  // {text: 'Status', value: "resumeData.status", sortable: true},
  {text: t('Candidates.headers.createdAt'), value: "createdAt", sortable: true},
  {text: t('Candidates.headers.updatedAt'), value: "updatedAt", sortable: true},
  {text: t('Candidates.headers.oldResume'), value: "old_cv",},
  {text: t('Candidates.headers.newResume'), value: "new_cv",},
  {text: t('Candidates.headers.actions'), value: "actions",},

];


// link props + func
const send_link_to_candidate_dialog = ref(false);
const send_link_to_candidates_dialog = ref(false);
const sendEmailText = ref(t('Candidates.sendLink.send'))

function openEmailTab(id: string) {
  candidateId.value = id;
  send_link_to_candidate_dialog.value = true;
}

const _sendInvitationToAll = async (templateId: string) => {
  if (templateId == '') {
    toast.error('Template required')
  } else {
    try {
      // Create an array of promises using map, then await them with Promise.all
      const emailPromises = itemsSelected.value.map((item: Item) => {
        return _sendEmail(item.id, templateId, false);
      });

      // Wait for all email sending promises to resolve
      await Promise.all(emailPromises);

      // Show success message once all emails are sent
      toast.success('Emails sent to selected candidates');
      itemsSelected.value = [];

    } catch (err: any) {
      // Handle error
      toast.error(t('error'));
    }
  }
}

async function _sendEmail(candidateId: string, templateId: string, showMessage: boolean) {
  if (templateId == '' && showMessage) {
    toast.error('Template required');
  } else {
    try {
      loading.value = true;
      // await candidateStore.SEND_EMAIL_LINK(candidateId.value, selectedLang.value as Language, selectedTemplateId.value);
      await candidateStore.SEND_EMAIL_LINK(candidateId, templateId);

      if (showMessage) {
        toast.success(t('Candidates.sendLink.sendSuccess'));
      }
      // selectedLang.value = null;
      templateId = '';
      loading.value = false;
    } catch (err: any) {
      console.log(err);
      loading.value = false;
      toast.error('Error');

    } finally {
      sendEmailText.value = t('Candidates.sendLink.send');
    }
  }

}


// view candidate details
const ViewSelectedCandidate = async (item: ClickRowArgument) => {
  await router.push({
    name: 'candidate-details-view',
    params: {candidateId: item.id,}
  });

}
const ViewCandidate = async (id: string) => {
  await router.push({
    name: 'candidate-details-view',
    params: {candidateId: id,}
  });

}

// delete funcs + props
const deleteSingleItem = (id: string) => {
  delete_single_item_custom_message.id = id;
  delete_single_item_custom_message.dialog = true;
}

async function _delete(id: string, showMessage: boolean) {
  try {
    table_loading.value = true
    delete_single_item_custom_message.dialog = false;
    await candidateStore.DELETE(id);
    await candidateStore.GET_ALL_BY_CLIENT(clientId.value);
    table_loading.value = false
    if (showMessage) {
      toast.success(t('Resumes.toasts.itemDeleted'));
    }
  } catch (e: any) {
    toast.error(e);
  }
}

async function _deleteAll() {
  delete_items_custom_message.dialog = false;
  try {
    loader.value = true;
    // group all promises
    const deletePromises = itemsSelected.value.map((item: Item) => {
      _delete(item.id, false);
    });
    await Promise.all(deletePromises);
    loader.value = false;
    toast.success(t('Candidates.messages.deleteAllMessage'));
    itemsSelected.value = [];
  } catch (e: any) {
    toast.error(t('error'));
    console.log(e)
  }
}


const delete_items_custom_message = reactive({
  dialog: false,
  title: t('modals.deleteModal.confirmTitle'),
  text: t('modals.deleteModal.confirmText'),
  yes: t('modals.deleteModal.confirm'),
  cancel: t('modals.deleteModal.cancel')
})
const delete_single_item_custom_message = reactive({
  dialog: false,
  id: '',
  title: 'Delete Item',
  text: t('modals.deleteModal.confirmText'),
  yes: t('modals.deleteModal.confirm'),
  cancel: t('modals.deleteModal.cancel')
})

// error props
const ImportErrorDialog = ref(false);
const errorMessage = ref(t('error'))
let deleteConfirmationMessage = t('Candidates.deleteModal.confirmDeleteMessage')
const errorText = ref<string>('');
const showError = ref<boolean>(false);
const disableImport = computed(() => {
      if (user.value) {
        return user.value.credits <= 0;
      }
    }
);

function showUploadError(text: string) {
  errorText.value = text;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
    errorText.value = '';
  }, 3000);

}


// loading
const loader = ref(false);
const loading = ref(false);
const table_loading = ref(false);
const reloadData = async () => {
  try {
    table_loading.value = true;
    await candidateStore.GET_ALL_BY_CLIENT(clientId.value);
    table_loading.value = false;
    toast.success(t('Resumes.chargement.dataRefresh'));
  } catch (err: any) {
    toast.error("Une erreur s'est produite");
    toast.dismiss();
  }
}


// upload functions and props
const upload_candidates_popup = ref(false);
const import_dialog = ref(false);
// import refs
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref();

// actions
function handleFileChange() {
  files.value = fileInput.value?.files;
}


function onButtonClick() {
  window.addEventListener('focus', () => {

  }, {once: true})

  fileInput.value ? fileInput.value.click() : '';
}


function removeFile(index: any) {
  const fileListArr = Array.from(files.value);
  fileListArr.splice(index, 1)
  files.value = fileListArr;
}

const skipped = ref<string[]>([])

async function importCandidates() {
  skipped.value = []
  responseMessage.value = t('Resumes.chargement.waitText');
  let importedFiles = null;
  importedFiles = files?.value;
  if (importedFiles == null || Object.values(files?.value).length <= 0) {
    showUploadError(t('Resumes.chargement.importFile'));
  } else if (Object.values(files?.value).length > 5) {
    showUploadError(t('Resumes.chargement.importMaxFiles', {limit: 5}));
  } else if (Object.values(files?.value).some((file: any) =>
      !file.name.endsWith('.pdf') &&
      !file.name.endsWith('.docx'))) {
    showUploadError(t('Models.consultation.toasts.correctFormat'));
  } else {
    try {

      progressStore.startBuffer(t('Resumes.chargement.uploadingFiles'))
      upload_candidates_popup.value = true
      loading.value = true;
      import_dialog.value = false;
      let uploadResponse = await candidateStore.CREATE(importedFiles);
      if (uploadResponse?.data?.skipped.length > 0) {
        skipped.value = uploadResponse?.data?.skipped;
        responseMessage.value = t('Resumes.chargement.notFormated')
      }
      progressStore.setText(t('Resumes.chargement.extractingData'));
      files.value = []
      await candidateStore.GET_ALL_BY_CLIENT(clientId.value);
      // await useAuthStore().GET_CURRENT_USER();

    } catch (err: any) {
      const errData = err.response.data;
      console.log(err)
      if (errData.message === "No valid files were uploaded please verify if uploaded files are not scanned !") {
        ImportErrorDialog.value = true;
        errorMessage.value = t('Candidates.invalidFiles');
      }
      ImportErrorDialog.value = true;
      import_dialog.value = false;
      upload_candidates_popup.value = false
      files.value = []
      loading.value = false;
    }
  }

}


const uploadCandidateFileDialogHandle = () => {
  import_dialog.value = true;

}


function viewPDF(filename: string) {
  let link = str.value + filename;
  return link.replace(' ', '+');
}

function viewDoc(filename: string) {
  let link = str.value + filename;
  return link.replace(' ', '+');
}

const itemsSelected = ref<Item[]>([]);

async function downloadPDF(fileName: string, type: string, name: string) {
  try {
    const date = new Date().toISOString().split('T')[0];
    let slugified_name = slugify(name);
    let slugified_type = slugify(type);
    const pdf_name = `cv_${slugified_name}_${slugified_type}_${date}.pdf`;
    const pdfLink = import.meta.env.VITE_BACKBLAZE_ENDPOINT + fileName;
    FileSaver.saveAs(pdfLink, pdf_name);
    toast.success(t('Candidates.downloaded'));
  } catch (err: any) {
    toast.error("Une erreur s'est produite");
    toast.dismiss();
  }
}

function isPdf(resume: string) {
  // Check if the file ends with .pdf (case-insensitive)
  return resume?.toLowerCase().endsWith('.pdf');
}

watch(progress, async (val) => {
  if (val == 100) {
    await candidateStore.GET_ALL_BY_CLIENT(clientId.value);
    loading.value = false;
  }
})


function checkEmail(email: string) {
  if (email != null && email != '') {
    return false
  }
  return true
}

function closeFinishUpload() {
  upload_candidates_popup.value = false
  progress.value = 0;
}

onMounted(async () => {

  table_loading.value = true;
  if (!settings.filter_options.matchAtLeastOneSkill &&
      !settings.filter_options.matchAtLeastOneSkill) {
    settings.filter_options.matchAtLeastOneSkill = true;
  }
  await useAuthStore().GET_CURRENT_USER();
  await modelStore.GET_TEMPLATE_DRAFT_BY_CLIENT_ID(clientId.value)
  clientId.value = useAuthStore().user.clientProfileId;
  await modelStore.GET_ALL_BY_CLIENT_ID(clientId.value);
  await candidateStore.GET_ALL_BY_CLIENT(clientId.value);
  table_loading.value = false;
})

onUnmounted(() => {
  candidateStore.candidates = [] as Candidate[];
})
const date = ref()
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <div>
        <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
        <v-row justify="space-between" class="align-center mb-10">
          <v-col cols="12" md="12">
            <v-text-field
                type="text"
                class="mx-auto"
                variant="solo"
                density="comfortable"
                hide-details
                style="max-width: 700px;border-radius: 50% !important;"
                prepend-inner-icon="mdi-magnify"
                v-model="searchValue"
                :placeholder="t('Candidates.search')"
            >
              <template #append-inner >
                 <div class="d-flex  align-center justify-center my-n2">
                    <v-btn @click="show_filter = !show_filter" color="primary" variant="outlined">
                    <v-icon>mdi-filter-variant</v-icon>
                    <span class="ml-2">{{ t('filter') }}</span>
                  </v-btn>
                 </div>

              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class=" mb-1 ">
          <v-col>
            <v-btn variant="elevated" size="30" v-if="isFilterApplied" @click="clearFilter"
                   color="secondary" flat icon
                   class=" mt-1 mr-2 float-left">
              <v-icon>mdi-filter-off-outline</v-icon>
            </v-btn>
            <v-btn variant="elevated" size="30" @click="reloadData" color="primary" flat icon
                   class=" mt-1 mr-2 float-left">
              <v-icon>mdi-reload</v-icon>
            </v-btn>

            <v-btn variant="elevated" v-if="itemsSelected.length >0" size="30"
                   @click="delete_items_custom_message.dialog = true" color="error" flat
                   icon
                   class=" mt-1 mr-2 float-left">
              <v-icon>mdi-delete-sweep</v-icon>
            </v-btn>
            <v-btn variant="elevated" class="mt-1 mr-2" size="30" icon="mdi-link" flat
                   v-if="itemsSelected.length >0"
                   color="info" @click.stop="send_link_to_candidates_dialog = true"></v-btn>
            <v-btn variant="elevated" class="mt-1 mr-2" size="30" icon="mdi-eye" flat
                   v-if="itemsSelected.length == 1"
                   color="primary" @click.stop="ViewSelectedCandidate(itemsSelected[0])"></v-btn>
          </v-col>
          <v-col>
            <v-btn class="pb-1 float-right" variant="outlined" color="primary" @click="uploadCandidateFileDialogHandle">
              <v-icon size="30" class="mr-1">mdi-cloud-upload-outline</v-icon>
              {{ t('Resumes.chargement.loadCandidateData') }}
            </v-btn>
          </v-col>
        </v-row>
        <EasyDataTable

            v-model:items-selected="itemsSelected"
            :headers="headers"
            :theme-color="getPrimary"
            class=" customize-table cursor-pointer"
            :class="{ 'customize-table-dark': customizer.actTheme == 'DARK_GREEN_THEME',  }"
            @click-row="ViewSelectedCandidate"
            :items="filteredList"
            :loading="table_loading"
        >
          <template #empty-message>
            <v-icon size="30" class="text-primary">mdi-folder-search-outline</v-icon>
            <div class="text-primary">
              {{ t('Candidates.noDataFound') }}
            </div>
          </template>
          <template #loading>
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
          </template>

          <template #item-reference="{reference}">
            <v-chip color="success">{{ reference }}</v-chip>
          </template>
          <template #item-yoe="{resumeData}">
            <div class="d-flex justify-center">
              <v-chip color="success">
                {{ resumeData?.yoe != '' ? resumeData?.yoe + ' ' + t('common.timeAgo.year') + '(s)' : '--' }}
              </v-chip>

            </div>
          </template>
          <template #item-createdAt="{createdAt}">
            {{ FormatDate(createdAt) }}
          </template>
          <template #item-template="{template}">
            {{ template !== null ? template?.name : '------' }}
          </template>
          <template #item-resumeData.status="{resumeData}">
            <v-chip color="success">Validated</v-chip>
          </template>
          <template #item-updatedAt="{updatedAt}">
            {{ FormatDate(updatedAt) }}
          </template>
          <template #item-name="{ resumeData, resumeDataFr}">
            {{ resumeData?.name ?? resumeDataFr?.name }}
          </template>
          <template #item-email="{ resumeData, resumeDataFr}">
            {{ resumeData?.email ?? resumeDataFr?.email }}
          </template>
          <template #item-old_cv="{resume,  resumeData,resumeDataFr, template}">

            <v-btn variant="text" icon="mdi-cloud-download-outline"
                   :disabled="!(!!resume)"
                   @click.stop="downloadPDF(resume,' ',resumeData.name)"
                   color="gray"></v-btn>

            <PdfViewer
                :is-available="!!resume"
                v-if="isPdf(resume)"
                :name="resumeData?.name ?? resumeDataFr?.name"
                :link="viewPDF(resume)"
            />
            <DocViewer :disabled="!resume" :file-url="viewDoc(resume)" v-else/>
          </template>
          <template #item-new_cv="{formattedResume, resumeData,resumeDataFr, template}">
            <v-btn
                variant="text"
                icon="mdi-cloud-download-outline"
                :disabled="!(!!formattedResume)"
                @click.stop="downloadPDF(formattedResume,template.name,resumeData.name)"
                :color="!(!!formattedResume) ? 'error' : 'success'"></v-btn>

            <PdfViewer
                :is-available="!!formattedResume"
                :name="resumeData?.name?? resumeDataFr?.name"
                :link="viewPDF(formattedResume)"
            />
          </template>
          <template #item-actions="{id,resumeData,resumeDataFr,}">
            <div>
              <span v-if="!mobile">
                <v-btn variant="text" icon="mdi-link"
                       :disabled="checkEmail(resumeData?.email ?? resumeDataFr?.email)"
                       color="info" @click.stop="openEmailTab(id)"></v-btn>
              <v-menu
                  :close-on-content-click="true"
                  location="end"
              >
                <template v-slot:activator="{ props, close}">
                  <v-btn
                      @click.stop=""
                      color="error"
                      icon="mdi-trash-can-outline"
                      variant="text"
                      v-bind="props"
                  >

                  </v-btn>
                </template>

                <v-card color="lightprimary" class="pa-3">
                  <div class="">
                    <div class="d-flex align-center">
                      <v-icon color="warning">mdi-alert-circle-outline</v-icon>
                      {{ deleteConfirmationMessage }}
                    </div>
                    <div class="mt-1 float-end">
                      <v-btn size="small" class="mr-1" color="primary darken-1" @click="_delete(id,true)" text>
                        {{ t('Candidates.deleteModal.yes') }}
                      </v-btn>
                      <v-btn size="small" class="mr-1" color="grey" variant="outlined" text>
                        {{ t('Candidates.deleteModal.cancel') }}
                      </v-btn>
                    </div>
                  </div>

                </v-card>
              </v-menu>
              </span>
              <v-btn size="30" icon variant="plain" v-else>
                <v-avatar size="22">
                  <v-icon class="text-primary">mdi-dots-vertical</v-icon>
                </v-avatar>
                <v-menu activator="parent">
                  <v-list>
                    <v-list-item value="action" hide-details
                                 @click="ViewCandidate(id)"
                                 min-height="38">
                      <v-list-item-title>
                        <v-avatar size="20" class="mr-2">
                          <v-icon>mdi-view-carousel-outline</v-icon>
                        </v-avatar>
                        {{ $t('Models.consultation.visualize') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item value="action" hide-details
                                 min-height="38">
                      <v-list-item-title @click="deleteSingleItem(id)">
                        <v-avatar size="20" class="mr-2">
                          <component is="TrashIcon" stroke-width="2" size="20"/>
                        </v-avatar>
                        {{ t('Models.consultation.delete') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item value="action" hide-details
                                 min-height="38">
                      <v-list-item-title @click="openEmailTab(id)">
                        <v-avatar size="20" class="mr-2">
                          <v-icon size="20">mdi-link</v-icon>
                        </v-avatar>
                        {{ t('Models.consultation.send') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </div>


          </template>
        </EasyDataTable>
        <div>
        </div>
      </div>
    </v-col>
  </v-row>

  <v-dialog v-model="ImportErrorDialog" class="pa-6" max-width="400">
    <v-card>
      <div class="d-flex justify-center mt-4">
        <v-icon size="90" color="error">mdi-close-circle-outline</v-icon>
      </div>
      <v-card-title class="text-h5 text-center">Error</v-card-title>
      <v-card-text class="text-center">
        {{ errorMessage }}
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" class="float-right" @click="ImportErrorDialog = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="import_dialog" class="backdrop" width="600px" persistent>

    <v-card class="pa-2 " rounded="lg">
      <v-card-text class="text-h3">{{ t('Resumes.chargement.chooseFileImport') }}
      </v-card-text>
      <v-file-input
          class="d-none"
          show-size
          type="file"
          color="secondary"
          ref="fileInput"
          @change="handleFileChange"
          accept=".pdf, .docx"
          multiple
          variant="outlined"
      ></v-file-input>
      <v-container>

        <div
            @click="onButtonClick"
            class="drag-drop-area"
            @dragover.prevent
            @dragenter.prevent
        >
          <v-icon color="primary" class="mr-2" size="30">mdi-cloud-upload</v-icon>
          <div>{{ t('Resumes.chargement.clickToUploadFiles') }}</div>

          <div class="text-subtitle-1">{{ t('Resumes.chargement.maxFiles', {limit: 5}) }}</div>
        </div>
        <div v-if="files && files.length" class="file-list my-2 ">
          <h3>Files ({{ files.length }})</h3>
          <ul class="overflow-y-auto mb-3 " style="max-height: 300px">
            <li v-for="(file, index) in files" :key="index">
              <span>{{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)</span>
              <v-btn icon variant="text" @click="removeFile(index)">
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
            </li>
          </ul>
        </div>

      </v-container>
      <v-card-actions>
        <v-row class="d-flex justify-center mt-3">
          <v-col>
            <v-btn size="large" block variant="outlined" @click="import_dialog = false">
              {{ t('Resumes.chargement.cancel') }}
            </v-btn>
          </v-col>
          <v-col>

            <v-tooltip :text="disableImport ? 'Crédits insuffisants': 'Importer'">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="pa-0 ma-0">

                <v-btn size="large" block :variant="disableImport ? 'tonal': 'elevated' " color="primary"
                       :disabled="disableImport"
                       @click="importCandidates"
                       :loading="loading"
                >
                  {{ t('Resumes.chargement.import') }}
                </v-btn>
                </span>
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="12">

            <Alert :show="showError" :text="errorText"/>
          </v-col>
        </v-row>
      </v-card-actions>

    </v-card>
  </v-dialog>
  <!--  delete for multiple items-->
  <CustomConfirmationDialog
      :cancel-text-button="delete_items_custom_message.cancel"
      :confirm-text-button="delete_items_custom_message.yes"
      :dialog="delete_items_custom_message.dialog"
      :text="delete_items_custom_message.text"
      @accept="_deleteAll"
      @reject="delete_items_custom_message.dialog= false"
      :title="delete_items_custom_message.title"/>
  <!--  delete for a single item-->
  <CustomConfirmationDialog
      :cancel-text-button="delete_single_item_custom_message.cancel"
      :confirm-text-button="delete_single_item_custom_message.yes"
      :dialog="delete_single_item_custom_message.dialog"
      :text="delete_single_item_custom_message.text"
      @reject="delete_single_item_custom_message.dialog = false"
      @accept="_delete(delete_single_item_custom_message.id,true)"
      :title="delete_single_item_custom_message.title"/>
  <v-dialog v-model="upload_candidates_popup" class="backdrop" max-width="900" persistent>
    <v-card rounded="xl" class=" d-flex justify-center align-center ma-3 pa-4  my-6 flex-column">

      <v-expand-transition v-if="progress == 100">
        <div class="d-flex justify-center align-center flex-column my-3">
          <v-icon size="90" color="primary">mdi-check-decagram</v-icon>
          <div class="text-primary text-h2 mb-4 ">
            Success!
          </div>
        </div>
      </v-expand-transition>
      <ProgressBar class="my-3"/>
      <div class="text-center text-h4 my-3">

        <div v-if="skipped.length <= 0">
          {{ responseMessage }}
        </div>
        <div v-else>
          <v-alert

              border="start"
              rounded="xl"
              close-label="Close Alert"
              color="info"
              title="Attention"
              density="compact"
              variant="tonal"

              icon="mdi-alert-circle-outline"
          >


            <div v-for="candidate in skipped" :key="candidate">
              <v-row class="text-start" density="compact">
                <v-col cols="12" class="text-h6 ">
               <span> <v-icon color="error" v-if="isPdf(candidate)">mdi-file-pdf-box</v-icon>
                <v-icon color="info" v-else>mdi-microsoft-word</v-icon></span>
                  <span class="font-weight-bold ">{{ candidate }} </span> <span>{{ responseMessage }}</span>
                </v-col>
              </v-row>


            </div>
          </v-alert>

        </div>

      </div>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn :loading="loading" class="mt-4 mr-3" @click="closeFinishUpload" color="secondary" variant="outlined"
                 rouned="xl">
            {{ t('Resumes.chargement.close') }}
          </v-btn>
        </v-col>
      </v-row>

    </v-card>
  </v-dialog>
  <SendInvitationLink :dialog="send_link_to_candidate_dialog"
                      :loading="loading"
                      :items="modelStore.models"
                      @send-link="(val:string) => _sendEmail(candidateId,val,true)"
                      @close="send_link_to_candidate_dialog = false"
                      :send-email-text="sendEmailText"/>
  <SendInvitationLink :dialog="send_link_to_candidates_dialog"
                      :loading="loading"
                      :items="modelStore.models"
                      @send-link="(val:string) => _sendInvitationToAll(val)"
                      @close="send_link_to_candidates_dialog = false"
                      :send-email-text="sendEmailText"/>
  <v-overlay v-model="loader" v-if="loader" class="d-flex justify-center align-center">

    <UILoader/>
  </v-overlay>
  <v-navigation-drawer
      width="600"

      location="right"
      temporary
      v-model="show_filter"
  >
    <v-row class="ma-2 mt-3 ">
      <!-- Header for Apply Filters -->
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <div class="text-h6">{{ t('Candidates.filter.apply-filters') }}</div>
        <v-btn icon="mdi-close" @click="show_filter = false"></v-btn>
      </v-col>

      <!-- Reference -->
      <v-col cols="12" lg="6">
        <v-text-field
            :label="t('Candidates.filter.reference')"
            v-model="filter_options.reference"
            outlined
        ></v-text-field>
      </v-col>

      <!-- Name -->
      <v-col cols="12" lg="6">
        <v-text-field
            :label="t('Candidates.filter.name')"
            v-model="filter_options.name"
            outlined
        ></v-text-field>
      </v-col>

      <!-- Email -->
      <v-col cols="12">
        <v-text-field
            :label="t('Candidates.filter.email')"
            v-model="filter_options.email"
            outlined
        ></v-text-field>
      </v-col>

      <!-- Model (Multiple Selection) -->
      <v-col cols="12">
        <v-select
            :items="modelStore.models"
            :label="t('Candidates.filter.models')"
            v-model="filter_options.selectedModels"
            multiple
            item-title="name"
            item-value="name"
            outlined
            chips

        ></v-select>
      </v-col>


      <!-- Skills (Assuming it's a custom component ready for multiple values) -->
      <v-col cols="12">
        <div class="text-h6 mb-3">{{ t('Candidates.filter.skills') }}</div>
        <v-col cols="12" class="d-flex flex-column">
          <v-checkbox
              v-model="filter_options.matchOnlySelectedSkills"
              :label="t('Candidates.filter.only-selected')"
              class="text-wrap"
          ></v-checkbox>

          <v-checkbox
              v-model="filter_options.matchAtLeastOneSkill"
              :label="t('Candidates.filter.at-least-one')"

          ></v-checkbox>
        </v-col>
        <div>
          <CustomAlert title="" color="info" :message="t('Candidates.filter.skill-tip')"/>
        </div>
        <SkillsInput
            v-model:skillsList="filter_options.skills"
            :customPlaceholder="t('Candidates.filter.skills')"
        ></SkillsInput>
      </v-col>

      <!-- Experience Range Slider -->
      <v-col cols="12">
        <div class="text-h6 mb-8">{{ t('Candidates.filter.exp') }}</div>
        <v-range-slider
            v-model="filter_options.experienceRange"
            :min="0"
            :max="30"
            :step="1"
            thumb-label="always"
            outlined
        ></v-range-slider>
      </v-col>

      <!-- Title -->
      <v-col cols="12">
        <v-text-field
            :label="t('Candidates.filter.headline')"
            v-model="filter_options.headline"
            outlined
        ></v-text-field>
      </v-col>

      <!-- Languages -->
      <div class="text-h6 ml-3">{{ t('Candidates.filter.languages') }}</div>
      <v-col cols="12" class="d-flex justify-start">
        <v-checkbox
            v-model="filter_languages"
            @change="updateInclusions"
            label="English"
            value="en"
            :true-value="'en'"
            :false-value="null"
        ></v-checkbox>
        <v-checkbox
            v-model="filter_languages"
            label="French"
            value="fr"
            @change="updateInclusions"
            :true-value="'fr'"
            :false-value="null"
        ></v-checkbox>
        <v-checkbox
            v-model="filter_languages"
            label="Arabe"
            value="ar"
            @change="updateInclusions"
            :true-value="'ar'"
            :false-value="null"
        ></v-checkbox>
      </v-col>

      <!-- Certification -->
      <v-col cols="12">
        <v-text-field
            :label="t('Candidates.filter.certification')"
            v-model="filter_options.certification"
            outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-navigation-drawer>


</template>


<style scoped lang="scss">
.drag-drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  height: 100px;

  border-radius: 25px;
  transition: background-color 0.3s;
}

.drag-drop-area:hover {
  background-color: rgba(140, 212, 222, 0.26); /* A lighter shade close to the primary color */
}

.file-list ul {

  list-style-type: none;
  padding: 0;
}

.file-list li {
  display: flex;
  border-radius: 20px;
  border: 1px solid black;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
}


</style>