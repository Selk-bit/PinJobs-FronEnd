<script setup lang="ts">


import {watch} from "vue";

const props = defineProps<{
  show: boolean;
  text: string;
}>()


</script>

<template>
    <v-alert
        v-if="show"
        class="font-weight-bold"
        :text="text"
        type="warning"
        variant="tonal"
    ></v-alert>
</template>

<style scoped lang="scss">

</style>