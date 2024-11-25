<script setup lang="ts">
import {RouterView} from 'vue-router';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import {useCustomizerStore} from '@/stores/customizer';
import {useProgressBarStore} from "@/stores/progress-bar";
import {useAuthStore} from '@/stores/auth';
import { onMounted, ref, watch} from 'vue';


const authStore = useAuthStore();
const controller = new AbortController();

onMounted(async () => {
 await authStore.GET_CURRENT_USER();


});



watch(() => authStore.isLoggedIn, (newValue, oldValue) => {
  if (!newValue) {
    controller.abort()
  }
})


const progressStore = useProgressBarStore();
const skill = ref(80)
const customizer = useCustomizerStore();


</script>

<template>
  <v-locale-provider>
    <v-app
        :theme="customizer.actTheme"
        :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : '',
                customizer.inputBg ? 'inputWithbg' : ''
            ]"
    >


      <!--            <Customizer />-->
      <VerticalSidebarVue v-if="!customizer.setHorizontalLayout"/>
<!--      <VerticalHeaderVue  v-if="!customizer.setHorizontalLayout"/>-->
      <!--            <HorizontalHeader v-if="customizer.setHorizontalLayout" />-->
      <!--            <HorizontalSidebar v-if="customizer.setHorizontalLayout" />-->

      <v-main>

        <v-container fluid class="page-wrapper pb-sm-15 pb-10">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <RouterView/>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
