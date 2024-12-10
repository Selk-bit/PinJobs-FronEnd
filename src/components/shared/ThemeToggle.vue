<script setup lang="ts">

import {useCustomizerStore} from '@/stores/customizer';

const customizer = useCustomizerStore();

const toggleTheme = () => {
  customizer.actTheme = customizer.actTheme === 'GREEN_THEME' ? 'DARK_GREEN_THEME' : 'GREEN_THEME';
};
</script>

<template>
  <v-btn

      icon
      variant="text"
      @click="toggleTheme"
  >
    <v-icon :color="(customizer.actTheme === 'GREEN_THEME') ? 'primary' : 'secondary'">
      {{
        (customizer.actTheme === 'DARK_GREEN_THEME') ? 'mdi-weather-night' : 'mdi-weather-sunny'
      }}
    </v-icon>
  </v-btn>
</template>

<style scoped lang="scss">

</style>