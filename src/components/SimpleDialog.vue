<template>
  <v-container>
    <!-- Form Checkbox -->
    <v-checkbox
      v-model="formCheckbox"
      :indeterminate="true"
      :disabled="true"
      label="Agree to terms"
    />

    <!-- Open Dialog Button -->
    <v-btn @click="dialog = true">Open Terms Dialog</v-btn>

    <!-- Dialog with Checkbox inside -->
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>Agree to Terms</v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="dialogCheckbox"
            label="I agree to the terms and conditions"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="saveChanges">Save</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// State variables using ref
const formCheckbox = ref(false)  // Form checkbox value
const dialogCheckbox = ref(false)  // Dialog checkbox value
const dialog = ref(false)  // Dialog visibility

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
