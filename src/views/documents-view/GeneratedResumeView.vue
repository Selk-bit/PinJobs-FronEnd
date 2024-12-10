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


const option_items = [
    {
        icon: 'mdi-plus',
        title: 'New Base Resume'
    },
    {
        icon: 'mdi-linkedin',
        title: 'Import from LinkedIn'
    },
    {
        icon: 'mdi-creation',
        title: 'New Resume with Job URL'
    },
    //
    // {
    //     icon: 'mdi-file-document-outline',
    //     title: 'New Resume with Job Description'
    // }
];

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
                    <option-item :title="item.title" :icon="item.icon" v-for="item  in option_items" />
                </OptionsCard>
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
    </div>
</template>

<style scoped lang="scss">

</style>