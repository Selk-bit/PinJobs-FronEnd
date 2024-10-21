<script setup lang="ts">
import CandidateSection from "@/components/candidates/view-candidate/CandidateSection.vue";
import type {Resume} from "@/types/resume";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

defineProps<{
  data?: Resume;
}>()
</script>
<template>
  <v-card  variant="outlined" class="bg-surface" density="compact">
      <v-card-item density="compact"  class="work" v-if="(data?.work?.length ?? 0) > 0">
        <h4 class="text-h3 mb-3">{{ t('Models.creation.sections.experience') }}</h4>
        <CandidateSection v-for="work in data?.work" :start="work.start_date" :end="work.end_date"
                          :heading="work.job_title" :title="work.company_name" :subtitle="work.city"
                          :text="work.responsibilities"/>
      </v-card-item>
      <v-card-item density="compact" class="projects" v-if="(data?.projects?.length ?? 0) > 0">
        <h4 class="text-h3 mb-3">{{t('Resumes.projects.headers.project')}}</h4>
        <CandidateSection v-for="project in data?.projects"
                          :heading="project.project_name" :text="project.description" :end="project.end_date"
                          :start="project.start_date"/>
      </v-card-item>
      <v-card-item density="compact" class="reference" v-if="(data?.references?.length ?? 0) > 0">
        <h4 class="text-h3 mb-3">{{t('Resumes.references.headers.reference')}}</h4>
        <CandidateSection v-for="reference in data?.references"
                          :heading="reference.position + ' | ' + reference.company" :title="reference.name"
                          :subtitle="reference.phone" :text="reference.email"/>
      </v-card-item>
      <v-card-item density="compact" class="volunteering" v-if="(data?.volunteering?.length ?? 0) > 0">

        <h4 class="text-h3 mb-3">Volunteering</h4>
        <CandidateSection v-for="volunteering in data?.volunteering"
                          :heading="volunteering.position" :title="volunteering.organization"
                          :text="volunteering.description" :end="volunteering.end_date"
                          :start="volunteering.start_date"/>
      </v-card-item>
      <v-card-item density="compact" class="certifications" v-if="(data?.certifications?.length ?? 0) > 0">
        <h4 class="text-h3 mb-3">Certifications</h4>
        <CandidateSection v-for="certification in data?.certifications" :heading="certification.certification"
                          :title="certification.institution" :text="certification.link" :subtitle="certification.date"
                          :end="certification.date"/>
      </v-card-item>
  </v-card>
</template>
