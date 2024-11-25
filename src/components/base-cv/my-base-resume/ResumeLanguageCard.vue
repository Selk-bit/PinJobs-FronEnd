<template>
    <v-card class="languages-card pa-3" elevation="0">
        <h3 class="text-h6 font-weight-bold mb-4">All Languages</h3>
        <v-divider />
        <v-row class="mt-4" v-if="languages?.length">
            <v-col v-for="(language,index) in languages" :key="index" cols="3">
                <v-card elevation="0" variant="tonal" outlined class="language-card text-center">

                    <h4 class="text-subtitle-2">{{ language.language }}</h4>
                    <div class="text-body-2 text-grey">{{ language.level }}</div>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col class="justify-center d-flex ma-2">
              No languages found
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
import type { Language } from '@/types/resume';

defineProps<{
    languages: Language[]
}>();
</script>

<style>
.language-card {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.text-grey {
    color: #6c757d;
}
</style>
