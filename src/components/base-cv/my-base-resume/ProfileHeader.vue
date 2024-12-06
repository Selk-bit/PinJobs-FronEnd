<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ResumeOverview from '@/components/base-cv/my-base-resume/ResumeOverview.vue';
import ResumeEducationCard from '@/components/base-cv/my-base-resume/ResumeEducationCard.vue';
import ResumeExperienceCard from '@/components/base-cv/my-base-resume/ResumeExperienceCard.vue';
import ResumeSkillsCard from '@/components/base-cv/my-base-resume/ResumeSkillsCard.vue';
import ResumeLanguageCard from '@/components/base-cv/my-base-resume/ResumeLanguageCard.vue';
import { useBaseCvStore } from '@/stores/base-cv';
import { storeToRefs } from 'pinia';
import CustomConfirmationDialog from '@/components/shared/CustomConfirmationDialog.vue';
import AppLoader from '@/components/shared/AppLoader.vue';
import { toast } from 'vue-sonner';
import type { Resume } from '@/types/resume';

const tab = ref(1);
const baseStore = useBaseCvStore();
const { resumeData } = storeToRefs(baseStore);
const { name, email, phone, yoe, headline, city } = resumeData.value;
const delete_dialog = ref(false);
const loading = ref(false);
const changeTab = (tabNumber: number) => {
    tab.value = tabNumber;
};
const closeDeleteCVDialog = () => {
    delete_dialog.value = false;
};


async function deleteCvData() {
    try {
        loading.value = true;
        await baseStore.deleteCV();
        toast.success('Data deleted successfully');
        delete_dialog.value = false;
        await baseStore.getCVData();
    } catch (err: any) {
        console.log('Error occured ', err);
    } finally {
        loading.value = false;
    }


}

onMounted(async () => {
    await baseStore.getCVData();
});
</script>

<template>
    <v-card class="profile-card " elevation="0">
        <v-row class="align-center">
            <!-- Profile Picture and Info -->
            <v-col cols="12 " class=" d-flex justify-space-between flex-wrap align-center">


                <div>
                    <h3 class="text-h3 font-weight-bold mb-1">{{ name || '' }}</h3>
                    <div class="text-body-1 text-grey">
                        {{ city || '' }} | {{ headline || '' }}
                    </div>
                    <div v-if="yoe">
                        {{ yoe || 0 }} Years of experience
                    </div>
                </div>
                <div class="contact-card mb-4">
                    <v-row class="align-start justify-start flex-column   ">
                        <!-- Email -->
                        <div class="d-flex align-center">
                            <v-icon left color="primary">mdi-at</v-icon>
                            <span class="text-body-1 font-weight-medium">{{ email || '' }}</span>
                        </div>
                        <!-- Phone Number -->
                        <div class="d-flex align-center">
                            <v-icon left color="primary">mdi-phone</v-icon>
                            <span class="text-body-1 font-weight-medium">{{ phone || '' }}</span>
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

        <v-window continuous v-model="tab" class="">
            <v-window-item :value="1">

                <!--                overview-->
                <ResumeOverview :languages="resumeData.languages?.length || 0"
                                :formations="resumeData.educations?.length || 0"
                                :skills="resumeData.skills?.length || 0"
                                :experiences="resumeData.work?.length || 0"
                                :years-of-experience="resumeData.yoe || ''"
                />
            </v-window-item>
            <v-window-item :value="2">
                <!--                education-->
                <ResumeEducationCard :educations="baseStore.resumeData.educations || []" />
            </v-window-item>
            <v-window-item :value="3">
                <!--                     Experience-->
                <ResumeExperienceCard :work="baseStore.resumeData.work || []" />
            </v-window-item>
            <v-window-item :value="4">
                <!--                     Skills-->
                <ResumeSkillsCard :skills="baseStore.resumeData?.skills || []" />
            </v-window-item>
            <v-window-item :value="5">
                <!--                     Languages-->
                <ResumeLanguageCard :languages="resumeData.languages || []" />
            </v-window-item>
        </v-window>
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
    <app-loader :loading="loading" />
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
