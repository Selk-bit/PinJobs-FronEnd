<script setup lang="ts">

import type { Job } from '@/types/job';
import { ref } from 'vue';

const props = defineProps<{
    job: Job;
}>();


const isSmallScreen = ref(window.innerWidth < 1200);
const formatDescription = (description: string) => description.replace(/●/g, '<br>●');

const limitDescription = (description: string) => {
    const maxLength = isSmallScreen.value ? 40 : 80;
    const cleanDescription = description.replace(/(<br>|<br\/>)/g, ' ');
    return cleanDescription.length > maxLength
        ? cleanDescription.substring(0, maxLength) + '...'
        : cleanDescription;
};
</script>

<template>
    <div>
        <v-card


            class="job-list-card "

            outlined
        >
            <v-row class="job-card-content">
                <v-col cols="9">
                    <h4 class="job-title">{{ job.title }}</h4>
                    <p class="job-company">
                        <strong>{{ job.company_name }} - {{ job.location }}</strong>
                    </p>
                    <p class="job-description-preview"
                       v-html="limitDescription(formatDescription(job.description))"></p>
                </v-col>
                <v-col cols="3" class="top-right ">
                    <!--                    <v-img :src="getJobIcon(job.original_url)" class="company-icon" />-->
                    <v-icon size="40" color="info">mdi-linkedin</v-icon>
                </v-col>
            </v-row>

            <!-- Similarity Score Bar -->
            <div class="similarity-bar-wrapper">
<!--                <div class="similarity-bar" :style="{ width: job.job_search?.similarity_score + '%' }"></div>-->
                <p class="similarity-score-text">{{ // job.job_search?.similarity_score }}%</p>
            </div>

            <!-- Applied Status Icon -->
            <v-row class="job-card-bottom">
                <v-col>
                    <p class="posted-date">{{ job.posted_date || '30d+' }}</p>
                </v-col>
                <v-col>
<!--                    <v-tooltip bottom v-if="job?.job_search?.status === 'applied'">-->
<!--                        <template v-slot:activator="{ on, attrs }">-->
<!--                            <v-icon small color="green" class="applied-check" v-bind="attrs" v-on="on">-->
<!--                                mdi-check-circle-->
<!--                            </v-icon>-->
<!--                        </template>-->
<!--                        <span>Applied</span>-->
<!--                    </v-tooltip>-->
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<style scoped lang="scss">
.job-list-card {
    margin-bottom: 12px;
    padding: 16px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.top-right {
    display: flex;
    justify-content: flex-end;
}

.similarity-bar-wrapper {
    position: relative;
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 3px;
    margin-top: 10px;
}

.similarity-bar {
    height: 100%;
    background-color: #4caf50;
    border-radius: 3px;
}

.similarity-score-text {
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 0.8rem;
    color: #999;
}
</style>