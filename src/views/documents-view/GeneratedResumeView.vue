<script setup lang="ts">
import { useRouter } from 'vue-router';
import GalleryCard from '@/components/base-cv/resume-gallery/GalleryCard.vue';
import os from '@/assets/images/templates/os.jpg';
import OptionsCard from '@/components/base-cv/resume-gallery/OptionsCard.vue';
import { onMounted, reactive, ref } from 'vue';
import OptionItem from '@/components/base-cv/resume-gallery/OptionItem.vue';
import DynamicInputDialog from '@/components/base-cv/DynamicInputDialog.vue';
import { useResumeStore } from '@/stores/resume';
import { useAuthStore } from '@/stores/auth';
import AppLoader from '@/components/shared/AppLoader.vue';
import { toast } from 'vue-sonner';
import { useTailoredResumeStore } from '@/stores/tailored-resume';
import ImportFromScratch from '@/components/base-cv/ImportFromScratch.vue';
import type { Resume } from '@/types/resume';
// utils
const router = useRouter();

// stores
const resumeStore = useResumeStore();
const tailoredStore = useTailoredResumeStore();

const openUploadBaseCvDialog = () => {
    cv_dialog.value = !cv_dialog.value;
};
const openUrlDialog = () => {
    url_dialog.url = '';
    url_dialog.error = '';
    url_dialog.dialog = !url_dialog.dialog;
};
const openLinkedInDialog = () => {
    linkedIn_dialog.url = '';
    linkedIn_dialog.error = '';
    linkedIn_dialog.dialog = !linkedIn_dialog.dialog;
};

// base
async function generateBaseCvFromLinkedIn() {
    if (useAuthStore().user.credits == 0) {
        linkedIn_dialog.error = 'You don\'t have enough credits';
        return;
    }
    try {
        linkedIn_dialog.dialog = false;
        loading.value = true;
        await resumeStore.IMPORT_BASE_LINKEDIN_PROFILE(linkedIn_dialog.url);
        toast.success('LinkedIn profile imported successfully');
    } catch (error) {
        linkedIn_dialog.error = 'Unknown error occured';
    }
}

// tailored
async function generateTailoredCvFromJobLink() {
    if (useAuthStore().user.credits == 0) {
        url_dialog.error = 'You don\'t have enough credits';
        return;
    }
    try {
        url_dialog.dialog = false;
        loading.value = true;
        await resumeStore.IMPORT_BASE_LINKEDIN_PROFILE(url_dialog.url);
        toast.success('LinkedIn profile imported successfully');
    } catch (error) {
        url_dialog.error = 'Unknown error occured';
    }
}

// base
function generateFromScratch() {
    router.push({ name: 'select-template' });
}

// state
const loading = ref(false);
const cv_dialog = ref(false);
const linkedIn_dialog = reactive({
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
const url_dialog = reactive({
    dialog: false,
    error: '',
    url: '',
    dialogTitle: 'Connect a Job Link',
    dialogSubTitle: 'Quickly import job details to streamline your application process and stay organized.',
    cancelText: 'Cancel',
    importText: 'Generate',
    placeholder: 'Enter your input',
    prependIcon: 'mdi-briefcase-outline',
    appendIcon: ''
});


async function getAllTailoredResumes() {
    try {
        await tailoredStore.GET_ALL();

    } catch (err: any) {
        console.warn(err);
    }
}

const option_items = [
    {
        icon: 'mdi-file-document-outline',
        title: 'Create from scratch',
        func: generateFromScratch
    },
    {
        icon: 'mdi-plus',
        title: 'Upload new Base Resume',
        func: openUploadBaseCvDialog
    },
    {
        icon: 'mdi-linkedin',
        title: 'Import Base from LinkedIn',
        func: openLinkedInDialog
    },
    {
        icon: 'mdi-creation',
        title: 'New Resume with Job URL',
        func: openUrlDialog
    }


];
onMounted(async () => {
    await getAllTailoredResumes();
});


// actions

async function deleteTailoredResume(id: number) {
    try {
        await tailoredStore.DELETE(id);
        await getAllTailoredResumes();
    } catch (err: any) {
        console.warn(err);
    }
}

const editResumeName = async (name: string, cv_data: Resume) => {
    await tailoredStore.UPDATE_NAME(name, cv_data);
    // console.log(`new name ${name} for id : ${id}`)
};

const editCv = (id: number) => {
    router.push({ name: 'select-template', params: { id } });
};

</script>

<template>
    <div>
        <v-row dense class="mx-auto " style="max-width: 1300px;">
            <!-- Create Blank Resume Card -->
            <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="d-flex justify-start"
            >
                <OptionsCard>
                    <option-item :title="item.title" @click="item.func" :icon="item.icon"
                                 v-for="item  in option_items" />
                </OptionsCard>
            </v-col>
            <!-- Resume Cards -->
            <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="resume  in tailoredStore.getCvsResults?.results"
                :key="resume.id"
            >

                <GalleryCard
                    :title="resume.name || 'random '"
                    :image="os"
                    @update:name="editResumeName(resume.name,resume.cv_data)"
                    v-model:name="resume.name"
                    @delete="deleteTailoredResume(resume.id)"
                    is-resume
                    @click="editCv(resume.id)"
                    @edit="editCv(resume.id)"
                />
            </v-col>
        </v-row>
    </div>
    <ImportFromScratch v-model:dialog="cv_dialog" />
    <DynamicInputDialog v-model="url_dialog.url"
                        @generate="generateTailoredCvFromJobLink"
                        v-model:error="url_dialog.error"
                        :dialog-title="url_dialog.dialogTitle"
                        :prepend-icon="url_dialog.prependIcon"
                        :dialog-sub-title="url_dialog.dialogSubTitle"
                        v-model:dialog="url_dialog.dialog" />

    <DynamicInputDialog v-model="linkedIn_dialog.url"
                        @generate="generateBaseCvFromLinkedIn"
                        v-model:error="linkedIn_dialog.error"
                        :prepend-icon="linkedIn_dialog.prependIcon"
                        :dialog-title="linkedIn_dialog.dialogTitle"
                        :dialog-sub-title="linkedIn_dialog.dialogSubTitle"
                        v-model:dialog="linkedIn_dialog.dialog" />

    <app-loader :loading="loading" />
</template>

<style scoped lang="scss">

</style>