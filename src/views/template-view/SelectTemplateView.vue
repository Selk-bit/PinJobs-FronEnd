<template>
    <v-container class="py-12">
        <v-row justify="center">

            <v-col cols="12" md="6">
                <div class="text-center inter mb-8">
                    <h2 class="font-weight-light">Select a template</h2>
                </div>

                <div class="text-center d-flex align-center mx-auto mb-8" style="max-width: 300px">
                    <v-select
                        color="primary"
                        v-model="selectedProfession"
                        :items="professions"
                        variant="underlined"
                    ></v-select>
                    <Soon />
                </div>

            </v-col>
        </v-row>


        <v-row justify="center" align="center" class="mb-12">
            <v-col cols="12" md="10">
                <v-row>
                    <!-- Each Template Card -->
                    <v-col v-for="(template, index) in templates" :key="index" cols="12" sm="6" md="3">
                        <GalleryCard :title="template.name" is-template :image="os" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import GalleryCard from '@/components/base-cv/resume-gallery/GalleryCard.vue';
import os from '/public/assets/images/templates/os.jpg';
import { ref } from 'vue';
import Soon from '@/components/Soon.vue';


// Dropdown professions
const professions = [
    'Show all templates',
    'Accounting / Finance',
    'Administration',
    'Art / Design',
    'Automotive',
    'Banking',
    'Bartending',
    'Business'
];

const selectedProfession = ref('Show all templates');


const templates = [
    {
        name: 'Smart',
        image: 'path_to_image/smart.jpg'
    },
    {
        name: 'Classy',
        image: 'path_to_image/classy.jpg'
    },
    {
        name: 'Sharp',
        image: 'path_to_image/sharp.jpg'
    },
    {
        name: 'Bubbles',
        image: 'path_to_image/bubbles.jpg'
    },
    {
        name: 'Ladder',
        image: 'path_to_image/ladder.jpg'
    },
    {
        name: 'White',
        image: 'path_to_image/white.jpg'
    },
    {
        name: 'iMessage',
        image: 'path_to_image/imessage.jpg'
    },
    {
        name: 'Puddle',
        image: 'path_to_image/puddle.jpg'
    }
];
</script>

<style scoped>
.template-card {
    transition: transform 0.3s;
}

.template-card:hover {
    transform: scale(1.05);
}
</style>
