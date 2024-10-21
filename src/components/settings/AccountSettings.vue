<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';

import {useAuthStore} from "@/stores/auth";
import {useSettingStore} from "@/stores/settings";
import {toast} from "vue-sonner";
import type {Position} from "@/types/position";
import {useTheme} from 'vuetify'
import {useCustomizerStore} from "@/stores/customizer";
import type {User} from "@/types/user";
import UpdateUserDetails from "@/components/settings/UpdateUserDetails.vue";


const theme = useTheme()
const customizer = useCustomizerStore()
const {t, locale} = useI18n();
const authStore = useAuthStore();
const settingsStore = useSettingStore();

const account = ref({
  pictureUrl: 'https://cdn.vuetifyjs.com/images/john.jpg',

  verified: true,
  two_fa: false,
});


const security = ref({
  newPassword: '',
  confirmPassword: '',
});


const profile = ref({
  language: '',
  position: 'bottom-right' as Position,

});
const user = ref({} as User);
const themes = ref([
  {
    name: 'dark', val: 'DARK_GREEN_THEME', icon: 'weather-night'
  },
  {
    name: 'light', val: 'GREEN_THEME', icon: 'white-balance-sunny'
  }
])
const languages = [
  {name: 'English', value: 'en'},
  {name: 'Francais', value: 'fr'},
];

const positions_en = ref([
  {name: 'Top center', value: 'top-center'},
  {name: 'Top right', value: 'top-right'},
  {name: 'Top left', value: 'top-left'},
  {name: 'Bottom left', value: 'bottom-left'},
  {name: 'Bottom center', value: 'bottom-center'},
  {name: 'Bottom right', value: 'bottom-right'},
])

const positions_fr = ref([
  {name: 'Centre haut', value: 'top-center'},
  {name: 'Haut droite', value: 'top-right'},
  {name: 'Haut gauche', value: 'top-left'},
  {name: 'Bas gauche', value: 'bottom-left'},
  {name: 'Centre bas', value: 'bottom-center'},
  {name: 'Bas droite', value: 'bottom-right'}
])

const computedPositions = computed(() => {
  return locale.value == 'fr' ? positions_fr.value : positions_en.value
})
const showPassword = ref(true);
const show2FA = ref(true);


const changePassword = () => {
  // Add your change password logic here
};

const enable2FA = () => {
  // Add your enable 2FA logic here
};

const disable2FA = () => {
  // Add your disable 2FA logic here
};


const save = () => {
//   update lang

  settingsStore.language = profile.value.language;
  locale.value = settingsStore.language;
  settingsStore.toast_position = profile.value.position;
  toast.success(t('Settings.updateSuccess'));


};

watch(() => customizer.actTheme, (val) => {
  toast.success('Theme changed successfully')
})


onMounted(async () => {
  await authStore.GET_CURRENT_USER();
  user.value = authStore.user;
  profile.value.language = settingsStore.language;
})
</script>

<template>

  <!--  <v-card rounded="lg" elevation="0" data-aos="fade-right" data-aos-delay="200">-->
  <v-card rounded="lg" elevation="0" class="mt-2">
    <v-card-text class="pt-4">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col>
              <h3 class="mb-4 mt-4">{{ t('Settings.account.title') }}</h3>
            </v-col>
          </v-row>
          <p class="mb-10">{{ t('Settings.account.description') }}</p>

          <v-row>
            <v-col>
              <h3 class="mb-4">{{ t('Settings.account.user') }}</h3>
            </v-col>
          </v-row>
          <UpdateUserDetails/>
          
          <v-divider color="primary" inset class="mx-auto my-6"></v-divider>
          <h3 class="mb-4 mt-5">{{ t('Settings.profile.title') }}</h3>
          <p class="mb-6">{{ t('Settings.profile.description') }}</p>
          <v-row class="mb-2">
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ t('Settings.profile.theme') }}</v-label>
              <v-select :items="themes" v-model="customizer.actTheme" item-title="name" class="text-capitalize"
                        item-value="val"
                        color="primary">
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props">
                    <v-icon>mdi-{{ item.raw.icon }}</v-icon>
                    {{ t(`theme.${item.raw.name}`) }}
                  </v-list-item>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ t('Settings.profile.language') }}</v-label>
              <v-select :items="languages" item-value="value" item-title="name" v-model="profile.language"
                        color="primary"></v-select>
            </v-col>

            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.notificationPosition') }}</v-label>
              <v-select :items="computedPositions" class="text-capitalize" item-value="value" item-title="name"
                        v-model="profile.position"
                        color="primary"></v-select>
            </v-col>
            <v-col cols="12" md="12" class="py-0">

               <v-label class="mb-2 font-weight-medium">Drawer Position</v-label>
              <v-select :items="[{title:t('Settings.right'),value:'right'},{title:t('Settings.left'),value:'left'}]" class="text-capitalize"
                        item-value="value" item-title="title"
                        v-model="settingsStore.drawerPosition"
                        color="primary"></v-select>
            </v-col>
          </v-row>
            <v-col cols="12" class="mt-4 py-0">
              <v-btn @click="save" class="mb-4" variant="tonal" color="primary">{{ t('Settings.save') }}</v-btn>
            </v-col>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.verified,
.not-verified {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin-top: -1rem;
}

.verified {
  color: green;
}

.not-verified {
  color: red;
}

h3 {
  font-size: 1.5rem;
  font-weight: bold;
}

.secondary-title {
  font-size: 1.25rem;
  font-weight: bold;
}

p {
  font-size: 1rem;
}

.v-btn {
  background-color: var(--v-theme-primary);
  color: white;
  width: 100%;
}

.v-btn:hover {
  background-color: var(--v-theme-primary-dark);
}

</style>
