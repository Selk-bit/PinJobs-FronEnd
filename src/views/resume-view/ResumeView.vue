<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import noBaseCv from '@/assets/images/illustrations/no-cv-base.svg';
import { useI18n } from 'vue-i18n';
import type { Template } from '@/types/model';
import { useAuthStore } from '@/stores/auth';
import { useResumeStore } from '@/stores/resume';
import AppLoader from '@/components/shared/AppLoader.vue';
import LoadingFlash from '@/components/shared/LoadingFlash.vue';
import ImportFromScratch from '@/components/base-cv/ImportFromScratch.vue';
import DocumentsView from '@/views/documents-view/DocumentsView.vue';
import DynamicInputDialog from '@/components/base-cv/DynamicInputDialog.vue';
import { toast } from 'vue-sonner';
import type { Cv } from '@/types/resume';

// utils
const { t } = useI18n();
const router = useRouter();
// stores
const resumeStore = useResumeStore();


// state
const app_loading = ref<boolean>(false);
const loading = ref(false);
const cv_dialog = ref(false);
const url_dialog = reactive({
    dialog: false,
    error: '',
    url: '',
    dialogTitle: 'Connect your LinkedIn profile',
    dialogSubTitle: 'Effortlessly import your professional details and let your experience speak for itself.',
    cancelText: 'Cancel',
    importText: 'Generate',
    placeholder: 'Enter your input',
    prependIcon: 'mdi-linkedin',
    appendIcon: ''
});


// functions
const resumeBaseExist = computed(() => {
    return !!resumeStore.base?.id;
});

function generateFromScratch() {
    router.push({ name: 'cv-editor' });
}

const openUploadBaseCvDialog = () => {
    cv_dialog.value = !cv_dialog.value;
};
const openUrlDialog = () => {
    url_dialog.url = '';
    url_dialog.error = '';
    url_dialog.dialog = !url_dialog.dialog;
};

async function generateFromLinkedIn() {
    if (useAuthStore().user.credits == 0) {
        url_dialog.error = 'You don\'t have enough credits';
        return;
    }
    try {
        url_dialog.dialog = false;
        app_loading.value = true;
        await resumeStore.IMPORT_BASE_LINKEDIN_PROFILE(url_dialog.url);
        toast.success('LinkedIn profile imported successfully');
    } catch (error) {
        url_dialog.error = 'Unknown error occured';
    }
}

onMounted(async () => {
    try {
        loading.value = true;
        await resumeStore.GET_BASE_CV_DATA();
        loading.value = false;
    } catch (err: any) {
        console.log(err);
        loading.value = false;
    } finally {
        loading.value = false;
        app_loading.value = false;
    }
});


</script>


<template>
    <div class="mx-auto">
        <!--        loading-->
        <div v-if="loading" style="min-height: 580px" class="d-flex align-center justify-center">
            <LoadingFlash :size="60" text="Loading Profile..." />
        </div>
        <!--        main-->
        <div v-else-if="resumeBaseExist">
            <!--            resume gallery-->
            <DocumentsView />
        </div>
        <div v-else style="min-height: 600px"
             class="no-cv-found d-flex mt-14 pa-3 flex-column justify-center align-center">
            <!--            icon-->
            <img :src="noBaseCv" draggable="false" height="170" alt="no base resume">
            <!--            <v-icon size="80" color="grey100">mdi-file-document-outline</v-icon>-->
            <div class="text-h1 font-weight-light mt-8 text-grey100">
                No base resume found
            </div>
            <div style="font-size: 2.3rem" class=" mt-5 text-center kalam">
                choose your favorite way to upload your resume
            </div>
            <!--            Call to action-->
            <div class=" d-flex  flex-wrap justify-center ">
                <v-btn variant="outlined"
                       class="ma-2"
                       color="success"
                       @click="openUploadBaseCvDialog"
                       prepend-icon="mdi-file-document">
                    Upload Resume
                </v-btn>
                <v-btn variant="outlined"
                       @click="openUrlDialog"
                       class="ma-2" color="info" prepend-icon="mdi-linkedin">
                    Connect LinkedIn
                </v-btn>
                <v-btn variant="outlined"
                       @click="generateFromScratch"
                       class="ma-2" color="primary"
                       :loading="loading"
                       prepend-icon="mdi-file-edit-outline">
                    Create from
                    scratch
                </v-btn>
            </div>
            <div class="kalam">
                inspired by Salim
            </div>
        </div>
    </div>

    <!--    linkedin dialog-->

    <ImportFromScratch v-model:dialog="cv_dialog" />
    <DynamicInputDialog v-model="url_dialog.url"
                        @generate="generateFromLinkedIn"
                        v-model:error="url_dialog.error"
                        prepend-icon="mdi-linkedin"
                        :dialog-title="url_dialog.dialogTitle"
                        :dialog-sub-title="url_dialog.dialogSubTitle"
                        v-model:dialog="url_dialog.dialog" />
    <AppLoader :loading="app_loading" />
</template>


<style scoped lang="scss">

.cv-options {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
    bottom: 20px;
    right: 20px;
    border-radius: 23px;
    padding: 6px;
    z-index: 1000;
}


</style>