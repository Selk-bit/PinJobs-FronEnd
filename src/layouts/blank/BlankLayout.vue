<template>
  <v-app class="blank" :theme="customizer.actTheme">
    <div class="d-flex pa-3 justify-space-between">
      <Logo/>
      <!--      <ThemeMenu/>-->
      <ThemeToggle/>
    </div>
    <v-container fluid>

      <v-row v-if="$vuetify.display.smAndDown">
        <v-col cols="12" md="12" class="right-section   d-flex flex-column align-center justify-center">
          <router-view/>
          <div class="text-body-1 text-primary">
            {{ t('rights') }}
          </div>
        </v-col>
      </v-row>
      <div style="width:auto" v-else
           class=" justify-center   my-auto  d-flex align-center ">
        <v-row align="center" justify="center" class="fill-height my-6 ">
          <div>
          </div>
          <v-col cols="12" lg="9" md="12">
            <v-card class="elevation-0 mx-auto  login-card" rounded="xl">
              <v-row class="justify-center d-flex">
                <!-- Left Section with Gradient Background and Welcome Message -->
                <v-col v-ripple cols="12" md="5"
                       class="left-section   d-none d-md-flex flex-column align-center justify-center">
                  <div class="welcome-content text-center">
                    <h1 class="welcome-title text-uppercase">
                      {{ t('auth.blankLayout.welcomeBack') }}
                    </h1>
                    <p class="welcome-description">
                      {{ t('auth.blankLayout.text') }}
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" md="7" class="right-section   d-flex flex-column align-center justify-center">
                  <router-view/>

                  <div class="text-body-1 mb-3 text-primary">
                    {{ t('rights') }}
                  </div>
                </v-col>
              </v-row>
            </v-card>

          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useI18n} from "vue-i18n";
import Logo from '@/layouts/full/logo/LogoDark.vue';
import LanguageDD from "@/layouts/full/vertical-header/LanguageDD.vue";
import ThemeMenu from "@/components/shared/ThemeMenu.vue";
import {useCustomizerStore} from "@/stores/customizer";
import {useSettingStore} from "@/stores/settings";
import ThemeToggle from "@/components/shared/ThemeToggle.vue";


const customizer = useCustomizerStore()
const {t, locale} = useI18n()
const username = ref('');
const password = ref('');
const remember = ref(false);


const lang = computed(() => {
  return navigator.language;
})

onMounted(() => {
  // window.location.reload();
  if (navigator.language.startsWith("en")) {
    // Do something if the language is English (e.g., "en", "en-GB", "en-US")
    locale.value = useSettingStore().language = "en";
  } else if (navigator.language.startsWith("fr")) {
    locale.value = useSettingStore().language = "fr";
    // Do something if the language is French (e.g., "fr", "fr-FR", "fr-CA")
  } else {
    locale.value = useSettingStore().language;
  }
})
</script>

<style scoped lang="scss">


/* General layout */
.login-page {
  display: flex;
  height: 100%;
  background-color: #f5f5f5; /* Light background color for contrast */
}

/* Centered Card */
.login-card {
  display: flex;
  justify-content: center;
  border-radius: 16px;
  overflow: hidden;
  max-width: 96%;

}

/* Left Section */
.left-section {
  /* Gradient background */
  color: white;
  background: url("@/assets/images/backgrounds/login-bg-2.jpg") no-repeat;
  background-size: cover;
  min-height: 600px;
  padding: 3rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
}

.welcome-description {
  font-size: 1rem;
  line-height: 1.5;
  padding: 1.5rem;
}


</style>
