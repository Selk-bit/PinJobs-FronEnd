<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from '@/stores/auth';



const authStore = useAuthStore();
const loading = ref(false);
const password = ref('');
const password_confirmation = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);

async function resetPassword(token: string, password: string, password_confirmation: string) {
  if (password_confirmation !== password) {
    alert('password mismatch')
  } else {
    try {
      loading.value = true;
      await authStore.RESET_PASSWORD(token, password, password_confirmation);
      loading.value = false;
    } catch (err: any) {
      console.log(err)
      loading.value = false;
    }
  }
}
</script>

<template>
  <div>
    <!--      {{$route.query.token}}-->
    <div class="d-flex align-center text-center mb-6"></div>
    <h2 class="text-h3 font-weight-semibold mb-2 text-primary text-center">Please type the new password</h2>
    <div class="text-h6 mb-6 text-center">Please enter a new password twice to very that you entered it correctly</div>
    <div class="mt-5">
      <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Password</v-label>
      <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password"
                  class="pwdInput"></VTextField>
      <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Confirm password

      </v-label>
      <VTextField
          v-model="password_confirmation"
          :rules="passwordRules"
          required
          hide-details="auto"
          type="password"
          class="pwdInput pb-2"
      ></VTextField>
      <v-btn size="large" @click="resetPassword(<string>$route.query.token,password,password_confirmation)" :loading="loading"
             color="primary" block
             flat
      >Submit
      </v-btn>
    </div>
  </div>
</template>

<style scoped lang="sass">
$main: #ff5c8e
</style>
