<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import type {Header, Item} from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import {useCandidateStore} from "@/stores/candidate";
import type {Candidate} from "@/types/candidate";
import {toast} from "vue-sonner";
import {getPrimary} from "@/utils/UpdateColors";
import {FormatDate} from "@/utils/helpers/useDate";
import {useI18n} from "vue-i18n";
import {useNotificationsStore} from "@/stores/notifications";
import {notifications} from "@/_mockApis/headerData";
import {useAuthStore} from "@/stores/auth";

const {t} = useI18n();
const clientId =ref();
const page = ref({title: t('Resumes.chargement.title')});
let breadcrumbs = ref([
  {
    text: t('Resumes.chargement.breadcrumbs.personnalisation'),
    disabled: false,
    href: "#",
  },
  {
    text: t('Resumes.chargement.breadcrumbs.chargement'),
    disabled: true,
    href: "#",
  },
]);
const candidateStore = useCandidateStore();
const notificationStore = useNotificationsStore();


const table_loading = ref(false);
const searchValue = ref('');
const headers: Header[] = [
  {text: t('Resumes.chargement.headers.name'), value: "resumeData.name", sortable: true},
  {text: t('Resumes.chargement.headers.email'), value: "resumeData.email", sortable: true},
  {text: t('Resumes.chargement.headers.createdAt'), value: "createdAt", sortable: true},
  {text: t('Resumes.chargement.headers.updatedAt'), value: "updatedAt", sortable: true},

];

const loading = ref(false);
const upload_candidates_popup = ref(false);


const filteredList = computed(() => {
  if (searchValue.value !== '') {
    return candidateStore.candidates?.filter((candidate: Candidate) => {
      return candidate.resumeData.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  } else {
    return candidateStore.candidates;
  }

});

const import_candidate_file_dialog = ref(false);
// import refs
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref();
const overlay = ref(false);

// actions
function handleFileChange() {
  files.value = fileInput.value?.files;
}

async function importCandidates() {
  let importedFiles;
  if (files.value && files.value.length > 0) {
    importedFiles = files.value;
  } else {
    importedFiles = null;
  }

  if (importedFiles == null) {
    toast.warning(t('Resumes.chargement.importFile'));
    return;
  } else {
    try {
      loading.value = true;
      await candidateStore.CREATE(importedFiles);
      const val = t('Resumes.chargement.importSuccess')
      toast.success(val);
      notificationStore.add({title:t('Resumes.chargement.importSuccess')});
      await candidateStore.GET_ALL();
      upload_candidates_popup.value = true
      loading.value = false;
      import_candidate_file_dialog.value = false;
    } catch (err: any) {
      if (err) {
        import_candidate_file_dialog.value = false;
        const value = t('Resumes.chargement.importError')
        toast(value);
      }

    }
  }

}

const uploadCandidateFileDialogHandle = () => {
  import_candidate_file_dialog.value = true;

}


onMounted(async () => {
  table_loading.value = true;
   clientId.value = useAuthStore().user.clientProfileId;
  await candidateStore.GET_ALL_BY_CLIENT(clientId.value);
  table_loading.value = false
  // refreshData();

})

</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <div>
        <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row justify="space-between" class="align-center mb-3">
          <v-col cols="12" md="12">
            <v-text-field
                type="text"
                class="mx-auto"
                variant="solo"
                density="comfortable"
                hide-details
                style="max-width: 700px;border-radius: 50% !important;"
                prepend-inner-icon="mdi-magnify"
                :placeholder="t('Resumes.chargement.searchText')"
                v-model="searchValue"
            />
          </v-col>
          <v-col>
            <v-btn class="ma-1 float-right" variant="outlined" color="primary" @click="uploadCandidateFileDialogHandle">
              <v-icon>mdi-upload-outline</v-icon>
              {{ $t('Resumes.chargement.loadCandidateData') }}
            </v-btn>
          </v-col>
        </v-row>
        <EasyDataTable

            :headers="headers"
            :theme-color="getPrimary"
            class=" customize-table"
            :items="filteredList"
            :loading="table_loading"
        >
          <template #empty-message>
            <v-icon size="30">mdi-folder-search-outline</v-icon>
            <div>
              {{ $t('Resumes.chargement.noDataFound') }}
            </div>
          </template>
          <template #loading>
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
          </template>
          <template #item-createdAt="{createdAt}">
            {{ FormatDate(createdAt) }}
          </template>
          <template #item-updatedAt="{updatedAt}">
            {{ FormatDate(updatedAt) }}
          </template>
        </EasyDataTable>
        <div>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-dialog v-model="import_candidate_file_dialog" width="auto">
    <v-card class="pa-4 ">
      <v-card-text class="text-h3 ">{{ $t('Resumes.chargement.chooseFileImport') }}
      </v-card-text>
      <v-file-input
          show-size
          type="file"
          color="secondary"
          ref="fileInput"
          @change="handleFileChange"
          accept="*"
          multiple
          variant="outlined"
          hint="Sélectionner un fichier pour en importer les données"
          label="Importer les fichiers"
      ></v-file-input>

      <v-card-actions class="d-flex justify-center mt-3">
        <v-btn size="large" variant="outlined" color="warning" @click="import_candidate_file_dialog = false">
          {{ $t('Resumes.chargement.cancel') }}
        </v-btn>
        <v-btn size="large" variant="outlined" color="info" @click="importCandidates"
               :loading="loading"
        >
          <v-icon class="mr-2" size="30">mdi-cloud-upload</v-icon>
          {{ $t('Resumes.chargement.import') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="upload_candidates_popup" max-width="900">
    <v-card class=" d-flex justify-center align-center ma-3 pa-4  my-6 flex-column" rounded="sm">
      <v-icon size="90" color="success">mdi-check-decagram</v-icon>
      <div class="text-success text-h2 mb-4 ">
        Success!
      </div>
      <div class="text-center text-h4">
        {{ $t('Resumes.chargement.waitText') }}
      </div>
      <v-row>
        <v-col>
          <v-btn class="mt-4 mr-3" @click="upload_candidates_popup = false" color="secondary" variant="outlined"
                 rouned="xl">
            {{ $t('Resumes.chargement.close') }}
          </v-btn>
        </v-col>
      </v-row>

    </v-card>
  </v-dialog>
</template>


<style scoped lang="scss">


</style>