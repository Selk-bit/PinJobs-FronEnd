<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from "@/stores/customizer";

// Initialize store and variables
const customizer = useCustomizerStore();
const date = ref();
const popover = ref({ visibility: 'click' });

// Define the masks for both input display and value storage
const masks = ref({
  modelValue: 'DD/MM/YYYY',
});

const config = ref({
  type: 'string',
  mask: 'DD-MM-YYYY',  // This should match the format of both input and value
});

const props = defineProps(['placeholder', 'hint', 'label', 'disabled', 'mode', 'modelConfig']);
</script>

<template>

  <v-date-picker
    :is-dark="customizer.actTheme == 'DARK_GREEN_THEME'"
    color="green"
    v-model="date"
    :mode="mode"
    is-expanded
    is24hr
    :popover="popover"
    :model-config="config"
    :masks="masks"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <v-text-field
        append-inner-icon="mdi-calendar-blank"
        :hint="hint"
        variant="outlined"
        :disabled="disabled"
        hide-details
        persistent-hint
        :placeholder="placeholder"
        :value="inputValue"
        v-on="inputEvents"
      />
    </template>
  </v-date-picker>
</template>
