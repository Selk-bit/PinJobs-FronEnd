<template>
  <v-container class="my-12" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="mb-3 justify-center d-flex" data-aos="fade-up">
            <v-img :src="support" height="320" width="300"/>
          </div>
          <v-card-title class="text-h1 text-primary text-center">{{ t('contact.page-title') }}</v-card-title>
          <div class="text-center text-h5 mb-4">
            {{ t('contact.page-text') }}
          </div>
        <v-card elevation="1" class="pa-6 ">


          <div class="d-flex flex-column my-5">

            <v-text-field
                v-model="email"
                :label="t('contact.email-label')"
                type="email"
                variant="outlined"
                :rules="[rules.required, rules.email]"
                required
                class="mb-4"
            />

            <v-text-field
                v-model="subject"
                :label="t('contact.subject-label')"
                variant="outlined"
                :rules="[rules.required]"
                required
                class="mb-4"
            />

            <v-textarea
                v-model="message"
                :label="t('contact.message-label')"
                variant="outlined"
                rows="4"
                :rules="[rules.required]"
                required
                class="mb-4"
            />
            <v-btn color="primary" :loading="loading" :disabled="emptyFields" variant="outlined" @click="submitForm"
                   block>
              {{ t('contact.send-message') }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useDisplay} from 'vuetify';
import support from "@/assets/images/illustrations/support.svg"
import {toast} from "vue-sonner";
import {useContactStore} from "@/stores/contact";
import {validateEmail} from "@/utils/helpers/validate-email";
import {useI18n} from "vue-i18n";
// Form fields
const email = ref('');
const subject = ref('');
const message = ref('');
const loading = ref<boolean>(false)
const contact = useContactStore();
const {t} = useI18n()
// Form validation rules
const rules = {
  required: (value: string) => !!value || t('contact.required'),
  email: (value: string) => /\S+@\S+\.\S+/.test(value) || t('contact.invalid-email'),
};

// Display mode (optional: responsive layout handling)
const {mobile} = useDisplay();
const emptyFields = computed(() => {
  return (email.value == '' || subject.value == '' || message.value == '')
})
// Submit form
const submitForm = async () => {
  if (!validateEmail(email.value)) {
    toast.error(t('models.consultation.toasts.invalidEmail'));
  } else if (emptyFields.value) {
    toast.error(t('contact.required-fields'));
  } else {
    try {
      loading.value = true;
      await contact.SEND_EMAIL_TO_SUPPORT({
        email: email.value,
        subject: subject.value,
        message: message.value,
      })
      email.value = '';
      subject.value = '';
      message.value = '';
      toast.success(t('contact.email-send-success'));
    } catch (err: any) {
      console.log(err)
      toast.error(t('error'))
    } finally {
      loading.value = false;
    }
  }


};
</script>

<style scoped>


.v-btn {
  font-weight: bold;
}

.v-card-title {
  color: #3F51B5;
}

@media (max-width: 600px) {
  .v-card {
    padding: 16px;
  }

  .v-card-title {
    font-size: 24px;
  }
}
</style>
