<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {toast} from "vue-sonner";
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
import {onMounted, ref} from "vue";
import type {User} from "@/types/user";
import UILoader from "@/components/shared/UILoader.vue";

const user = ref({} as User);

const authStore = useAuthStore();
const {t} = useI18n();
const userStore = useUserStore();
const loading = ref<boolean>(false);

const scrapeUnits = [
  { name: t('Settings.account.hours'), value: 'hours' },
  { name: t('Settings.account.days'), value: 'days' },
  { name: t('Settings.account.weeks'), value: 'weeks' }
];

const submitChanges = async () => {
  if (user.value.first_name == '' || user.value.last_name == '') {
    toast.info(t('Settings.account.firstAndLastNameRequired'));
  } else {
    try {
      loading.value = true;
      await userStore.UPDATE_USER({ ...user.value }, user.value.id);
      await authStore.GET_CURRENT_USER();
      toast.success(t('Settings.updateSuccess'));
      loading.value = false;
    } catch (err) {
      toast.error('Error occurred, try Again later');
      loading.value = false;
      return Promise.reject(err);
    }
  }
};

const load_page = ref(false);

onMounted(async () => {
  try {
    load_page.value = true;
    await authStore.GET_CURRENT_USER();
    user.value = authStore.user;
    load_page.value = false;
  } catch (err: any) {
    console.log(err);
    toast.error('Error occurred, try again');
  }
});
</script>

<template>
  <div>
    <v-row class="mb-2">
      <!-- First and Last Name -->
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.name') }}</v-label>
        <v-text-field v-model="user.first_name" variant="outlined" placeholder="First Name" color="primary"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.lastName') }}</v-label>
        <v-text-field v-model="user.last_name" variant="outlined" placeholder="Last Name" color="primary"></v-text-field>
      </v-col>

      <!-- Phone and Age -->
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.phone') }}</v-label>
        <v-text-field v-model="user.phone" variant="outlined" placeholder="Phone" color="primary"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.age') }}</v-label>
        <v-text-field v-model="user.age" type="number" variant="outlined" placeholder="Age" color="primary"></v-text-field>
      </v-col>

      <!-- City and Country -->
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.city') }}</v-label>
        <v-text-field v-model="user.city" variant="outlined" placeholder="City" color="primary"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.country') }}</v-label>
        <v-text-field v-model="user.country" variant="outlined" placeholder="Country" color="primary"></v-text-field>
      </v-col>

      <!-- Email (Disabled) -->
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.email') }}</v-label>
        <v-text-field v-if="user.user" :value="user.user.email" disabled variant="outlined" placeholder="Email" color="primary"></v-text-field>
      </v-col>

      <!-- Scraping Settings -->
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.numJobsToScrape') }}</v-label>
        <v-text-field v-model="user.num_jobs_to_scrape" type="number" variant="outlined" placeholder="Jobs to Scrape" color="primary"></v-text-field>
      </v-col>

      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.scrapeInterval') }}</v-label>
        <v-text-field v-model="user.scrape_interval" type="number" variant="outlined" placeholder="Scrape Interval" color="primary"></v-text-field>
      </v-col>

      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.scrapeUnit') }}</v-label>
        <v-select
          :items="scrapeUnits"
          v-model="user.scrape_unit"
          item-title="name"
          item-value="value"
          label="Scrape Unit"
          color="primary"
        />
      </v-col>
    </v-row>

    <v-col cols="12" class="mt-4 py-0">
      <v-btn @click="submitChanges" :loading="loading" class="mb-4" color="primary">{{ t('Settings.account.updateUser') }}</v-btn>
    </v-col>

    <v-overlay v-model="load_page" class="d-flex justify-center align-center">
      <UILoader/>
    </v-overlay>
  </div>
</template>

<style scoped lang="scss">
.v-text-field, .v-select, .v-switch {
  margin-bottom: 1.5rem;
}

.v-btn {
  background-color: var(--v-theme-primary);
  color: white;
  width: 100%;
}

.v-btn:hover {
  background-color: var(--v-theme-primary-dark);
}

.verified-icon {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.v-overlay {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
