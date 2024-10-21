<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from '@/stores/auth';
import {useI18n} from "vue-i18n";
/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import {router} from '@/router';



const {t} = useI18n()

function login() {
  // const authStore = useAuthStore();
  router.push('/auth/login');
}
</script>

<template>
  <div  class="d-flex flex-column align-center">
     <div style="height: 60px"></div>
    <h2 class="text-h2 font-weight-semibold mb-2 text-center "><v-icon color="success">mdi-email-outline</v-icon></h2>
    <h1 class="text-h1 font-weight-bold mb-2 text-center ">{{t('resetPassword.resetPasswordSuccess.emailSentTitle')}}</h1>
    <h3 class="d-flex align-center font-weight-light text-center ma-2 mb-6">
{{t('resetPassword.resetPasswordSuccess.emailSentText')}}
<!--      If you don't receive the link please-->
<!--      report it to the administrator or contact us at-->
    </h3>
    <div style="height: 100px"></div>
<!--    <div class="text-h5 mb-6 text-center">Your password has been set. Click on the button to sing in.</div>-->
    <v-btn  :loading="false" variant="flat"  class=" float-right  mr-6 mt-5"  type="submit" flat
           @click="login">{{t('resetPassword.resetPasswordSuccess.goToLogin')}} <v-icon class="ml-1">mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>
