<script setup lang="ts">
import { modelComponents } from '@/models-imports';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useResumeStore } from '@/stores/resume';
import type { Candidate } from '@/types/candidate';
import { storeToRefs } from 'pinia';
import { useTailoredResumeStore } from '@/stores/tailored-resume';
import { useRoute } from 'vue-router';


const route = useRoute();
const candidate = ref({} as Candidate);
const resumeStore = useResumeStore();
const tailoredResumeStore = useTailoredResumeStore();
const resumeId = Number.parseInt(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);


onBeforeMount(async () => {
    try {
        let cvData = await tailoredResumeStore.GET_BY_ID(resumeId);
        resumeStore.setModel(cvData.template);
        resumeStore.setResume(cvData.cv_data);
    } catch (e) {
        console.log(e);
    }
});

</script>

<template>
    <div v-if="!candidate"><h1>Candidate Not Found</h1></div>
    <div class="resume-page-container mx-auto">
    <component :is="modelComponents[resumeStore.model.name]"></component>

    </div>
</template>

<style scoped lang="scss">

</style>