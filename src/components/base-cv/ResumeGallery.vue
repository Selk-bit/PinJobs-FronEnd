<template>
    <div>


        <!-- Responsive Resume Cards -->

        <v-card class="pa-5 mt-10" elevation="0">
            <v-row style="max-width: 1300px;" class=" mx-auto ">
                <!-- Create Blank Resume Card -->
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    class="d-flex justify-center"
                >
                    <OptionsCard />
                </v-col>

                <!-- Resume Cards -->
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="resume in sample_resumes"
                    :key="resume.id"
                >
                    <GalleryCard
                        :title="resume.title"
                        :image="resume.image"
                        is-resume
                        :usage-count="resume.usage_count"
                        @select-model="loadSelectedModel"
                    />
                </v-col>
            </v-row>
        </v-card>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import GalleryCard from '@/components/base-cv/resume-gallery/GalleryCard.vue';
import sydney from '/public/assets/images/templates/sydney.jpg';
import os from '/public/assets/images/templates/os.jpg';
import onyx from '/public/assets/images/templates/onyx.jpg';
import pikachu from '/public/assets/images/templates/pikachu.jpg';
import OptionsCard from '@/components/base-cv/resume-gallery/OptionsCard.vue';

const router = useRouter();
const loading = ref(false);

function generateFromScratch() {

    router.push('/cv-editor');
}

function loadSelectedModel() {
    alert('selected model');
}

const sample_resumes = ref([
    {
        id: 1,
        image: pikachu,
        title: 'Investment Banking Model',
        usage_count: '3,752'
    },
    {
        id: 2,
        image: sydney,
        title: 'Graphic Design Portfolio',
        usage_count: '2,435'
    },
    {
        id: 3,
        image: os,
        title: 'Engineering Resume',
        usage_count: '1,899'
    },
    {
        id: 4,
        image: onyx,
        title: 'Marketing Template',
        usage_count: '3,120'
    }
]);
</script>

<style>



</style>
