<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import type {ChangePasswordDto} from "@/types/change-password-dto";
import {toast} from "vue-sonner";
import {useAuthStore} from "@/stores/auth";

const {t} = useI18n();
const auth = useAuthStore();
const form = ref<ChangePasswordDto>({
  old_password: '',
  password: '',
  password_confirmation: ''
});
const show_password = ref(false);
const loading = reactive({
  val: false,
  text: t('Settings.security.changePassword.loading.text')
})
const errors = ref({
  old_password: '',
  password: '',
  password_confirmation: ''
});

async function changePassword() {
  let isValid = true;

  // Reset error messages
  errors.value = {
    old_password: '',
    password: '',
    password_confirmation: ''
  };

  // Validate form fields
  if (!form.value.old_password) {
    errors.value.old_password = t('Settings.security.changePassword.errors.required');
    isValid = false;
  }

  if (!form.value.password) {
    errors.value.password = t('Settings.security.changePassword.errors.required');
    isValid = false;
  }

  if (!form.value.password_confirmation) {
    errors.value.password_confirmation = t('Settings.security.changePassword.errors.required');
    isValid = false;
  }

  if (form.value.password && form.value.password_confirmation && form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = t('Settings.security.changePassword.errors.match');
    toast.error('Passwords do not match');
    isValid = false;
  }

  // If validation fails, exit early
  if (!isValid) {
    return;
  }

  // If validation passes, proceed to change password
  try {
    loading.val = true;
    const response = await auth.CHANGE_PASSWORD(form.value);

    if (response) {
      toast.success('Password updated successfully');
    }
  } catch (error:any) {
    console.error(error);
    const errData = error?.response?.data;

    if (errData?.message) {
      if (errData.message === 'Password is incorrect !') {
        toast.error(t('Settings.security.changePassword.errors.invalid'))
      }
    } else {
      toast.error(t('error'));
    }
  } finally {
    loading.val = false;
  }
}



</script>

<template>
  <v-card class="pa-6 mt-2">
    <v-row>
      <v-col>
        <h2 class="mb-4">{{ t('Settings.security.changePassword.title') }}</h2>
      </v-col>
    </v-row>
    <p class="mb-10">{{ t('Settings.security.changePassword.description') }}</p>

    <v-form @submit.prevent="changePassword">
      <v-text-field
          v-model="form.old_password"
          :label="t('Settings.security.changePassword.oldPassword')"

          :error-messages="errors.old_password"
          outlined
            :type="show_password ? 'text' : 'password'"
                    :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="show_password = !show_password"
                    hide-details="auto"
          class="mb-4"
      />

      <v-text-field
          v-model="form.password"
          :label="t('Settings.security.changePassword.newPassword')"
          :type="show_password ? 'text' : 'password'"
          :error-messages="errors.password"
          outlined
                :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="show_password = !show_password"
                    hide-details="auto"
          class="mb-4"
      />
      <v-text-field
          v-model="form.password_confirmation"
          :label="t('Settings.security.changePassword.confirmPassword')"
          :type="show_password ? 'text' : 'password'"
          :error-messages="errors.password_confirmation"
          outlined
                :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="show_password = !show_password"
                    hide-details="auto"
          class="mb-4"
      />
      <v-btn type="submit" color="primary" class="mt-4" >{{ t('Settings.security.changePassword.submit') }}</v-btn>
    </v-form>
  </v-card>
  <v-dialog
      v-model="loading.val"
      max-width="320"
      class="backdrop"
      persistent
  >
    <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
    >
      <v-list-item

          :title="loading.text"
      >
        <template v-slot:prepend>
          <div class="pe-4 d-flex justify-center align-center">
            <!--              <v-icon color="primary" size="x-large"></v-icon>-->
            <img src="@/assets/images/logos/logo-app.svg" style="width: 100px"/>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<style scoped>
.v-btn {
  background-color: var(--v-theme-primary);
  color: white;
  width: 100%;
}

.v-btn:hover {
  background-color: var(--v-theme-primary-dark);
}

</style>
