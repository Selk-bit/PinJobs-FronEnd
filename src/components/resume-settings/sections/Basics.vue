<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import {storeToRefs} from 'pinia';
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import TipTap from "@/components/tiptap/TipTap.vue";
import AiMenu from "@/components/resume-settings/AiMenu.vue";


const resumeStore = useResumeStore();
const {t} = useI18n();
const {resume} = storeToRefs(resumeStore);
const dev_mode = import.meta.env.VITE_DEV_MODE;

</script>

<template>
  <!--    basics-->
  <section>
    <!--    basics  title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-account-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.basics.basicsTitle') }}</h1>
      </v-col>
    </v-row>
    <v-row class="mt-2 p-0" v-if="resume">

      <v-col cols="12" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.name') }}</v-label>
        <v-text-field variant="outlined" v-model="resume.name" :placeholder="t('Resumes.basics.name')"
                      color="primary"></v-text-field>
      </v-col>
<!--      <v-col cols="12" class="py-0">-->
<!--        <v-label class="mb-2 font-weight-medium">Alias</v-label>-->
<!--        <v-text-field variant="outlined" v-model="resume.alias" placeholder="Alias"-->
<!--                      color="primary"></v-text-field>-->
<!--      </v-col>-->

      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.phone') }}</v-label>
        <v-text-field variant="outlined" v-model="resume.phone" :placeholder="t('Resumes.basics.phone')"
                      color="primary"></v-text-field>
      </v-col>

      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.city') }}</v-label>
        <v-text-field variant="outlined" v-model="resume.city" :placeholder="t('Resumes.basics.city')"
                      color="primary"></v-text-field>
      </v-col>

<!--      <v-col cols="12" md="6" class="py-0">-->
<!--        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.age') }}</v-label>-->
<!--        <v-text-field variant="outlined" v-model="resume.age" :placeholder="t('Resumes.basics.age')"-->
<!--                      color="primary"></v-text-field>-->

<!--      </v-col>-->

      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.email') }}</v-label>
        <v-text-field variant="outlined" :readonly="$route.name == 'update-data-by-candidate'"
                      :disabled="$route.name == 'update-data-by-candidate'" v-model="resume.email"
                      :placeholder="t('Resumes.basics.email')"
                      color="primary"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.headline') }}</v-label>
        <v-text-field variant="outlined"
                      v-model="resume.headline" :placeholder="t('Resumes.basics.headline')"
                      color="primary"></v-text-field>
      </v-col>
      <v-col cols="12">

        <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.basics.summary') }}
          <AiMenu v-if="!($route.name == 'update-data-by-candidate')"/>
        </v-label>

        <tip-tap v-model="resume.summary"/>
        <!--        <v-textarea-->
        <!--            :placeholder="t('Resumes.basics.summary')"-->
        <!--            row-height="25"-->
        <!--            v-model="resume.summary"-->
        <!--            class="mt-2"-->
        <!--            rows="4"-->
        <!--            variant="outlined"-->
        <!--            auto-grow-->
        <!--            shaped-->
        <!--        ></v-textarea>-->

      </v-col>
    </v-row>
  </section>

</template>

<style scoped lang="scss">

</style>