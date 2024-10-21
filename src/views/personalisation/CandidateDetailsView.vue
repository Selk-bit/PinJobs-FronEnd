<script setup lang="ts">
import {useCandidateStore} from "@/stores/candidate";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import type {Candidate} from "@/types/candidate";
import PersonnelDetails from "@/components/candidates/view-candidate/CandidatePersonnelDetails.vue";
import eng from "@/assets/images/flag/icon-flag-en.svg";
import fr from "@/assets/images/flag/icon-flag-fr.svg";
import {useResumeStore} from "@/stores/resume";
import CandidateResumeDetails from "@/components/candidates/view-candidate/CandidateResumeDetails.vue";
import CandidateSkills from "@/components/candidates/view-candidate/CandidateSkills.vue";
import CandidateEduction from "@/components/candidates/view-candidate/CandidateEduction.vue";
import CandidateInterests from "@/components/candidates/view-candidate/CandidateInterests.vue";
import CandidateSoftSkills from "@/components/candidates/view-candidate/CandidateSoftSkills.vue";
import CandidateLanguages from "@/components/candidates/view-candidate/CandidateLanguages.vue";
import UILoader from "@/components/shared/UILoader.vue";
import type {Resume} from "@/types/resume";
// const candidateId = Number.parseInt(Array.isArray(route.params.candidateId) ? route.params.candidateId[0] : route.params.candidateId);

const route = useRoute();
const loading = ref(false);
const candidateStore = useCandidateStore();
const candidate = ref<Candidate>({} as Candidate)
const lang = ref();

const candidateData = ref<Resume>()


function reload() {
//   load data into the resumec
  useResumeStore().PreLoad();
}


onMounted(async () => {
  try {
    loading.value = true;
    candidate.value = await candidateStore.GET_BY_ID(route.params.candidateId as string);
    candidateData.value = candidate.value.resumeData;
    loading.value = false;

  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
})

</script>

<template>
  <v-container fluid>
    <div v-if="candidate">

      <v-toolbar
          dark
          density="compact"
          rounded="xl"
          class=""
      >
        <v-btn
            icon
            @click="$router.go(-1)"
            class="hidden-xs-only"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <!--    <v-toolbar-title class="text-h3">Information sur le risque </v-toolbar-title>-->
        <div class="text-h5 text-lg-h3">
          {{ candidateData?.name }}
        </div>
        <v-spacer></v-spacer>
        <v-toolbar-items>

        </v-toolbar-items>
      </v-toolbar>
      <!--main body-->
      <v-overlay v-model="loading" v-if="loading" class="d-flex justify-center align-center">

        <UILoader/>
      </v-overlay>
      <v-row class="mt-4" v-else dense>
        <v-col cols="12" lg="3" md="12">
          <PersonnelDetails
              :name="candidateData?.name"
              :reference="candidate.reference"
              :age="candidateData?.age"
              :phone="candidateData?.phone"
              :email="candidateData?.email"
              :city="candidateData?.city"
              :summary="candidateData?.summary"
              :headline="candidateData?.headline"
              :yoe="candidateData?.yoe as string ?? ''"
              :alias="candidateData?.alias as string ?? ''"
          />
          <CandidateEduction title="Education" :education="candidateData?.educations"/>
          <CandidateInterests title="Interests" :interests="candidateData?.interests"/>
          <CandidateSoftSkills title="Soft skills" :skills="candidateData?.social"/>
          <CandidateLanguages :languages="candidateData?.languages" title="Languages"/>

        </v-col>
        <v-col cols="12" lg="6" md="12" class=" ">
          <CandidateResumeDetails :data="candidateData"/>
        </v-col>
        <v-col lg="3" cols="12" md="3">

          <CandidateSkills :skills="candidateData?.skills" title="Skills"/>
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<style scoped lang="scss">
.language-highlight {
  border-bottom: 3px solid #4bb94b;
  //border-radius: 23px;
  font-size: 12px;
  padding-bottom: 5px;
  transition: all ease-in;
}
</style>