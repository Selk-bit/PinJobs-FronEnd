<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {getPrimary} from "@/utils/UpdateColors";
import {useCandidateStore} from "@/stores/candidate";
import {useSettingStore} from "@/stores/settings";
import {useResumeStore} from "@/stores/resume";
import {computed, onMounted, ref, watch} from "vue";
import {useDisplay} from "vuetify";
import nodata from "@/assets/images/illustrations/no-data.svg";
import ResumeSettings from "@/components/resume-settings/ResumeSettings.vue";
import {toast} from 'vue-sonner'
import resumeSvg from "@/assets/images/illustrations/resume.svg"
import candidateSvg from "@/assets/images/illustrations/candidate.svg"
import type {Candidate} from "@/types/candidate";
import {modelComponents} from "@/models-imports";
import type {Template} from "@/types/model";
import {DragZoomContainer, DragZoomItem} from "vue3-drag-zoom";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import {validateEmail} from "@/utils/helpers/validate-email";
import {storeToRefs} from "pinia";
import CustomConfirmationDialog from "@/components/shared/CustomConfirmationDialog.vue";

const {t} = useI18n();
const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const candidateStore = useCandidateStore();
const settingsStore = useSettingStore();
const modelStore = useModelStore();
const {mobile, sm, xs, md} = useDisplay();


const page_loading = ref(false);
const drawer = ref(true);
const show_template = ref(false);
const load_template_data = ref(false);
const selectedCandidates = ref<Candidate[]>([]);
const candidateId = ref();
const selectedTemplateId = ref("");
const isDisabled = ref(false);
const template_to_use = ref<Template>({} as Template);
const candidates = ref<Candidate[]>([] as Candidate[]);
const confirm_translation_dialog = ref<boolean>(false);
const translate_loading = ref<boolean>(false);
const translationWaitText = ref(t('Resumes.translation-feature.translation-dialog-wait-message'));
const candidate_to_translate = ref<Candidate>({} as Candidate);

// translation
async function TranslateData() {
  translate_loading.value = true;
  confirm_translation_dialog.value = false;
  try {
    const res = await candidateStore.TRANSLATE(candidate_to_translate.value?.resumeData, template_to_use.value.language);
    candidateId.value = candidate_to_translate.value.id;
    show_template.value = true;
    load_template_data.value = true;
    modelStore.SetModel(template_to_use.value);
    resumeStore.setResume(res);
    toast.success(t('Resumes.translation-feature.translation-success'));
  } catch (err) {
    console.log(err);
  } finally {
    translate_loading.value = false;
  }
}

function cancelTranslation() {
  confirm_translation_dialog.value = false;
  removeCandidateFromList(candidate_to_translate.value.id as string);
}

// dialogs
const open_candidate_dialog = ref<boolean>(false);
const open_resume_dialog = ref<boolean>(false);

function clearAllItems() {
  selectedCandidates.value = [] as Candidate[];
  show_template.value = false;
  candidateId.value = '';
  toast.success(t('Resumes.editor.toasts.candidatesCleared'));
}


function removeCandidateFromList(id: string) {
  if (candidateId.value == id) {
    selectedCandidates.value = selectedCandidates.value.filter((candidate: Candidate) => candidate.id != id);
    show_template.value = false;
    candidateId.value = '';
    load_template_data.value = false;
  } else {
    //   remove candidate
    selectedCandidates.value = selectedCandidates.value.filter((candidate: Candidate) => candidate.id != id);
  }
  toast.success(t('Resumes.editor.toasts.candidateRemoved'));
}

// modifications to drawer

const isDragModeActive = computed(() => {
  return !mobile.value && settingsStore.dragResume;
});

// const isPermanent = ref<boolean>(true);

async function visualizeCandiate(candidate: Candidate) {
  candidate_to_translate.value = candidate;
  candidateStore.lang = template_to_use.value.language;
  if (selectedTemplateId.value === "" || selectedTemplateId.value == null) {
    toast.warning(t('Resumes.editor.selectTemplate'));
    return;
  } else if (template_to_use.value?.language != candidate.resumeData?.language) {
    confirm_translation_dialog.value = true;
  } else {
    candidateId.value = candidate.id;
    show_template.value = true;
    load_template_data.value = true;
    modelStore.SetModel(template_to_use.value);
    resumeStore.setResume(candidate.resumeData, candidate);
  }
}

async function refreshCandidates() {
  await candidateStore.GET_ALL_BY_CLIENT(useAuthStore().user.clientProfileId);
  candidates.value = candidateStore.candidates.map((item: Candidate) => {
    return {
      ...item,
      validated: false,
    }
  });
  candidateId.value = '';
}

async function SyncCandidate(item: Candidate) {
  let CandidateData = item.resumeData;
  if (selectedTemplateId?.value === '') {
    toast.warning(t('Resumes.editor.selectModel') || 'Please select a model');
  } else if (CandidateData.email == '' || CandidateData.email == null || !validateEmail(CandidateData.email)) {
    toast.warning(t('Resumes.editor.toasts.invalidEmail'));
  }else if(resumeStore.resume.alias == '' || resumeStore.resume.alias == null) {
    toast.warning(t('Resumes.editor.toasts.aliasRequired'));
  } else if (!validateEmail(resume.value.email)) {
    toast.warning(t('Resumes.editor.toasts.invalidEmail'));
    return;
  } else if (selectedCandidates?.value?.length === 0) {
    toast.warning(t('Resumes.editor.selectCandidates') || 'Please select candidates');
    return;
  } else {
    isDisabled.value = true;
    item.validated = true;

    const syncPromise = new Promise(async (resolve, reject) => {
      try {
        const templateId = template_to_use?.value?.id ?? '';

        await candidateStore.UPDATE_RESUME_DATA(resumeStore.resume, templateId, candidateId.value);
        await candidateStore.RENDER_FORMATTED_RESUME(candidateId.value);
        candidateId.value = '';
        await refreshCandidates()
        resolve({name: 'success'}); // Resolve the promise with success data
      } catch (e) {
        console.log(e);
        candidateId.value = '';
        item.validated = false;
        show_template.value = false;
        load_template_data.value = false;
        reject(e); // Reject the promise with error

      }
    });
    const remainingItems = selectedCandidates.value.filter((item: Candidate) => !item.validated)
    // Use toast.promise to handle the promise
    toast.promise(syncPromise, {
      duration: 800,
      loading: t('Resumes.editor.toasts.loadingData'),
      success: (data: any) => {
        isDisabled.value = true;
        isDisabled.value = false;
        selectedCandidates.value = selectedCandidates.value.filter((cand: Candidate) => {
          if (cand.validated) {
            // Toggle validated to false
            cand.validated = false;
            // Remove the user from the array
            return false;
          }
          // Keep the user in the array
          return true;
        })
        show_template.value = false
        // update user credit
        // useAuthStore().GET_CURRENT_USER();
        return t('Resumes.editor.toasts.loadSucess');

      },
      error: (error: any) => {
        console.log(error);
        isDisabled.value = false;
        show_template.value = false
        return t('Resumes.editor.toasts.loadError');
      },
    });
    toast.dismiss();
  }
}


const transform = ref({x: 260, y: 20, scale: 0.7})

function reset() {
  transform.value = {x: 39, y: 50, scale: 0.7}
}


watch(selectedTemplateId, async (val) => {
  try {
    show_template.value = false;
    template_to_use.value = await modelStore.GET_TEMPLATE_BY_ID(val);
  } catch (err) {
    console.log(err);
  }
})


// progress props
function updateProgressText(newValue: number) {
  if (newValue <= 2) {
    progressText.value = newValue; // Update if within limit
  } else {
    progressText.value = 2; // Set to 2 if newValue exceeds 2
  }
}

const progress = ref(0)
const progressText = ref(0)
const CandidatesUpdated = ref<boolean>(false)
const TemplateUpdated = ref<boolean>(false)
watch(selectedTemplateId, (val) => {
  if (val !== '' && !TemplateUpdated.value) {
    progress.value += 50;
    progressText.value += 1;
    TemplateUpdated.value = true;
  }
  if (val == null) {
    progress.value -= 50;
    progressText.value -= 1;
    TemplateUpdated.value = false;
  }

})

watch(selectedCandidates, (val) => {
  if (!CandidatesUpdated.value && val.length > 0) {
    progress.value += 50;
    progressText.value += 1;
    CandidatesUpdated.value = true;
  } else if (val.length == 0) {
    progress.value -= 50;
    progressText.value -= 1;
    CandidatesUpdated.value = false;
  }
})

onMounted(async () => {
  page_loading.value = true;
  await modelStore.GET_ALL_BY_CLIENT_ID(useAuthStore().user.clientProfileId);
  await refreshCandidates();
  page_loading.value = false;

})


</script>

<template>
  <div>
    <v-card class="pa-2 border elevation-0 " v-if="settingsStore.editorSelectCard">
      <v-row>
        <v-col cols="12" lg="6" md="6">
          <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.editor.selectModel') }}</v-label>
          <v-autocomplete
              :items="modelStore.models"
              v-model="selectedTemplateId"
              variant="outlined"
              density="compact"
              :menu-props="{ maxHeight:  300 }"
              :no-data-text="t('Resumes.editor.noDataMessage')"
              :prepend-icon="!mobile ? 'mdi-text-box-multiple-outline' : ''"
              item-title="name"
              item-value="id"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props"
                           :subtitle="`${t('cvs.tech.language.language')} : ${t(item.raw.language)}`"></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="12" lg="6" md="6">
          <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.editor.selectCandidates') }}</v-label>
          <v-autocomplete
              :items="candidates"
              multiple
              chips
              :prepend-icon="!mobile ? 'mdi-account-school-outline' : ''"
              :menu-props="{ maxHeight:  300 }"
              variant="outlined"
              density="compact"
              v-model="selectedCandidates"
              :no-data-text="t('Resumes.editor.noData')"
              item-title="resumeData.name"
              item-value="id"
              return-object
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props"
                           :subtitle="`${t('cvs.tech.language.language')} : ${t(item.raw.resumeData.language)} | Model : ${item.raw.template?.name ?? '---'}`"></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card>
    <!--  view the list of synced candidates and models after uploading-->
    <v-card class="pa-2 border  elevation-0 my-2">
      <!--      select buttons    -->
      <v-row>
        <v-col class="d-flex">
          <div v-if="!settingsStore.editorSelectCard">
            <v-tooltip :text="t('Resumes.editor.selectCandidates')">
              <template v-slot:activator="{ props }">
                <v-btn flat icon="mdi-account-school-outline" @click="open_candidate_dialog = true"
                       class="text-primary "
                       v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip :text="t('Resumes.editor.selectModel')">
              <template v-slot:activator="{ props }">
                <v-btn flat icon="mdi-text-box-multiple-outline" @click="open_resume_dialog = true"
                       class="text-primary "
                       v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <div class="text-primary d-flex justify-center my-3">
              <div v-if="template_to_use.name == null">
                {{ t('Resumes.editor.empty.noTemplateSelected') }}
              </div>
              <div v-else>
                <v-chip class="font-weight-bold" color="secondary">{{ template_to_use.name }}</v-chip>
              </div>
            </div>
          </div>

          <v-spacer/>
          <div class="d-flex flex-column align-center justify-center">
            <v-progress-circular
                :model-value="progress"
                :rotate="360"
                bg-color="lightprimary"
                :size="50"
                :width="7"
                color="primary"
            >
              {{ progressText == 0 ? '0%' : progressText + '/2' }}
            </v-progress-circular>
            <div class="text-subtitle-2  my-1" :class="[!TemplateUpdated ? 'text-secondary' : 'text-primary']">
              <v-icon>mdi-check-circle</v-icon>
              {{ t('Resumes.editor.progress.templateSelected') }}
            </div>
            <div class="text-subtitle-2 text-primary mb-1"
                 :class="[CandidatesUpdated ? 'text-primary' : 'text-secondary']">
              <v-icon>mdi-check-circle</v-icon>
              {{ t('Resumes.editor.progress.candidateSelected') }}
            </div>
          </div>
        </v-col>

        <v-col cols="12" v-if="selectedCandidates.length > 0">
          <v-btn variant="outlined" color="error" @click="clearAllItems" rounded="xl">
            <v-icon class="mr-1">mdi-close</v-icon>
            {{ t('Resumes.editor.clearAll') }}({{ selectedCandidates.length }})
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-list lines="two" v-if="selectedCandidates?.length > 0">
            <v-slide-y-transition
                class="py-0"
                tag="v-list"
                group
            >
              <v-list-item
                  v-for="(item,index) in selectedCandidates"
                  class="mb-2"
                  :class="[item.validated ? 'bg-lightsuccess' : '']"
                  variant="outlined"
                  rounded="lg"
                  :key="item.id"
                  :title="item.resumeData?.name"
              >
                <template v-slot:append>
                  <div class="px-2 d-flex align-center">
                    <v-btn icon="mdi-check-outline"
                           v-if="item.id == candidateId"
                           variant="text"
                           :loading="item.validated as boolean"
                           :disabled="item.validated as boolean"
                           @click="async () => {
                            await SyncCandidate(item);
                         }"
                           class="px-2"></v-btn>
                    <v-btn class="px-2"
                           icon="mdi-eye"
                           :disabled="item.id == candidateId"
                           color="primary"
                           @click="visualizeCandiate(item)"
                           variant="text"></v-btn>
                    <v-btn class="px-2"
                           icon="mdi-trash-can-outline"
                           color="error"
                           :disabled="item.validated as boolean"
                           @click="removeCandidateFromList(item.id as string)"
                           variant="text"></v-btn>
                  </div>
                </template>
              </v-list-item>
            </v-slide-y-transition>
          </v-list>

          <div class="flex-column text-center justify-center" v-else>
            <div data-aos="fade-up">
              <v-img :src="nodata" height="100"/>
            </div>
            <div class="my-2 font-weight-regular">
              <span data-aos="fade-up" data-aos-delay="200">
              {{ t('Resumes.editor.empty.looksEmptyHere') }}
              </span>
              <br>
              <span v-if="!settingsStore.editorSelectCard" data-aos="fade-up" data-aos-delay="300">
                {{ t('Resumes.editor.empty.startBy') }} <span><v-btn @click="open_candidate_dialog = true"
                                                                     color="primary"
                                                                     class="px-0 mx-0" variant="text"><v-icon
                  class="">mdi-account-school-outline</v-icon> {{
                  t('Resumes.editor.empty.selectingCandidates')
                }}</v-btn></span> {{ t('Resumes.editor.empty.and') }}
              <span><v-btn @click="open_resume_dialog = true" color="primary" class="px-0 " variant="text"><v-icon
                  class=" ">mdi-text-box-multiple-outline</v-icon>{{ t('Resumes.editor.empty.selectTemplate') }}</v-btn></span> {{
                  t('Resumes.editor.empty.toGetStarted')
                }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <!--    preview-->
    <div class="preview" v-if="show_template">
      <div class="resume-preview">
        <div class="ma-2 parent elevation-0">
          <div>
            <div class="drawer-options my-2 d-flex justify-start">
              <v-tooltip text="close editor">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="pa-0 ma-0">

                    <v-btn icon="mdi-close"  variant="outlined" @click="() => {
                show_template = false;
                candidateId = '';
              }"></v-btn>
                  </div>
                </template>
              </v-tooltip>
              <v-tooltip text="toggle drag model/resume mode">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="pa-0 ma-0">
                    <v-btn icon="mdi-select-drag" variant="outlined"
                           @click="settingsStore.toggleResumeDragMode()"></v-btn>
                  </div>
                </template>
              </v-tooltip>
              <v-tooltip text="toggle editor menu">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="pa-0 ma-0">
                    <v-btn icon="mdi-segment" variant="outlined" @click="settingsStore.toggleResumeDrawer()"></v-btn>
                  </div>
                </template>
              </v-tooltip>
            </div>
            <div class="overflow-auto" v-if="!isDragModeActive">
              <component :is="modelComponents[template_to_use.templateData.template]"></component>
            </div>
            <drag-zoom-container v-else class="resume-container elevation-0" v-model="transform">
              <div class="d-flex justify-center align-center">

                <component class="draggable" :zoom-range="{ max: 0.8, min: 0.5, step: 0.05}"
                           :is="modelComponents[template_to_use.templateData.template]"></component>
              </div>
            </drag-zoom-container>


            <v-col cols="12">
              <v-navigation-drawer :width="xs? 330 : sm ? 400 : md ? 500 : 500" class="elevation-1" location="right"
                                   v-model="settingsStore.resumeDrawer">
                <div class="mr-3">
                  <ResumeSettings/>
                </div>
              </v-navigation-drawer>
            </v-col>
          </div>
        </div>


        <!--        little floitng menu-->
        <div class="panel text-primary px-4" v-if="!!isDragModeActive">
          <v-btn icon="mdi-magnify-plus-outline" variant="plain" size="20" class="px-4"
                 @click="transform.scale += 0.05"></v-btn>
          <v-btn class="px-4" icon="mdi-magnify-minus-outline" variant="text" size="20"
                 @click="transform.scale -= 0.05"></v-btn>
          <v-btn class="px-4" size="20" icon="mdi-restart" variant="text" @click="reset"></v-btn>
        </div>
      </div>
    </div>
  </div>


  <CustomConfirmationDialog  :title="t('Resumes.translation-feature.translation-dialog-title')"
                            :confirm-text-button="t('Resumes.translation-feature.translation-dialog-title')"
                            :text="t('Resumes.translation-feature.translation-dialog-text')"
                            :dialog="confirm_translation_dialog"
                            @accept="TranslateData"
                            @reject="cancelTranslation"
                            :cancel-text-button="t('Resumes.translation-feature.translation-dialog-cancel')"/>


  <v-dialog
      v-model="translate_loading"
      max-width="320"
      persistent
      class="backdrop"
  >
    <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
    >
      <v-list-item

          :title="translationWaitText"
      >
        <template v-slot:prepend>
          <div class="pe-4 d-flex justify-center align-center">
            <!--              <v-icon color="primary" size="x-large"></v-icon>-->
            <img src="@/assets/images/logos/logo-app.svg" style="width: 100px"/>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
  <v-overlay
      v-model="page_loading"
      class="align-center d-flex justify-center"
  >
    <v-progress-circular
        color="primary"
        size="64"
        indeterminate
    ></v-progress-circular>
  </v-overlay>

  <!--  candidate dialog-->
  <!--  choose candidates-->
  <v-dialog v-model="open_candidate_dialog" class="backdrop" max-width="900" height="900">
    <v-card class=" d-flex justify-center  " rounded="xl">
      <div class="d-flex justify-end ma-3 ">
        <v-btn variant="flat" flat @click="open_candidate_dialog = false" icon="mdi-close"></v-btn>

      </div>


      <!-- start-->
      <div style="height:auto;overflow-y:auto">
        <v-card-item class="d-flex justify-center">
          <div class="text-center">
            <div class="mb-3 justify-center d-flex" data-aos="fade-up">
              <v-img :src="candidateSvg" height="120" width="200"/>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100">
              {{ t('Resumes.editor.candidateDialog.title') }}
            </h2>
            <div data-aos="fade-up" data-aos-delay="200">
              {{ t('Resumes.editor.candidateDialog.text') }}
            </div>
          </div>
        </v-card-item>
        <v-card-item>
          <v-row>
            <v-col cols="12" lg="12" md="12">
              <v-autocomplete
                  :items="candidates"
                  multiple
                  chips
                  clearable
                  closable-chips
                  color="primary"
                  :prepend-icon="!mobile ? 'mdi-account-school-outline' : ''"
                  variant="outlined"
                  density="compact"
                  :menu-props="{ maxHeight:  300 }"
                  v-model="selectedCandidates"
                  :no-data-text="t('Resumes.editor.noData')"
                  item-title="resumeData.name"
                  item-value="id"
                  return-object
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props"
                               :subtitle="`${t('cvs.tech.language.language')} : ${t(item.raw.resumeData.language)} | Model : ${item.raw.template?.name ?? '---'}`"></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>

          </v-row>
        </v-card-item>
      </div>

    </v-card>
  </v-dialog>

  <!--  resume dialog-->
  <!--  choose resume-->
  <v-dialog v-model="open_resume_dialog" class="backdrop" max-width="900" height="900">
    <v-card class=" d-flex justify-center  " rounded="xl">
      <div class="d-flex justify-end ma-3 ">
        <v-btn variant="flat" flat @click="open_resume_dialog = false" icon="mdi-close"></v-btn>

      </div>


      <!--      start-->
      <div style="height:auto;overflow-y:auto">
        <v-card-item class="d-flex justify-center">
          <div class="text-center">
            <div class="mb-3 justify-center d-flex" data-aos="fade-up">
              <v-img :src="resumeSvg" height="120" width="200"/>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100">
              {{ t('Resumes.editor.templateDialog.title') }}
            </h2>
            <div data-aos="fade-up" data-aos-delay="200">
              {{ t('Resumes.editor.templateDialog.text') }}
            </div>
          </div>
        </v-card-item>
        <v-card-item>
          <v-row>
            <v-col cols="12" lg="12" md="12">
              <v-autocomplete
                  :items="modelStore.models"
                  v-model="selectedTemplateId"
                  variant="outlined"
                  density="compact"

                  :menu-props="{ maxHeight:  300 }"
                  :no-data-text="t('Resumes.editor.noDataMessage')"
                  item-title="name"
                  item-value="id"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props"
                               :subtitle="`${t('cvs.tech.language.language')} : ${t(item.raw.language)}`"></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>

          </v-row>
        </v-card-item>
      </div>

    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

.custom-dropdown {
  margin-top: 20px; /* Adjust this value based on how much space you want */
}

.panel {
  position: fixed;
  border: 1px solid #212121;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0px;
  height: 25px;
  background-color: white;
  width: auto;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 50px;
}

.resume-drawer {
  right: 5px;
  z-index: 20;
  top: 50%;
  position: fixed;
}

.resume-container {
  border-width: 1px;
  border-style: solid;
  border-color: v-bind(getPrimary);
  height: calc(100vh - 140px);
  border-radius: 13px;
  padding-left-right: 30px;

  //min-height: 900px;
}


.parent {
  min-height: 100vh;
}

.draggable {
  position: relative;
  user-select: none;
  cursor: move;
}

.aside {
  width: 30%;
}

.section {
  width: 63%;
}

.language-highlight {
  border-bottom: 3px solid #4bb94b;
  //border-radius: 23px;
  font-size: 12px;
  padding-bottom: 5px;
  transition: all ease-in;
}

.drawer-options {
  position: sticky;
  top: 40px; /* Sticks the element to the top of the container */
  //background-color: #fff; /* Background color to avoid overlap issues */
  padding: 10px;
  z-index: 1000;
  gap: 6px /* Make sure it's above other content */
}
</style>