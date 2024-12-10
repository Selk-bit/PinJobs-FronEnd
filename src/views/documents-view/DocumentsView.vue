<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import GeneratedResumeView from '@/views/documents-view/GeneratedResumeView.vue';
import CoverLetterView from '@/views/documents-view/CoverLetterView.vue';
import ResignationLetterView from '@/views/documents-view/ResignationLetterView.vue';

const { t } = useI18n();
const tab = ref(1);

</script>

<template>
    <!--        header-->
    <PageHeader title="Resume Data Hub"
                subtitle="Seamlessly manage, update, and showcase your resume data with ease.">

        <template v-slot:tabs>
            <v-tabs
                v-model="tab"
                class="mt-3"
                style="border-bottom: 1px solid grey;"
                align-tabs="start"
                density="compact"
            >
                <div>
                    <v-tab :value="1">
                        generated resumes
                    </v-tab>
                    <v-tab :value="2">
                        cover letters
                    </v-tab>
                    <v-tab :value="3">
                        resignation letters
                    </v-tab>
                </div>
            </v-tabs>
        </template>
    </PageHeader>

    <v-card class="pa-5 mt-10" elevation="0" variant="text">
        <v-window v-model="tab">
            <v-window-item
                :value="1"
            >
                <GeneratedResumeView />
            </v-window-item>
            <v-window-item
                :value="2"
            >
                <CoverLetterView />
            </v-window-item>
            <v-window-item
                :value="3"
            >
                <ResignationLetterView />
            </v-window-item>
        </v-window>
    </v-card>

</template>

<style scoped lang="scss">

</style>