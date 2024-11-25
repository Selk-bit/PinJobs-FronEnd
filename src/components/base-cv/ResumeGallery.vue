<template>
    <div>
        <v-row>
            <!-- Header -->
            <v-col cols="12" class=" d-flex justify-space-between align-center mb-4 ">
                <h2 class="text-h5 font-weight-bold mt-2 ml-3">Sample Resume</h2>
                <v-btn variant="text" size="small" class="text-body-1">
                    See All
                    <v-icon   class="ml-2">mdi-arrow-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <!-- Horizontal Scrollable Carousel -->
        <v-slide-group show-arrows  class="">
            <!-- Create Blank Resume -->
            <v-slide-group-item>
                <v-card
                    color="lightWhite"
                    @click="generateFromScratch"
                    elevation="0"
                    class="ma-3 d-flex flex-column align-center justify-center cursor-pointer create-resume-card "
                >
                    <v-icon size="48" class="text-primary">mdi-plus</v-icon>
                    <div class="mt-2 text-center font-weight-medium text-body-1">
                        Create Blank Resume
                    </div>
                </v-card>
            </v-slide-group-item>

            <!-- Resume Cards -->
            <v-slide-group-item

                v-for="resume in sample_resumes"
                :key="resume.id"

            >
                <GalleryCard
                    :title="resume.title"
                    :image="resume.image"
                    :key="resume.title"
                    :usage-count="resume.usage_count"
                    @select-model="loadSelectedModel"
                >

                </GalleryCard>
            </v-slide-group-item>
        </v-slide-group>
    </div>
    <AppLoader :loading="loading" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppLoader from '@/components/shared/AppLoader.vue';

const loading = ref(false);
import { useRouter } from 'vue-router';
import { getPrimary } from '@/utils/UpdateColors';
import GalleryCard from '@/components/base-cv/resume-gallery/GalleryCard.vue';


const router = useRouter();

 function generateFromScratch() {
    // app_loading.value = true;
    loading.value = true;
     router.push("/cv-editor");
}

function loadSelectedModel() {
    alert('selected model');
}

const sample_resumes = ref([
    {
        id: 1,
        image: 'https://via.placeholder.com/200x300',
        title: 'Investment Banking Model',
        usage_count: '3,752'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/200x300',
        title: 'Graphic Design Portfolio',
        usage_count: '2,435'
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/200x300',
        title: 'Engineering Resume',
        usage_count: '1,899'
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/200x300',
        title: 'Marketing Template',
        usage_count: '3,120'
    }
]);
</script>

<style>

.create-resume-card {
    text-align: center;
    border-style: dashed;
    height: 400px;
    width: 290px;
    transition: transform 0.3s, box-shadow 0.3s;
}



</style>
