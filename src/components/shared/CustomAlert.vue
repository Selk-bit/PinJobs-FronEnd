<script setup lang="ts">

const props = defineProps<{
  message: string;
  color: string;
  title: string
}>()

</script>

<template>
  <v-alert
      border="start"
      close-label="Close Alert"
      :color="color"
      :title="title"
      rounded="xl"
      density="compact"
      variant="tonal"
      closable
      icon="mdi-alert-circle-outline"
  >
   <p class="text-nowrap"> {{ message }}</p>
  </v-alert>
</template>

<style scoped lang="scss">

</style>