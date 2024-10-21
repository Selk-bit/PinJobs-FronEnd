<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {toast} from "vue-sonner";
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
import {computed, onMounted, ref} from "vue";
import {useClientStore} from "@/stores/client";
import UILoader from "@/components/shared/UILoader.vue";
import type {ClientProfile} from "@/types/client-profile";
import CustomAlert from "@/components/shared/CustomAlert.vue";

const backBlazeUrl = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);
const clientProfile = ref({} as ClientProfile);
const fileData = ref()
const authStore = useAuthStore();
const {t} = useI18n();

const clientStore = useClientStore();
const loading = ref<boolean>(false)
const delete_loading = ref<boolean>(false)
const updateClient = async () => {
  // Add your submit logic here
  if (clientProfile.value.name == '') {
    toast.info('Name required');
  } else if (fileData.value && fileData.value.type !== 'image/png') {
    toast.info(t('Settings.account.onlyPng'));
  } else {
    try {

      loading.value = true;

      let dto = {name: clientProfile.value.name, logo: logofile.value};
      await clientStore.UPDATE(dto, clientProfile.value.id);
      await authStore.GET_CURRENT_USER();
      toast.success(t('Settings.updateSuccess'));
      loading.value = false;
    } catch (err: any) {
      let errData = err.response.data;
      if (errData.message == "Validation failed (expected type is image/png)") {
        toast.error(t('Settings.account.onlyPng'));
      } else {
        toast.error(t('error'));
      }

    } finally {
      loading.value = false;
    }
  }
};

const deleteClientLogo = async () => {
  delete_loading.value = true

  try {
    await clientStore.DELETE_LOGO(clientProfile.value.id);
    await authStore.GET_CURRENT_USER();
    toast.success(t('Settings.updateSuccess'));
    url.value = ''
    delete_loading.value = false
  } catch (err: any) {
    toast.error(t('error'));
    delete_loading.value = false
    return Promise.reject(err);
  }

}


function removeFile() {
  logofile.value = null;
  fileData.value = null
  url.value = '';
}

const isLogoFound = computed(() => {
  if (useAuthStore().user.clientProfile?.logo) {
    return import.meta.env.VITE_BACKBLAZE_ENDPOINT + useAuthStore().user.clientProfile?.logo;

  } else {
    return null
  }
})
const onButtonClick = () => {
  window.addEventListener('focus', () => {

  }, {once: true})

  logoInput.value ? logoInput.value.click() : '';
}

const load_page = ref(false)
const logoInput = ref<HTMLInputElement | null>(null);
const logofile = ref();
const url = ref('')

// actions
async function handleFileChange() {
  logofile.value = logoInput.value?.files![0];
  url.value = URL.createObjectURL(logofile.value);
  await convertToBlob();
}

async function convertToBlob() {
  if (!logofile.value) {
    console.log("Please enter an image URL.");
    return;
  }
  try {
    // Fetch the image and convert it to a blob
    const response = await fetch(logofile.value);
    const blob = await response.blob();

    // Extract the file extension from the URL
    const extension = logofile.value.split('.').pop().split(/\#|\?/)[0];
    const mimeType = blob.type;

    // Create a File object from the blob
    const file = new File([blob], `image.${extension}`, {
      type: mimeType,
    });

    // Extract data from the File object
    fileData.value = {
      name: file.name,
      extension: extension,
      type: file.type,
      size: file.size,
    };
    return file;
  } catch (error) {
    console.log("Error converting image:", error);
  }
}

onMounted(async () => {
  try {
    load_page.value = true
    await authStore.GET_CURRENT_USER();
    clientProfile.value = authStore.user.clientProfile as ClientProfile;
    url.value = backBlazeUrl.value + clientProfile.value.logo;
    logofile.value = url.value
    await convertToBlob()
    load_page.value = false
    console.log(url.value);
  } catch (err: any) {
    console.log(err);
    toast.error(t('error'))
  }
})
</script>

<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="12" md="6" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Settings.account.accountName') }}</v-label>
        <v-text-field disabled variant="outlined" v-model="clientProfile.name"
                      :placeholder="t('Settings.account.accountName')"
                      color="primary"></v-text-field>
        <div class="text-body-1  my-3">
          <CustomAlert title="Attention" color="info" :message="t('Settings.alerts.change-client-name')"/>
        </div>
      </v-col>


      <v-col>
        <v-file-input
            class="d-none"
            show-size

            type="file"
            color="secondary"
            ref="logoInput"
            @change="handleFileChange"
            accept=".png"
            variant="outlined"
        ></v-file-input>
        <v-badge icon="mdi-delete" color="error" class=" cursor-pointer " @click.stop="removeFile">
          <v-avatar @click.stop="onButtonClick" :image="url ? url : ''" :icon="url ? url : 'mdi-image-plus-outline' "
                    class="cursor-pointer text-primary drag-drop-area" size="60"
                    rounded="xl" v-ripple style="border: 1px dashed grey">
          </v-avatar>
        </v-badge>
        <div v-if="fileData">{{ fileData.name }} ({{ (fileData.size / 1024).toFixed(2) }} KB)</div>
      </v-col>
      <v-col cols="12" class=" py-0">
        <v-btn @click="updateClient" :loading="loading" class="mb-4  text-capitalize" color="primary">
          {{ t('Settings.account.updateClient') }}
        </v-btn>
        <v-btn @click="deleteClientLogo" :disabled="!isLogoFound" :loading="delete_loading" variant="outlined"
               class="mb-4  mx-1 text-capitalize"
               color="error">
          <v-icon>mdi-delete</v-icon>
          {{ t('Models.consultation.delete') }} logo
        </v-btn>
      </v-col>
    </v-row>

    <v-overlay v-model="load_page" v-if="load_page" class="d-flex justify-center align-center">

      <UILoader/>
    </v-overlay>
  </div>
</template>

<style scoped lang="scss">

</style>