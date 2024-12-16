<script setup lang="ts">
import {MailIcon} from 'vue-tabler-icons';
import {profileDD} from '@/_mockApis/headerData';

import {useAuthStore} from '@/stores/auth';
import {computed, onMounted, ref} from "vue";
import {useResumeStore} from "@/stores/resume";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {DEFAULT_MODEL} from "@/utils/Constants";
import {toast} from "vue-sonner";
import type {Model, Template} from "@/types/model";

const authStore = useAuthStore();
const resumeStore = useResumeStore();
const {t} = useI18n()
const {user} = storeToRefs(authStore)
const loading = ref(false);

async function logOut() {
  loading.value= true
  resumeStore.setModel(DEFAULT_MODEL as Template);
  toast.success(t('auth.leave'))
  toast.dismiss()
  await authStore.LOGOUT();
  loading.value= false

}
// :color="!!logo ?  ''  :'warning'" :image="!!logo ? logo : ''"
const logo = computed(() => {
if(useAuthStore().user.clientProfile?.logo) {
  return import.meta.env.VITE_BACKBLAZE_ENDPOINT + useAuthStore().user.clientProfile?.logo;

}else {
  return null
}
})

onMounted(async () => {
  loading.value = true;
  await authStore.GET_CURRENT_USER();
  loading.value = false;
})
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35" :color="logo ?? 'warning'"  :image="logo ?? ''">
          <v-progress-circular
              v-if="loading"
              color="secondary"
              indeterminate
          ></v-progress-circular>
          <div v-else class="text-h6">
            {{ user?.first_name?.charAt(0).toUpperCase() ?? '..' }}
            {{ user?.last_name?.charAt(0).toUpperCase() ?? '..' }}
          </div>
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="xl" width="380" elevation="10">
      <div class="d-flex my-3 justify-center">
        <v-progress-circular
            v-if="loading"

            color="secondary"
            indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="!loading" class="px-8 pt-6">
        <h6 class="text-h5 font-weight-medium">
          {{t('profile.title')}}
        </h6>


        <div class="d-flex align-center mt-4 pb-6">
          <v-avatar size="60"  :color="!!logo ?  ''  :'warning'" :image="!!logo ? logo : ''">
            <div class="text-h3 text-uppercase">
              {{ user?.first_name?.charAt(0) ?? '..' }}
              {{ user?.last_name?.charAt(0) ?? '..' }}
            </div>
          </v-avatar>
          <div class="ml-3">
            <h6 class="text-h6 mb-n1">{{ user.first_name + ' ' + user.last_name }}</h6>
            <div class="d-flex align-center mt-1">
              <MailIcon size="18" stroke-width="1.5"/>
              <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{ user.user.email }}</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <div style="height: calc(100vh - 240px); max-height: 140px">
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary"
                       :to="item.href">
            <template v-slot:prepend>
              <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar"/>
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-semibold mb-1 custom-title">{{ t(item.title) }}</h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular text-medium-emphasis">{{ t(item.subtitle) }}</p>
          </v-list-item>
        </v-list>
      </div>
<!--      <div class="px-8 py-3">-->
<!--        <div class="bg-lightprimary rounded-md pa-5 overflow-hidden position-relative">-->
<!--          <h5 class="text-h6">-->
<!--            Unlimited<br/>-->
<!--            Access-->
<!--          </h5>-->
<!--          <v-btn variant="flat" color="primary" class="mt-3">Upgrade</v-btn>-->
<!--          <img src="@/assets/images/backgrounds/unlimited-bg.png" alt="bg-img" class="right-pos-img"/>-->
<!--        </div>-->
<!--      </div>-->
      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn color="primary" variant="outlined" block @click="logOut"><v-icon class="mr-1">mdi-login</v-icon>{{ t('auth.logOut') }}</v-btn>
      </div>

    </v-sheet>
  </v-menu>
</template>


<style scoped lang="scss">
.text-h6 {
  font-size: 0.8rem !important;
  line-height: normal;
}
</style>