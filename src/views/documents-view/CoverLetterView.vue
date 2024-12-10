<script setup lang="ts">
import { useRouter } from 'vue-router';
import GalleryCard from '@/components/base-cv/resume-gallery/GalleryCard.vue';
import sydney from '/public/assets/images/templates/sydney.jpg';
import os from '/public/assets/images/templates/os.jpg';
import onyx from '/public/assets/images/templates/onyx.jpg';
import pikachu from '/public/assets/images/templates/pikachu.jpg';
import OptionsCard from '@/components/base-cv/resume-gallery/OptionsCard.vue';
import { ref } from 'vue';
import OptionItem from '@/components/base-cv/resume-gallery/OptionItem.vue';


const router = useRouter();
const loading = ref(false);



function loadSelectedModel() {
    alert('selected model');
}

const sample_cover_letters = ref([
    {
        id: 1,
        image: "https://www.resumenerd.com/wp-content/uploads/2022/08/Graphic-Designer-Cover-Letter-Example-RNerd.png", // Placeholder image for testing
        title: "Investment Banking Model",
        usage_count: "3,752",
    },
    {
        id: 2,
        image: "https://cdn.enhancv.com/images/544/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9TQkFLV2lwTGdBT3BiMWMyQXhVVGFXbm1xRElwOWJSQ2RkZUxHSTdaL2ltYWdlLnBuZw~~.png", // Placeholder image for testing
        title: "Graphic Design Portfolio",
        usage_count: "2,435",
    },
    {
        id: 3,
        image: "https://marketplace.canva.com/EAFhHrjw0Qk/1/0/283w/canva-black-and-white-simple-classic-professional-cover-letter-j6kOreUCI6Q.jpg", // Placeholder image for testing
        title: "Engineering Resume",
        usage_count: "1,899",
    },
    {
        id: 4,
        image: "https://s3.resume.io/uploads/examples/cover_letter/resume_pages/5149/persistent-resource/retail-cover-letter-examples.jpg", // Placeholder image for testing
        title: "Marketing Template",
        usage_count: "3,120",
    },
]);



const option_items = [
    {
        icon: 'mdi-plus',
        title: 'New Cover Letter',
    },
       {
        icon: 'mdi-robot',
        title: 'New Cover letter with AI'
    },
    // {
    //     icon: 'mdi-file-document-outline',
    //     title: 'New Resume with Job Description'
    // }
];

</script>

<template>
    <div>
        <v-row dense class="mx-auto " style="max-width: 1400px;">
            <!-- Create Blank Resume Card -->
            <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"

            >
                <OptionsCard>
                        <option-item :title="item.title" :icon="item.icon" v-for="item  in option_items" />
                </OptionsCard>
            </v-col>

            <!-- Resume Cards -->
            <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="cover_letter in sample_cover_letters"
                :key="cover_letter.id"
            >
                <GalleryCard
                    :title="cover_letter.title"
                    :image="cover_letter.image"
                    is-template
                    :usage-count="cover_letter.usage_count"
                    @select-model="loadSelectedModel"
                />
            </v-col>
        </v-row>
    </div>
</template>

<style scoped lang="scss">

</style>