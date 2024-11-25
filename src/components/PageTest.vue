<template>
    <div>
        <PageHeader title="Job Hub"
                    subtitle="Your job hub is where you can manage all your application kits and track job applications.">

        </PageHeader>
    </div>
    <!--    <ResumeGallery />-->
    <!--    {{ $vuetify.theme.name }}-->
    {{ theme.global.current.value.dark }}

    <!--    <div class="">-->
    <v-btn
        icon
        variant="plain"
        @click="()=> {
                useCustomizerStore().actTheme = useCustomizerStore().actTheme === 'GREEN_THEME' ? 'DARK_GREEN_THEME':'GREEN_THEME'
            }"
    >
        <v-icon :color="(useCustomizerStore().actTheme === 'GREEN_THEME') ? 'primary' : 'secondary'">
            {{ (useCustomizerStore().actTheme === 'DARK_GREEN_THEME') ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
        </v-icon>
    </v-btn>
    <!--    </div>-->
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue';
import { ref } from 'vue';
import ImportOptionsView from '@/views/base-cv/ImportOptionsView.vue';
import ResumeGallery from '@/components/base-cv/ResumeGallery.vue';
import { useTheme } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';

const theme = useTheme();
const loading = ref(false);
const dialog = ref(false);
// Outputs `true` if the theme is dark

</script>

<style scoped>
/* Add any necessary custom styling here */
</style>
