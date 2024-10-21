<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import {onMounted, ref, watch} from "vue";
import ResumeSettings from "@/components/resume-settings/ResumeSettings.vue";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import {useModelStore} from "@/stores/model";
import {useCandidateStore} from "@/stores/candidate";
import {toast} from "vue-sonner";
import type {Candidate} from "@/types/candidate";
import type {Model, Template} from "@/types/model";
import UILoader from "@/components/shared/UILoader.vue";
import type {Education, Resume} from "@/types/resume";
import LogoDark from "@/layouts/full/logo/LogoDark.vue";
import type {Language} from "@/types/language";
import {useCustomizerStore} from "@/stores/customizer";
import {Exception} from "sass";
import {useRouter} from "vue-router";


const router = useRouter()
const {t, locale} = useI18n()
const route = useRoute();
const loading = ref(false);
const init = ref(false);
const candidateStore = useCandidateStore();
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const tab = ref(1);
const lang = ref<Language>()
const isError = ref<boolean>(false)

watch(lang, (val) => {
  locale.value = val as Language;
})

async function updateDataForCandidate() {

  if (resumeStore.resume.name == '') {
    toast.info(t('Resumes.toasts.nameRequired'));
  } else if (resumeStore.resume.headline == '') {

    toast.info(t('Resumes.toasts.headlineRequired'));
  } else {
    try {
      //     update candiate resume
      loading.value = true;
      init.value = true;

      await candidateStore.UPDATE_CANDIDATE_DATA(route.params.candidateId as string, route.query.token as string, resumeStore.resume);
      await candidateStore.UPDATE_CANDIDATE_FILE(route.params.candidateId as string, route.query.token as string,);
      //   finish
      loading.value = false;
      init.value = false;
      toast.success('Data updated successfully !')
    } catch (err: any) {
      console.log(err)
      loading.value = false;
      init.value = false;
      toast.error(t('error'))
      return Promise.reject(err);
    }
  }
}

const data = ref<Candidate>();
const showPreview = ref(false);
onMounted(async () => {
  try {
    init.value = true;
    data.value = await candidateStore.GET_DATA_FOR_CANDIDATE(route.params.candidateId as string, route.query.token as string);
    resumeStore.setResume((data.value?.resumeData) as Resume);
    modelStore.SetModel(data.value?.template as Template);
    locale.value = data.value?.template?.language as string;
    init.value = false;
  } catch (err: any) {
    isError.value = true;
    await router.push({name:"error"})
    console.log(err);
    // toast.error('Something went wrong, please try again ')
  }
})

</script>

<template>
  <v-layout>
    <v-app :theme="useCustomizerStore().actTheme">

      <v-app-bar flat density="compact">

        <div class="pa-2 pl-4">
          <LogoDark/>
        </div>
        <v-spacer/>
        <v-btn variant="outlined" @click="updateDataForCandidate"
               class=" float-right  "
               :loading="loading">

          <v-icon class="mr-1">mdi-content-save-outline</v-icon>
          {{ t('update') }}
        </v-btn>
      </v-app-bar>


      <v-card rounded="lg" elevation="0" v-if="!isError">
        <v-card-item class="mt-5">
          <v-alert
              border="start"
              close-label="Close Alert"
              color="secondary"
              title="Notice"
              variant="tonal"
              closable
          >
            {{ t('Resumes.alert.correct-language', {lang: t(`${locale}`)}) }}
          </v-alert>
        </v-card-item>
        <v-card-item class="mt-3">
          <ResumeSettings/>

        </v-card-item>
      </v-card>
    </v-app>
    <v-overlay v-model="init" class="d-flex justify-center align-center">
      <UILoader/>
    </v-overlay>
  </v-layout>

</template>

<style scoped lang="scss">

</style>