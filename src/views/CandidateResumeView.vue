<script setup lang="ts">
import {modelComponents} from "@/models-imports";
import {onBeforeMount, onMounted, ref} from "vue";
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import type {Candidate} from "@/types/candidate";
import {useFormattingStore} from '@/stores/formatting';
import {storeToRefs} from "pinia";

const templateName = ref('');
const candidate = ref({} as Candidate);
const formattingStore = useFormattingStore();
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const {language} = storeToRefs(formattingStore);


onBeforeMount(async () => {
  try {
    candidate.value = formattingStore.candidate;
    templateName.value = formattingStore.template.templateData.template;
    modelStore.SetModel(formattingStore.template);
    resumeStore.setResume( candidate!.value.resumeData, candidate.value);
  } catch (e) {
    console.log(e)
  }
})

</script>

<template>
  <div v-if="!templateName"><h1>Template Not Found</h1></div>
  <div v-if="!candidate"><h1>Candidate Not Found</h1></div>
  <component v-if="templateName && candidate" :is="modelComponents[templateName]"></component>
</template>

<style scoped lang="scss">

</style>