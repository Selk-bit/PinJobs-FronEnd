<script setup lang="ts">
import {ref, computed, onMounted, reactive} from 'vue';
import type {ClickRowArgument, Header, Item} from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import type {Template} from "@/types/model";
import {FormatDate} from "@/utils/helpers/useDate";
import {router} from "@/router";
import {useI18n} from "vue-i18n";
import CustomTag from "@/components/shared/CustomTag.vue";
import {toast} from "vue-sonner";
import docs from "@/assets/images/svgs/docs.svg"
import {modelComponents} from "@/models-imports";
import ModelSettings from "@/components/model-settings/ModelSettings.vue";
import {useAuthStore} from "@/stores/auth";
import {useCustomizerStore} from "@/stores/customizer";
import type {Language} from "@/types/language";
import '@mayank1513/vue-tag-input/style.css'
import {defineComponent} from 'vue';
import {useCandidateStore} from "@/stores/candidate";
import {validateEmail} from "@/utils/helpers/validate-email";
import {getPrimary} from "@/utils/UpdateColors";
import Customizer from "@/layouts/full/customizer/Customizer.vue";
import {storeToRefs} from "pinia";
import type {ImportedTemplateDTO} from "@/types/imported-templates";
import Alert from "@/components/shared/Alert.vue";
import EmailInputTips from "@/components/consultation/EmailInputTips.vue";
import CustomConfirmationDialog from "@/components/shared/CustomConfirmationDialog.vue";
import type {User} from "@/types/user";


const modelStore = useModelStore();
const candidateStore = useCandidateStore();
const resumeStore = useResumeStore();
const user = ref<User>()
const {model} = storeToRefs((modelStore));
const {t} = useI18n()
const page = ref({title: t('Models.consultation.title')});
const breadcrumbs = ref([
  {
    text: t('Models.consultation.breadcrumbs.models'),
    disabled: false,
    href: "#",
  },
  {
    text: t('Models.consultation.breadcrumbs.consultation'),
    disabled: true,
    href: "#",
  },
]);
const alert = ref(true)

const importedFileDto = ref<ImportedTemplateDTO>({
  name: '',
  file: {} as File,
})

const index = ref()
const template = ref({} as Template)
const delete_dialog = ref()
const searchValue = ref('');
const headers: Header[] = [
  {text: t('Models.consultation.headers.name'), value: "name", sortable: true},
  {text: t('cvs.tech.language.language'), value: "language", sortable: true},
  {text: t('Models.consultation.headers.createdAt'), value: "createdAt", sortable: true},
  {text: t('Models.consultation.headers.updatedAt'), value: "updatedAt", sortable: true},
  {text: t('Models.consultation.headers.actions'), value: "actions"}

];

// send link
const link_dialog = ref(false)
const selectedLang = ref<Language | null>();
const emailList = ref<string[]>([])
const selectedTemplate = ref<Template>();

function handleChangeTag(tags: string[]) {
  emailList.value = tags;
}

const openCreateDraftsDialog = (item: Template) => {
  selectedTemplate.value = item;
  link_dialog.value = true;
}

const ViewSelectedModel = async (item: ClickRowArgument) => {
  visualizeModal(item as Template);
}


const sendEmailText = ref(t('Candidates.sendLink.send'))
const sendDrafts = async () => {
  if (!Array.isArray(emailList.value) || emailList.value.length === 0) {
    toast.info(t('Models.consultation.toasts.emailsRequired'))
  } else {
    try {
      loading.value = true;
      await candidateStore.CREATE_DRAFT(emailList.value, selectedTemplate.value?.id as string);
      sendEmailText.value = t('Candidates.sendLink.send');
      toast.success(t('Candidates.sendLink.sendSuccess'));
      emailList.value = []
      loading.value = false;
    } catch (err: any) {
      console.log(err);
      loading.value = false;
      toast.error(t('error'));
    }
  }
}
// send link


const table_loading = ref(false);
const loading = ref(false);

const filteredList = computed(() => {
  if (searchValue.value !== '') {
    return modelStore.models?.filter((model: Template) => {
      return model.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  } else {
    return modelStore.models;
  }

});

const errorText = ref<string>('');
const showError = ref<boolean>(false);

function showUploadError(text: string) {
  errorText.value = text;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
    errorText.value = '';
  }, 3000);

}

const visualize_dialog = ref(false);
const edit_dialog = ref(false);

function visualizeModal(item: Template) {
  model.value = item
  resumeStore.PreLoad();
  visualize_dialog.value = true;
}


// upload functions and props
const upload_candidates_popup = ref(false);
const import_dialog = ref(false);
// import refs
const fileInput = ref<HTMLInputElement | null>(null);
const file = ref();

// actions
function handleFileChange() {
  file.value = fileInput.value?.files![0];
  console.log(file.value)
}


function onButtonClick() {
  window.addEventListener('focus', () => {

  }, {once: true})

  fileInput.value ? fileInput.value.click() : '';
}


//
function removeFile(index: any) {

  file.value = null;
}

function handleDrop(event: any) {
  const dropppedfiles = event.dataTransfer.files;
  // files.value = [files.value,...dropppedfiles]
  // handleFileChange();
}

const disableImport = computed(() => {
      if (user.value) {
        return user.value?.credits <= 0;
      }
    }
);

async function importFile() {
  const fileName = file?.value?.name;
  console.log(fileName)
  importedFileDto!.value!.file = file.value;

  // Check if the file has a valid extension (.pdf, .doc, or .docx)
  if (!(fileName?.endsWith('.pdf') || fileName?.endsWith('.doc') || fileName?.endsWith('.docx'))) {
    showUploadError(t('Models.consultation.toasts.correctFormat'));
    // Proceed with the file upload or further processing
  } else if (importedFileDto.value.name == '') {

    showUploadError(t('Models.consultation.toasts.nameRequired'));
  } else {
    try {
      loading.value = true
      await modelStore.UPLOAD_TEMPLATE(importedFileDto.value as ImportedTemplateDTO);
      loading.value = false
      import_dialog.value = false
      toast.success(t('Models.consultation.toasts.templateUploadSuccess'))
    } catch (err: any) {
      const errData = err.response.data;
      if (errData.message == "Client already has an unfinished imported template !") {
        toast.info(t('Models.consultation.toasts.templateAlreadyExist'))
      }
      console.log(err);
    }
    loading.value = false
  }
}

const uploadCandidateFileDialogHandle = () => {
  import_dialog.value = true;

}

function editModal(item: Template) {
  modelStore.showCreateBtn = false;
  modelStore.showTemplateSection = false;
  template.value = item
  modelStore.SetModel(item);
  edit_dialog.value = true;
}

async function editTemplate() {
  if (modelStore.model.name == null || modelStore.model.name == '') {
    toast.error('Name empty');
  } else {
    try {
      loading.value = true;
      await modelStore.UPDATE_TEMPLATE({
        reference: template.value.reference,
        language: model.value.language,
        name: template.value.name,
        clientProfileId: useAuthStore().user.clientProfileId,
        templateData: template.value.templateData
      }, template.value.id);
      edit_dialog.value = false;
      await modelStore.GET_ALL_BY_CLIENT_ID(useAuthStore().user.clientProfileId);
      toast.success(t('Models.consultation.toasts.modelUpdated'));
      loading.value = false;

    } catch (e: any) {
      console.log(e.response.data.message.toString());
      loading.value = false;
      toast.error(e.response.data.message.toString())
    }
  }

}

function deleteModal(id: string) {
  delete_dialog.value = true;
  index.value = id;
}

const delete_item_custom_message = reactive({
  dialog: false,
  title: 'Delete Items',
  text: 'This action will delete this item permanently,you want to proceed?',
  yes: 'Yes, delete',
  cancel: 'Cancel'
})

async function confirmDelete() {
  // delete_item_custom_message.dialog = false;
  try {
    delete_dialog.value = false;
    loading.value = true;
    table_loading.value = true
    await modelStore.DELETE_TEMPLATE(index.value);
    loading.value = false;
    index.value = "";
    toast.success(t('Models.consultation.toasts.modelDeleted'))
    await modelStore.GET_ALL_BY_CLIENT_ID(useAuthStore().user.clientProfileId);
    table_loading.value = false
  } catch (err) {
    console.log(err);
  }
}

async function goToCreateTemplate() {
  modelStore.InitModel();
  await router.push("/models-creation")
}


onMounted(async () => {
  table_loading.value = true;
  await useAuthStore().GET_CURRENT_USER();
  user.value = useAuthStore().user;
  await modelStore.GET_ALL_BY_CLIENT_ID(useAuthStore().user.clientProfileId);
  table_loading.value = false;
})

</script>


<template>

  <v-row>
    <v-col cols="12" md="12">
      <div>
        <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row justify="space-between" class="align-center mb-3">
          <v-col cols="12" md="12">
            <v-text-field
                type="text"
                class="mx-auto"
                variant="solo"
                density="comfortable"
                hide-details
                style="max-width: 700px;border-radius: 50% !important;"
                prepend-inner-icon="mdi-magnify"
                :placeholder="t('Models.consultation.searchPlaceholder')"
                v-model="searchValue"
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <v-btn class="ma-1 float-right" @click="import_dialog = true" variant="outlined"
                   color="primary">
              <v-icon class="mr-1">mdi-cloud-upload</v-icon>
              {{ t('Models.consultation.importModel') }}
            </v-btn>
            <v-btn class="ma-1 float-right" variant="outlined" color="primary" @click="goToCreateTemplate">
              <v-icon>mdi-plus</v-icon>
              {{ t('Models.consultation.newModel') }}
            </v-btn>
          </v-col>
        </v-row>
        <EasyDataTable
            :headers="headers"
            class="customize-table cursor-pointer"
            :class="{ 'customize-table-dark': useCustomizerStore().actTheme == 'DARK_GREEN_THEME',  }"
            :items="filteredList"
            @click-row="ViewSelectedModel"
            :loading="table_loading"
        >
          <template #empty-message>
            <v-icon class="text-primary" size="30">mdi-folder-search-outline</v-icon>
            <div class="text-primary">
              {{ t('Models.consultation.noDataFound') }}
            </div>
          </template>
          <template #loading>
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
          </template>
          <template #item-createdAt="{createdAt}">
            {{ FormatDate(createdAt) }}
          </template>
          <template #item-language="{language}">
            {{ t(language) }}
          </template>
          <template #item-updatedAt="{updatedAt}">
            {{ FormatDate(updatedAt) }}
          </template>
          <template #item-actions="item">
            <v-btn size="30" icon variant="plain">
              <v-avatar size="22">
                <v-icon class="text-primary">mdi-dots-vertical</v-icon>
              </v-avatar>
              <v-menu activator="parent">
                <v-list>
                  <v-list-item value="action" hide-details
                               @click="visualizeModal(item)"
                               min-height="38">
                    <v-list-item-title>
                      <v-avatar size="20" class="mr-2">
                        <v-icon>mdi-view-carousel-outline</v-icon>
                      </v-avatar>
                      {{ $t('Models.consultation.visualize') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item value="action" hide-details
                               @click="editModal(item)"
                               min-height="38">
                    <v-list-item-title>
                      <v-avatar size="20" class="mr-2">
                        <component is="EditIcon" stroke-width="2" size="20"/>
                      </v-avatar>
                      {{ t('Models.consultation.edit') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item value="action" hide-details
                               min-height="38">
                    <v-list-item-title @click="deleteModal(item.id)">
                      <v-avatar size="20" class="mr-2">
                        <component is="TrashIcon" stroke-width="2" size="20"/>
                      </v-avatar>
                      {{ t('Models.consultation.delete') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item value="action" hide-details
                               min-height="38">
                    <v-list-item-title @click="openCreateDraftsDialog(item)">
                      <v-avatar size="20" class="mr-2">
                        <v-icon size="20">mdi-send</v-icon>
                      </v-avatar>
                      {{ t('Models.consultation.send') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>
        </EasyDataTable>
        <CustomConfirmationDialog :title="t('modals.deleteModal.confirmTitle')"
                                  :confirm-text-button="t('modals.deleteModal.confirm')"
                                  :dialog="delete_dialog"
                                  @reject="delete_dialog = false"
                                  @accept="confirmDelete"
                                  :text="t('modals.deleteModal.confirmText')"
                                  :cancel-text-button="t('modals.deleteModal.cancel')"/>

        <v-dialog v-model="visualize_dialog" class="backdrop" width="auto">
          <v-toolbar density="compact" style="border-top-left-radius:13px;border-top-right-radius:13px; "
                     color="primary">
            <v-spacer></v-spacer>
            <v-btn icon @click="visualize_dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card class="pa-7 overflow-auto" style="border-radius: 0px 0px 13px 13px!important;">
            <div>
              <component :is="modelComponents[modelStore.model.templateData.template]"></component>
            </div>
          </v-card>
        </v-dialog>


        <v-dialog v-model="edit_dialog" class="backdrop" max-width="1200">
          <v-card>
            <v-toolbar density="compact">
              <v-spacer></v-spacer>
              <v-btn icon @click="editTemplate" :loading="loading">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <v-btn icon @click="edit_dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <ModelSettings/>
          </v-card>
        </v-dialog>

        <v-dialog v-model="import_dialog" class="backdrop" width="600px" persistent>

          <v-card class="pa-2 " rounded="lg">
            <v-card-text class="text-h3">{{ t('Models.consultation.chooseFileImport') }}
            </v-card-text>
            <v-label class="text-subtitle-1 ml-2 font-weight-semibold mb-2 text-lightText">
              {{ t('Models.consultation.templateName') }}
            </v-label>
            <VTextField
                v-model="importedFileDto.name"
                class="mb-3 px-2"
                required
                placeholder="Nom de template"

                hide-details="auto"
            ></VTextField>
            <v-file-input
                class="d-none"
                show-size
                type="file"
                color="secondary"
                ref="fileInput"
                @change="handleFileChange"
                accept=".pdf, .doc, .docx"
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
                <div>{{ t('Models.consultation.clickToUploadFile') }}</div>

              </div>
              <div v-if="file" class="file-list my-2 ">
                <!--                <h3>Files ({{ files.length }})</h3>-->
                <ul class="overflow-y-auto mb-3 " style="max-height: 300px">
                  <li>
                    <span v-if="file">{{ file?.name }} ({{ (file?.size / 1024).toFixed(2) }} KB)</span>
                    <v-btn icon variant="text" @click="removeFile(index)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                  </li>
                </ul>
              </div>

            </v-container>
            <v-card-actions class="">
              <v-row class="d-flex justify-center mt-3">
                <v-col>
                  <v-btn size="large" block variant="outlined" @click="import_dialog = false">
                    {{ t('Resumes.chargement.cancel') }}
                  </v-btn>
                </v-col>
                <v-col>


                <span class="pa-0 ma-0">


                  <v-tooltip :text="disableImport ? t('tips.notEnoughCredits'): 'Importer'">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="pa-0 ma-0">
                 <v-btn size="large" block :variant="disableImport ? 'tonal': 'elevated' "
                        :disabled="disableImport" color="primary"
                        @click="importFile"
                        :loading="loading"
                 >
                            {{ t('Resumes.chargement.import') }}
                          </v-btn>

                </span>
              </template>
            </v-tooltip>
                </span>

                </v-col>
                <v-col cols="12">

                  <Alert :show="showError" :text="errorText"/>
                </v-col>
              </v-row>
            </v-card-actions>


            <div>
              <v-alert
                  v-model="alert"
                  border="start"
                  close-label="Close Alert"
                  color="info"
                  title="Attention"
                  density="compact"
                  variant="tonal"
                  closable
                  icon="mdi-alert-circle-outline"
              >
                {{ t('Models.consultation.upload-nb.customSetup') }}
                <br>
                <div class="mt-2">
                  <i> Nb : {{ t('Models.consultation.upload-nb.acceptFormats') }}</i>
                </div>

              </v-alert>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
  </v-row>
  <v-dialog v-model="link_dialog" class="backdrop" max-width="900" height="900">
    <v-card density="compact" class=" d-flex justify-center  overflow  mx-6 " rounded="xl">
      <v-card-item class="d-flex justify-end">
        <v-btn variant="flat" @click="link_dialog = false" icon="mdi-close"></v-btn>

      </v-card-item>


      <div style="height:auto;overflow-y:auto">
        <v-card-item class="d-flex justify-center">
          <div class="text-center">
            <div class="mb-3 justify-center d-flex" data-aos="fade-up">
              <v-img :src="docs" height="220" width="200"/>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100">
              {{ t('Candidates.sendLink.title') }}
            </h2>
            <div data-aos="fade-up" data-aos-delay="200">
              {{ t('Candidates.sendLink.text') }}
            </div>
          </div>
        </v-card-item>
        <v-card-item>
          <v-row>
            <v-col cols="12" lg="12" md="12">
              <v-label class="mb-2  flex font-weight-medium mr-0  "><span>Emails</span> <span><EmailInputTips
                  class=" ml-1 pl-0"/> </span></v-label>
              <CustomTag v-model:emailList="emailList"
                         :custom-placeholder="t('Models.consultation.toasts.emailPlaceholder')"
                         :duplicate-email-message="t('Models.consultation.toasts.duplicateEmail')"
                         :invalid-email-message="t('Models.consultation.toasts.invalidEmail')"/>
            </v-col>

          </v-row>
        </v-card-item>
      </div>


      <v-card-item>
        <v-row no-gutters class="mb-4">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn variant="text" @click="sendDrafts" :loading="loading">
              <v-icon class="mr-1">mdi-email-fast-outline</v-icon>
              {{ sendEmailText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-dialog>
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

</style>