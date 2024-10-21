<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from "vue-i18n";
import {useCustomizerStore} from "@/stores/customizer";

const customizer = useCustomizerStore();
const {t} = useI18n()
const themes = ref([
  {
    name: 'dark', val: 'DARK_GREEN_THEME', icon: 'weather-night'
  },
  {
    name: 'light', val: 'GREEN_THEME', icon: 'white-balance-sunny'
  }
])

</script>
<template>
  <!-- ---------------------------------------------- -->
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="true" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon variant="text" color="primary" class="mx-2" v-bind="props">
        <v-avatar size="22">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10">
      <v-list class="theme-list">
        <v-list-item
            v-for="(item, index) in themes"
            :key="index"
            active-color="primary"
            :active="customizer.actTheme == item.val"
            class="d-flex align-center"
            @click="() => {
                      customizer.SET_THEME(item.val)
                      // useSettingStore().setLanguage(item.value);
                    }"
        >
          <template v-slot:prepend>
            <v-avatar size="22">
              <v-icon :alt="item.name" width="22" height="22" class="obj-cover">mdi-{{ item.icon }}</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class="text-subtitle-1 font-weight-regular">
            {{ t(`theme.${item.name}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
