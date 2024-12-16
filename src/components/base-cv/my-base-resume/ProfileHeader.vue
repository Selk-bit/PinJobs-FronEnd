<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import ResumeOverview from '@/components/base-cv/my-base-resume/ResumeOverview.vue';
import ResumeEducationCard from '@/components/base-cv/my-base-resume/ResumeEducationCard.vue';
import ResumeExperienceCard from '@/components/base-cv/my-base-resume/ResumeExperienceCard.vue';
import ResumeSkillsCard from '@/components/base-cv/my-base-resume/ResumeSkillsCard.vue';
import ResumeLanguageCard from '@/components/base-cv/my-base-resume/ResumeLanguageCard.vue';
import { useResumeStore } from '@/stores/resume';
import CustomConfirmationDialog from '@/components/shared/CustomConfirmationDialog.vue';
import { toast } from 'vue-sonner';
import type { Resume } from '@/types/resume';
import LoadingFlash from '@/components/shared/LoadingFlash.vue';

const resume = ref<Resume>({} as Resume);
const tab = ref(1);
const baseStore = useResumeStore();


const delete_dialog = ref(false);
const loading = ref(false);

const closeDeleteCVDialog = () => {
    delete_dialog.value = false;
};


async function deleteCvData() {
    try {
        loading.value = true;
        await baseStore.DELETE_BASE_CV();
        toast.success('Data deleted successfully');
        delete_dialog.value = false;

    } catch (err: any) {
        console.log('Error occured ', err);
    } finally {
        loading.value = false;
    }
}

onBeforeMount(async () => {
    loading.value = true;
    await baseStore.GET_BASE_CV_DATA();
    resume.value = baseStore.base.cv_data;
    loading.value = false;
});
</script>

<template>
    <v-card class="profile-card " elevation="0">
        <div v-if="loading"  class="d-flex justify-center">
            <loading-flash text="loading..." :size="90" />
        </div>
        <div v-else>
            <v-row class="align-center" v-if="resume">
                <!-- Profile Picture and Info -->
                <v-col cols="12 " class=" d-flex justify-space-between flex-wrap align-center">


                    <div v-if="resume">
                        <h3 class="text-h3 font-weight-bold mb-1">{{ resume.name }}</h3>
                        <div class="text-body-1 text-grey">
                            {{ resume.city }} | {{ resume.headline }}
                        </div>
                        <div v-if="resume.yoe">
                            {{ resume.yoe }} Years of experience
                        </div>
                    </div>
                    <div class="contact-card mb-4" v-if="resume">
                        <v-row class="align-start justify-start flex-column   ">
                            <!-- Email -->
                            <div class="d-flex align-center">
                                <v-icon left color="primary">mdi-at</v-icon>
                                <span class="text-body-1 font-weight-medium">{{ resume.email }}</span>
                            </div>
                            <!-- Phone Number -->
                            <div class="d-flex align-center">
                                <v-icon left color="primary">mdi-phone</v-icon>
                                <span class="text-body-1 font-weight-medium">{{ resume.phone }}</span>
                            </div>
                        </v-row>
                    </div>
                </v-col>
                <v-divider thickness="2" class="mx-4" />
                <!-- LinkedIn Button -->
                <v-col cols="12" class="  ay-2 d-flex justify-space-between ">

                    <div>
                        <v-btn prepend-icon="mdi-pencil-outline" variant="tonal" color="primary"
                               class=" ma-1 linkedin-button">
                            Edit
                        </v-btn>
                        <v-btn prepend-icon="mdi-delete" variant="tonal" @click="delete_dialog = true " color="error"
                               class=" ma-1 linkedin-button">
                            Delete
                        </v-btn>
                        <v-btn prepend-icon="mdi-eye" variant="tonal" color="success" class=" ma-1 linkedin-button">
                            View
                        </v-btn>
                        <v-btn variant="tonal" prepend-icon="mdi-cloud-download" color="accent"
                               class=" ma-1 linkedin-button">
                            Download
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

            <!-- Action Buttons -->
            <v-tabs
                v-model="tab"
                color="primary"
            >

                <v-tab :value="2">
                    <v-icon class="mr-1">mdi-school-outline</v-icon>
                    Education
                </v-tab>
                <v-tab :value="3">
                    <v-icon class="mr-1">mdi-briefcase-outline</v-icon>
                    Experience
                </v-tab>
                <v-tab :value="4">
                    <v-icon class="mr-1" left>mdi-brain</v-icon>
                    Skills
                </v-tab>
                <v-tab :value="5">
                    <v-icon class="mr-1 " left>mdi-translate</v-icon>
                    Languages
                </v-tab>
            </v-tabs>

            <v-window continuous v-model="tab" v-if="resume">
                <v-window-item :value="1">

                    <!--                    &lt;!&ndash;                overview&ndash;&gt;-->
                    <!--                    <ResumeOverview :languages="resume.languages?.length || 0"-->
                    <!--                                    :formations="resume.educations?.length || 0"-->
                    <!--                                    :skills="resume.skills?.length || 0"-->
                    <!--                                    :experiences="resume.work?.length || 0"-->
                    <!--                                    :years-of-experience="resume.yoe || ''"-->
                    />
                </v-window-item>
                <v-window-item :value="2">
                    <!--                education-->
                    <ResumeEducationCard :educations="resume.educations || []" />
                </v-window-item>
                <v-window-item :value="3">
                    <!--                     Experience-->
                    <ResumeExperienceCard :work="resume.work || []" />
                </v-window-item>
                <v-window-item :value="4">
                    <!--                     Skills-->
                    <ResumeSkillsCard :skills="resume?.skills || []" />
                </v-window-item>
                <v-window-item :value="5">
                    <!--                     Languages-->
                    <ResumeLanguageCard :languages="resume.languages || []" />
                </v-window-item>
            </v-window>
        </div>
    </v-card>
    <!--    Confirm Delete resume-->
    <CustomConfirmationDialog

        :dialog="delete_dialog"
        title="Confirm Deletion"
        text="This action will permanently delete your CV. Are you sure you want to proceed?"
        confirm-text-button="Delete CV"
        cancel-text-button="Keep CV"
        @accept="deleteCvData"
        @reject="closeDeleteCVDialog"
    />

</template>

<style>
.profile-card {
    padding: 16px;
}

.linkedin-button {
    white-space: nowrap;
}

.text-grey {
    color: #6c757d;
}
</style>
