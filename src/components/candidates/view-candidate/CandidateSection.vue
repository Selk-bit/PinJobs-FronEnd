<script setup lang="ts">
defineProps<{
  end?:string;
  start?:string;
  heading?:string;
  title?:string;
  subtitle?:string;
  text?:string;


}>()
</script>
<template>
  <v-row>
    <v-col cols="12">

      <v-card variant="outlined"  class="bg-surface">
        <v-card-item>
            <div class="text-h7 text-subtitle-1 date">{{start ?? ''  }} {{ end ?? ''}}</div>
          <div class="d-flex flex-column gap-2 mb-5 ">
            <div class="text-h5 w-lg-50 heading" v-if="heading">{{ heading ?? '' }}</div>
            <div class="text-h6 title" v-if="title">{{title?? ''}}</div>
            <div class="text-h7 title" v-if="subtitle">{{ subtitle?? '' }}</div>
            <p class="text" v-if="text" v-html="text?? ''">
            </p>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
