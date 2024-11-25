<template>
    <v-card class="experiences-card" elevation="0">
        <div class="d-flex justify-space-between align-center mb-4">
            <h3 class="text-h6 font-weight-bold">All Work Experiences</h3>
            <v-btn text color="primary">
                <v-icon left>mdi-pencil</v-icon>
                Edit
            </v-btn>
        </div>

        <v-divider />

        <v-list v-if="work">
            <v-list-item v-for="(experience,index) in work" :key="index">

                <v-list-item-title>
                    <div class="d-flex align-center">
                        <h4 class="text-subtitle-1 font-weight-bold mb-1">{{ experience.company_name }}</h4>
                        <v-chip variant="tonal" size="x-small" color="primary"  class="ml-2">{{ experience.city }}</v-chip>
                    </div>
                    <div class="text-body-1 text-grey">
                        {{ experience.job_title }} · {{ experience.start_date || '' }} - {{ experience.end_date || '' }}
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <v-row v-else>
            <v-col class="justify-center d-flex ma-2">
              No work experiences found
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import type { Work } from '@/types/resume';

defineProps<{
    work: Work[]
}>();

</script>

<style>
.experiences-card {
    padding: 16px;
}

.text-grey {
    color: #6c757d;
}
</style>
