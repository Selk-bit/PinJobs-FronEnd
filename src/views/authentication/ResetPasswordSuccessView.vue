<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";
const router = useRouter()
function login() {
    // const authStore = useAuthStore();
    router.push({name:'login'});
}
</script>

<template>
<div>
    <div class="d-flex justify-center align-content-center">
      <v-icon color="success" size="120">mdi-check-circle-outline</v-icon>
    </div>
    <h2 class="text-h2 font-weight-semibold mb-2 text-center text-primary text-success" >Your password has been reset successfully !</h2>
    <div class="text-h5 mb-5 6 text-center">Please return to login screen to login </div>
    <v-btn size="large" :loading="false" color="secondary"  block  flat @click="login">Sign In </v-btn>
</div>
</template>
