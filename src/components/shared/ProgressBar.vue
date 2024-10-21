<script setup lang="ts">
import {useProgressBarStore} from "@/stores/progress-bar";


const progressStore = useProgressBarStore();
</script>

<template>
  <v-expand-transition>
    <v-progress-linear
        v-if="progressStore.show_progress_bar"
        v-model="progressStore.progress"
        color="primary"
        rounded="xl"
        class="bg-lightprimary"
        buffer-color="primary"
        height="35"
    >
      <template v-slot:default="{ value }">
        <strong class="" style="mix-blend-mode: normal;">{{ progressStore.text }} {{ Math.ceil(value) }}% ...</strong>
      </template>
    </v-progress-linear>
  </v-expand-transition>
</template>

<style scoped lang="scss">

</style>