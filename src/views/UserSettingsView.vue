<template>
  <div>
    <BaseBreadcrumb :title="t('settings')" data-aos="fade-right"/>
    <v-tabs
        v-model="tab"
        align-tabs="start"

    >
      <v-tab :value="1">{{ t('Settings.account.title') }}</v-tab>
      <v-tab :value="2" v-if="isAuthUserIsOwner">{{ t('Settings.add.addUsers') }}</v-tab>
      <v-tab :value="3" >{{ t('Settings.security.tabLabel') }}</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item
          :value="1"
      >
        <AccountSettings/>
      </v-window-item>
      <v-window-item
          :value="2"
      >
        <AddUsers/>
      </v-window-item>
      <v-window-item
          :value="3"
      >
       <ChangeUserPassword />
      </v-window-item>
    </v-window>


  </div>
</template>
<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import AccountSettings from "@/components/settings/AccountSettings.vue";
import AddUsers from "@/components/settings/AddUsers.vue";
import {computed, onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {captureOrderWithPaypal} from "@/api/payment";
import ChangeUserPassword from "@/components/settings/ChangeUserPassword.vue";

const isAuthUserIsOwner = computed(() => {
  return auth.user.id == auth.user.clientProfile?.ownerId;
})


const {t, locale} = useI18n();
const tab = ref()
const auth = useAuthStore();

onMounted(async () => {
  await auth.GET_CURRENT_USER();
})
</script>