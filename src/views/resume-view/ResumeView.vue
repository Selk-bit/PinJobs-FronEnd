<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import noBaseCv from '@/assets/images/illustrations/no-cv-base.svg';
import { useI18n } from 'vue-i18n';

import type { Template } from '@/types/model';
import { useAuthStore } from '@/stores/auth';
import { validateLink } from '@/utils/helpers/validate-link';
import type { Resume } from '@/types/resume';
import { useModelStore } from '@/stores/model';
import { useResumeStore } from '@/stores/resume';
import { useBaseCvStore } from '@/stores/base-cv';
import AppLoader from '@/components/shared/AppLoader.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingFlash from '@/components/shared/LoadingFlash.vue';
import ResumeGallery from '@/components/base-cv/ResumeGallery.vue';
import ImportLinkedIn from '@/components/base-cv/ImportLinkedIn.vue';
import ImportFromScratch from '@/components/base-cv/ImportFromScratch.vue';
import DocumentsView from '@/views/documents-view/DocumentsView.vue';


const { t } = useI18n();
const router = useRouter();
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const isResumeFormatted = ref(false);
const showDeleteCVDialog = ref(false);
const loading = ref(false);
const cvData = ref({} as Resume);
const baseStore = useBaseCvStore();


// Dynamic card texts based on upload state
const cardTexts = reactive({
    import: 'Upload an existing resume file for quick customization.',
    linkedin: 'Seamlessly convert your LinkedIn data into a professional resume.',
    job: 'Create a tailored resume based on a job listing.',
    blank: 'Start from scratch.'
});


async function generateFromScratch() {
    // app_loading.value = true;
    loading.value = true;
    await router.push({ name: 'cv-editor' });
}


// dummy data for test
const backBlazeUrl = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);
const logo = computed(() => {
    if (!useAuthStore().user.clientProfile?.logo) {
        return 'https://www.largeherds.co.za/wp-content/uploads/2024/01/logo-placeholder-image.png';
    } else {
        return validateLink(backBlazeUrl.value + useAuthStore().user.clientProfile?.logo);

    }
});


const app_loading = ref<boolean>(false);
const tab = ref(1);


onMounted(async () => {
    try {
        loading.value = true;
        let cv = await baseStore.getCVData();
        loading.value = false;
    } catch (err: any) {
        console.log(err);
        loading.value = false;
    } finally {
        loading.value = false;
        app_loading.value = false;
    }
});

const linked = ref(false);

const resumeBaseExist = computed(() => {
    return !!baseStore.resumeData?.cv_id;
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
                <ImportFromScratch show-btn />
                <ImportLinkedIn show-btn />
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