<script setup lang="ts">
import type {Summary} from "@/types/candidate";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
 defineEmits(['delete-summary','pick-summary'])
const props = defineProps<{
  summary: Summary;
  opening: string;
  index:number;

}>()
const {summary, opening,index} = props
</script>

<template>
  <div>
    <v-container >
      <div class="d-flex align-center pa-2 ">
        <!-- Icon on the left -->
        <v-icon size="40" class="me-4" color="primary">
          mdi-robot-outline
        </v-icon>

        <div>
          <!-- Card Title -->
          <div class="text-h6 mb-2 font-weight-semibold">
            {{ opening }}
          </div>

          <!-- Quote Text -->
          <div class="text-body-1">
            <i>{{ summary.summary }}</i>
          </div>

          <!--          Additional Message-->
          <div class="text-subtitle-2 mt-2">
            <v-tooltip :text="t('Resumes.editor.summary.summaryCard.remove')">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-delete" v-bind="props" @click="$emit('delete-summary',summary.summary)"  variant="text"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip :text="t('Resumes.editor.summary.summaryCard.pick')">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-hand-okay" v-bind="props" @click="$emit('pick-summary',summary.summary)" variant="text"></v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">

</style>