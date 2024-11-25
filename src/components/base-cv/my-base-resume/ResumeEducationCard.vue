<template>
    <v-card class="education-card" elevation="0">
        <h3 class="text-h6 font-weight-bold mb-4">All Educational programs</h3>
        <v-divider />
        <v-list v-if="educations">
            <v-list-item v-for="(education,index) in educations" :key="index">

                <v-list-item-title>
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">{{ education.institution }}</h4>
                    <div class="text-body-1 text-grey">{{ education.degree }}</div>
                    <div class="text-body-2 text-grey">{{ education.start_year || '' }} - {{ education.end_year || ''
                        }}
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <v-row v-else>
            <v-col class="justify-center d-flex ma-2">
                No Educational programs found
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">

import type { Education } from '@/types/resume';

defineProps<{
    educations: Education[]
}>();
</script>

<style>
.education-card {
    padding: 16px;
}

.text-grey {
    color: #6c757d;
}
</style>
