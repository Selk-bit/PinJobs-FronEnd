<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from '@/stores/auth';
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {toast} from "vue-sonner";
import {validateEmail} from "@/utils/helpers/validate-email";


const {t} = useI18n()
const authStore = useAuthStore();
const loading = ref(false);

async function resetPasswordRequestHandle() {
  if (email.value === '') {
    toast.warning(t(t('Settings.add.messages.emailRequired')))
  }else if (validateEmail(email.value)) {
    toast.warning(t(t('Resumes.editor.toasts.invalidEmail')))
  } else {
    try {
      loading.value = true;
      await authStore.RESET_PASSWORD_REQUEST(email.value);
      loading.value = false;
    } catch (err: any) {
      let errorMessage = err.response.data.message.toString();
      loading.value = false;
      if(errorMessage = 'email must be an email') {
        toast.error(t('resetPassword.error.invalidEmail'))
      } else {
        toast.error(t('Error, Try again'))

      }
    }
  }
}

const valid = ref(false);
const show1 = ref(false);
const email = ref('');

const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

</script>

<template>
  <v-responsive width="350px" class="d-flex align-center" >
    <div class="d-flex align-center text-center mb-6 cursor-pointer" @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></div>
    <h2 class="text-h2 text-center font-weight-semibold mb-2 text-primary">{{t('resetPassword.resetPasswordTitle')}}</h2>
    <div class="text-h5 mb-6 text-center">
     {{t('resetPassword.resetPasswordText')}}

    </div>
    <div class="mt-5">
      <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
      <VTextField v-model="email" class="mb-8" required hide-details="auto" placeholder="Email"></VTextField>
      <v-btn size="large" rounded="xl" :loading="loading" color="primary" @click="resetPasswordRequestHandle" block flat>{{ t('resetPassword.submit') }}
      </v-btn>

    </div>
  </v-responsive>
</template>
