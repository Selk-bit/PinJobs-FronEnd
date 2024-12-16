<template>
    <div  class="py-12">

        <v-row justify="center">
            <v-col cols="12" md="6">
                <div class="text-center inter mb-8">
                    <h2 class="font-weight-light">
                        <v-btn class="mr-1" @click="$router.go(-1)" icon="mdi-arrow-left">
                        </v-btn>
                        Select a template
                    </h2>
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


        <v-row justify="center" align="center" class="mb-12" >
            <v-col cols="12" md="10">
                <v-row>
                    <v-col>
                        <div v-if="loading" style="min-height: 580px" class="d-flex align-center justify-center">
                            <LoadingFlash :size="60" text="Loading Profile..." />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <!-- Each Template Card -->
                    <v-col v-for="(template, index) in templateStore.abstractTemplates"
                           class=" d-flex justify-center "
                           :key="index"
                           cols="12"
                           sm="6"
                           md="4"
                           lg="3"
                    >
                        <GalleryCard
                            @click="loadLayout(template.name)"
                                     :title="template.name" is-template
                                     :image="baseUrl + template.image" />
                    </v-col>
                </v-row>

            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import GalleryCard from '@/components/base-cv/resume-gallery/GalleryCard.vue';
import { onMounted, ref } from 'vue';
import { useResumeStore } from '@/stores/resume';
import { useRouter } from 'vue-router';
import Soon from '@/components/Soon.vue';
import { useAbstractTemplates } from '@/stores/abstract-template';
import LoadingFlash from '@/components/shared/LoadingFlash.vue';


const router = useRouter();
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
const templateStore = useAbstractTemplates();
const resumeStore = useResumeStore();
const loading = ref<boolean>(false);
const selectedProfession = ref('Show all templates');

const baseUrl = ref(import.meta.env.VITE_API_URL_MEDIA);

// functions
async function loadLayout(layout: string) {
    resumeStore.selectLayout(layout);
    await router.push({ name: 'cv-editor'});
}

async function loadTemplates() {
    try {
        loading.value = true;
        await templateStore.GET_ABSTRACT_TEMPLATES();
        loading.value = false;

    } catch (err) {
        throw err;
    }
}

onMounted(async () => {
    await loadTemplates();
});
</script>

<style scoped>

</style>
