<template>
  <Toaster richColors closeButton :position="settingsStore.toast_position" duration="1500"/>

  <RouterView></RouterView>
</template>

<script setup lang="ts">
import {Toaster,} from "vue-sonner";
import {useSettingStore} from "@/stores/settings";
import {onBeforeMount, onMounted, watch} from 'vue';
import {useRoute} from "vue-router";
import {useI18n} from 'vue-i18n';
import { useCustomizerStore } from '@/stores/customizer';

const route = useRoute()
const {locale, t,setLocaleMessage} = useI18n();
const settingsStore = useSettingStore();
const updateTitle = () => {
  // Check if the route has a title meta
  const titleKey = route.meta?.title as string;
  if (titleKey) {
    // Set the document title using the translation
    document.title = t(titleKey);
  } else {
    // Set a default title if meta title is not set
    document.title = t('page.defaultTitle'); // 'defaultTitle' should be defined in your i18n messages
  }
};
onMounted(async () => {
  updateTitle()
  useCustomizerStore().mini_sidebar = false;
  useCustomizerStore().Sidebar_drawer = true;

});

onBeforeMount(() => {
  locale.value = settingsStore.language;
})
// Watch for route changes and update the title
watch(route, () => {
  updateTitle();
});

</script>


<style lang="scss">

.backdrop {
  backdrop-filter: blur(2px) saturate(150%) !important;
  -webkit-backdrop-filter: blur(4px) saturate(150%) !important; /* For Safari support */
}

//.v-overlay__scrim {
//  background-color: transparent !important; /* Makes the overlay transparent */
//  display: none !important; /* Hides the overlay element */
//}
.v-overlay__scrim {
  background-color: rgba(0, 0, 0, 0.5) !important; /* Semi-transparent black for a subtle overlay effect */
  backdrop-filter: blur(8px); /* Adds a slight blur to the background for a modern look */
}

* {

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1ABC9C;
    border-radius: 20px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #80f1d9;
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.customize-table {
  --easy-table-border: 1px solid #DFE5EF;
  --easy-table-row-border: 1px solid #DFE5EF;

  --easy-table-header-font-size: 15px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #2A3547; /* Darker color for header text */
  --easy-table-header-background-color: #F4F9FB; /* Light background for header */

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #2A3547; /* Darker color for even row text */
  --easy-table-body-even-row-background-color: #FAFBEF; /* Light background for even rows */

  --easy-table-body-row-font-color: #2A3547; /* Darker color for odd row text */
  --easy-table-body-row-background-color: #ffffff; /* White background for odd rows */
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #1ABC9C; /* Accent color for hover text */
  --easy-table-body-row-hover-background-color: #EAEFF4; /* Light gray background for hover */

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #F4F9FB; /* Light background for footer */
  --easy-table-footer-font-color: #2A3547; /* Darker footer text */
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #F4F9FB; /* Light color for scrollbar track */
  --easy-table-scrollbar-color: #DFE5EF; /* Light color for scrollbar */
  --easy-table-scrollbar-thumb-color: #B4A5A5; /* Gray color for scrollbar thumb */
  --easy-table-scrollbar-corner-color: #F4F9FB;

  --easy-table-loading-mask-background-color: #F4F9FB;
}

.customize-table-dark {
  --easy-table-border: 1px solid #2a2e35; /* Darker border color */
  --easy-table-row-border: 1px solid #2a2e35;

  --easy-table-header-font-size: 15px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4; /* Light color for header text */
  --easy-table-header-background-color: #222629; /* Dark background for header */

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #e0e0e0; /* Light color for even row text */
  --easy-table-body-even-row-background-color: #2a2e35; /* Dark background for even rows */

  --easy-table-body-row-font-color: #b0b0b0; /* Light color for odd row text */
  --easy-table-body-row-background-color: #1e1e1e; /* Dark background for odd rows */
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #1ABC9C; /* Primary accent color for hover text */
  --easy-table-body-row-hover-background-color: #333842; /* Slightly lighter dark background for hover */

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #222629; /* Dark background for footer */
  --easy-table-footer-font-color: #c0c7d2; /* Light color for footer text */
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #222629; /* Dark color for scrollbar track */
  --easy-table-scrollbar-color: #2a2e35; /* Dark color for scrollbar */
  --easy-table-scrollbar-thumb-color: #4c5d7a; /* Contrasting color for scrollbar thumb */
  --easy-table-scrollbar-corner-color: #222629;

  --easy-table-loading-mask-background-color: #222629;
}


</style>