<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { validateEmail } from '@/utils/helpers/validate-email';

const authStore = useAuthStore();
const loading = ref(false);
const show_password = ref(false);
const { t } = useI18n();

const password = ref('');
const username = ref('');

async function validate() {
  if (password.value === '' || username.value === '') {
    toast.error(t('auth.login.validation.missingFields'));
    loading.value = false;
  } else if (!validateEmail(username.value)) {
    toast.error(t('Models.consultation.toasts.invalidEmail'));
  } else {
    try {
      loading.value = true;
      // Make the login request
      const data = await authStore.LOGIN(username.value.toLowerCase(), password.value);
      loading.value = false;
      toast.success(t('auth.welcome'));
      return data;
    } catch (error: any) {
      loading.value = false;
      const errData = error.response?.data;
      if (errData?.error === 'Invalid credentials') {
        toast.error(t('auth.errors.invalidCredentials'));
      } else {
        toast.error(t('error.generic'));
      }
    } finally {
      loading.value = false;
    }
  }
}


function onKeydown(event: any) {
  if (event.ctrlKey) {
    show_password.value = true;
  }
}

function onKeyup(event: any) {
  if (!event.ctrlKey) {
    show_password.value = false;
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('keyup', onKeyup);
});
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <v-card-title class="justify-center">{{ t('auth.authText') }}</v-card-title>

        <v-form>
          <v-text-field
            v-model.trim="username"
            label="Email"
            placeholder="Enter your email"
            hide-details="auto"
            prepend-inner-icon="mdi-account"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            :type="show_password ? 'text' : 'password'"
            placeholder="Enter your password"
            hide-details="auto"
            prepend-inner-icon="mdi-lock"
            @keyup.native.enter="validate"
          >
            <template v-slot:append-inner>
              <v-icon @click="show_password = !show_password">
                {{ show_password ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template>
          </v-text-field>

          <v-btn class="mt-4" :loading="loading" block color="primary" @click="validate">
            {{ t('auth.signIn') }}
          </v-btn>
        </v-form>

        <div class="text-center mt-2">
          <router-link :to="{ name: 'reset-password-request' }" class="text-decoration-none text-body-1">
            {{ t('auth.forgotPassword') }}
          </router-link>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="text-center">
          {{ t('auth.noAccount') }}
          <v-btn to="/auth/register" class="mx-0 px-0" variant="plain" color="primary">
            {{ t('auth.register.signup') }}
          </v-btn>
        </div>
    </div>
  </div>
</template>

<style scoped>

a {
  color: inherit;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Full width of the parent container */
  height: 100%; /* Full height of the parent container */
}

.login-card {
  width: 100%;
  max-width: 600px; /* Remove fixed width */
  padding: 2rem;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
  border-radius: 12px;
}

.v-text-field {
  margin-bottom: 1.5rem;
}

.v-btn {
  background-color: var(--v-theme-primary);
  color: white;
}

.v-btn:hover {
  background-color: var(--v-theme-primary);
  opacity: 0.9;
}
</style>
