<template>
  <v-container>
    {{date}}
    <PickDate
        v-model.string="date"

        mode="date"

    ></PickDate>
  </v-container>
</template>

<script setup>
import {ref} from 'vue'
import PickDate from "@/components/shared/PickDate.vue";

// State variables using ref
const formCheckbox = ref(false)  // Form checkbox value
const dialogCheckbox = ref(false)  // Dialog checkbox value
const dialog = ref(false)  // Dialog visibility
const date = ref('03-10-2024')
// Method to save changes
const saveChanges = () => {
  if (dialogCheckbox.value) {
    formCheckbox.value = true  // Set form checkbox to true if dialog checkbox is checked
  }
  dialog.value = false  // Close the dialog after saving changes
}
</script>

<style scoped>
/* Add any necessary custom styling here */
</style>
