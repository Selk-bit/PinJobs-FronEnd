<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import type { RegistrationForm } from "@/types/auth";
import { validateEmail } from "@/utils/helpers/validate-email";
import CustomConfirmationDialog from "@/components/shared/CustomConfirmationDialog.vue";

const authStore = useAuthStore();
const loading = ref(false);
const show_password = ref(false);
const { t } = useI18n();

const form = ref<RegistrationForm>({
  username: '', // New field for username
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  age: null, // Age field
  city: '',
  country: ''
});

const passwordMinChar = ref(8);
const agree = ref(false); // Agree to terms checkbox state
const confirmation_message_dialog = ref(false);
const terms_dialog = ref(false);  // Terms dialog state

// Function to open the terms and conditions dialog
function openTermsDialog() {
  terms_dialog.value = true;
}

// Function to handle registration
async function register() {
  if (form.value.password == '' ||
      form.value.email == '' ||
      form.value.phone == '' ||
      form.value.lastName == '' ||
      form.value.firstName == '' ||
      form.value.username == '' || // Check if username is filled
      form.value.age == null || // Check if age is filled
      form.value.city == '' ||
      form.value.country == '') {
    toast.error(t('auth.register.validation.missingFields'));
    loading.value = false;
  } else if (!agree.value) {
    toast.error(t('auth.register.validation.acceptTerms'));
  } else if (form.value.password !== form.value.password_confirmation) {
    toast.error(t('auth.register.validation.passwordMismatch'));
  } else if (!validateEmail(form.value.email)) {
    toast.error(t('Models.consultation.toasts.invalidEmail'));
  } else if (form.value.password.length < passwordMinChar.value) {
    toast.error(t('auth.register.validation.passMinChar', { limit: passwordMinChar.value }));
  } else {
    try {
      loading.value = true;
      
      // Call the backend registration API
      const response = await authStore.REGISTER(form.value);
      
      // Handle success - backend returns the serialized candidate data
      const candidateData = response.data;
      toast.success(t('auth.register.success'));
      console.log('Candidate created successfully:', candidateData);

      confirmation_message_dialog.value = true;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;

      // Handle failure - backend returns an error message
      if (error.response && error.response.data) {
        const errData = error.response.data;
        toast.error(t('error') + ': ' + (errData.error || 'An error occurred.'));
      } else {
        toast.error(t('error') + ': ' + 'An unknown error occurred.');
      }
    } finally {
      loading.value = false;
    }
  }
}
</script>

<template>
  <CustomConfirmationDialog :title="t('auth.register.verification-message.title')"
                            :confirm-text-button="t('auth.register.verification-message.agree')"
                            :text="t('auth.register.verification-message.text')"
                            :cancel-text-button="t('auth.register.login')"
                            @accept="confirmation_message_dialog = false"
                            :dialog="confirmation_message_dialog"
                            @reject="$router.push({name:'login'})"
  />

  <div class="container">
    <h4 class="text-h4 form-title">{{ t('auth.register.createAccount') }}</h4>
    <p class="subtitle">{{ t('auth.register.successMessage') }}</p>

    <v-row dense class="form-row">
      <v-col cols="12" lg="6">
        <VTextField v-model="form.firstName" required :placeholder="t('auth.register.first')" hide-details="auto"
                    class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.lastName" required :placeholder="t('auth.register.last')" hide-details="auto"
                    class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.username" required :placeholder="t('auth.register.username')" hide-details="auto"
                    class="custom-input"></VTextField> <!-- New Username Field -->
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.email" required type="email" :placeholder="t('auth.register.email')" hide-details="auto"
                    class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.phone" required type="text" :placeholder="t('auth.register.phone')" hide-details="auto"
                    class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.country" required :placeholder="t('auth.register.country')" hide-details="auto"
                    class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.city" required :placeholder="t('auth.register.city')" hide-details="auto"
                    class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.age" required type="number" :placeholder="t('auth.register.age')" hide-details="auto"
                    class="custom-input"></VTextField> <!-- New Age Field -->
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.password" required :placeholder="t('auth.register.password')" :type="show_password ? 'text' : 'password'"
                    @click:append-inner="show_password = !show_password" hide-details="auto"
                    :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" class="custom-input"></VTextField>
      </v-col>
      <v-col cols="12" lg="6">
        <VTextField v-model="form.password_confirmation" required :placeholder="t('auth.register.confirm')" :type="show_password ? 'text' : 'password'"
                    @click:append-inner="show_password = !show_password" hide-details="auto"
                    :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" class="custom-input"></VTextField>
      </v-col>
    </v-row>

    <!-- Checkbox to agree with terms and conditions -->
    <div class="d-flex align-center my-2">
      <v-checkbox v-model="agree" :indeterminate="false" @click="openTermsDialog"></v-checkbox>
      <div class="ml-3">{{ t('auth.register.checkboxText') }}</div>
    </div>

    <v-btn size="large" color="primary" class="sign-in-btn custom-btn" :loading="loading" @click="register">
      {{ t('auth.register.signup') }}
    </v-btn>
    <div class="text-center mt-1">
      {{t('auth.register.accountExist') }}
      <v-btn to="/auth/login" class="mx-0 px-0" variant="plain" color="primary">
        {{t('auth.register.login') }}
      </v-btn>
    </div>

    <!-- Terms Dialog -->
    <v-dialog v-model="terms_dialog" persistent max-width="800">
      <v-card class="overflow-y-auto">
        <v-card-title class="text-h4">{{ t('terms.preamble.title') }}</v-card-title>
        <v-divider class="my-4"></v-divider>
        <v-card-text>
          <section>
            <p>{{ t('terms.preamble.content') }}</p>
          </section>
          <!-- Add more terms sections here as needed -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="() => { agree = false; terms_dialog = false }">{{ t('auth.register.disagree') }}</v-btn>
          <v-btn color="primary" variant="flat" @click="() => { agree = true; terms_dialog = false }">{{ t('auth.register.agree') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<style scoped>
:root {
  --v-theme-primary: var(--v-theme-primary);
  --form-background: #f9f9f9;
  --text-color: #333;
  --input-border: #ddd;
  --input-background: white;
  --container-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --form-background: #1e1e1e;
    --text-color: #f0f0f0;
    --input-border: #555;
    --input-background: #2c2c2c;
    --container-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  }
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--form-background);
  border-radius: 12px;
  box-shadow: var(--container-shadow);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.form-title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.subtitle {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: var(--text-color);
}

.form-row {
  margin-bottom: 1.5rem;
}

.custom-input {
  background-color: var(--input-background);
  border: 1px solid var(--input-border);
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.custom-btn {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  background-color: var(--v-theme-primary);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.custom-btn:hover {
  background-color: var(--v-theme-primary);
  opacity: 0.9;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>
