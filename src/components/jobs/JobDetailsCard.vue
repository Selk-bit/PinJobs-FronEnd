<script setup lang="ts">
import type { Job } from '@/types/job';
import { ref } from 'vue';

const props = defineProps<{
    job: Job;
}>();
const showDropdown = ref(false);
const showMarkAsAppliedDialog = ref(false);
const dropdownTop = ref(0);
const dropdownLeft = ref(0);
const showDeleteJobDialog = ref(false);
const formatDescription = (description:string) => description.replace(/●/g, '<br>●');



const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};
const positionDropdown = (event:any) => {
    const button = event.target;
    dropdownTop.value = button.offsetTop + button.offsetHeight;
    dropdownLeft.value = button.offsetLeft;
};


const openDeleteJobDialog = () => {
    showDeleteJobDialog.value = true;
};

const openMarkAsAppliedDialog = () => {
    showMarkAsAppliedDialog.value = true;
};
</script>

<template>
    <div>
        <v-card outlined class="sticky-card">
            <v-row>
                <v-col cols="9">
                    <div style="display: inline-flex; align-items: center;">
                        <h2 >{{ job.title }}</h2>
                        <v-icon
                            @click="toggleDropdown"
                            @click.stop="positionDropdown($event)"
                            class="dropdown-options"
                            style="margin-left: 10px; cursor: pointer; margin-bottom: 15px;"
                        >
                            mdi-dots-vertical
                        </v-icon>
                        <div
                            v-if="showDropdown"
                            :style="{ top: dropdownTop + 'px', left: dropdownLeft + 'px' }"
                            class="dropdown-menu"
                        >
                            <ul class="dropdown-list">
                                <li v-if="job.job_search.status !== 'applied'" class="dropdown-item"
                                    @click="openMarkAsAppliedDialog">
                                    Mark as Applied
                                </li>
                                <li class="dropdown-item" @click="openDeleteJobDialog">
                                    Delete
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p class="job-company">
                        <strong>{{ job.company_name }} - {{ job.location }}</strong>
                    </p>
                </v-col>
                <v-col cols="3" class="apply-now-col">
                    <v-btn
                        :href="job.original_url"
                        target="_blank"
                        color="primary"
                        class="apply-now-button"
                    >
                        Apply
                    </v-btn>
                    <div class="similarity-score-container">
<!--                        <div class="similarity-bar-detailed"-->
<!--                             :style="{ width: job.job_search.similarity_score + '%' }"></div>-->
<!--                        <p class="similarity-score-detailed-text">{{ job.job_search.similarity_score-->
<!--                            }}%</p>-->
<!--                        <v-tooltip bottom v-if="job.job_search.status === 'applied'">-->
<!--                            <template v-slot:activator="{ on, attrs }">-->
<!--                                <v-icon small color="green" class="applied-check-details" v-bind="attrs"-->
<!--                                        v-on="on">-->
<!--                                    mdi-check-circle-->
<!--                                </v-icon>-->
<!--                            </template>-->
<!--                            <span>Applied</span>-->
<!--                        </v-tooltip>-->
                    </div>
                </v-col>
            </v-row>

            <div class="job-description" v-html="formatDescription(job.description)"></div>
            <div v-if="job.requirements && job.requirements.length">
                <h5>Requirements:</h5>
                <ul class="requirements-list">
                    <li v-for="(requirement, index) in job.requirements" :key="index">
                        {{ requirement }}
                    </li>
                </ul>
            </div>

            <div v-if="job.benefits && job.benefits.length">
                <h5>Benefits:</h5>
                <ul class="benefits-list">
                    <li v-for="(benefit, index) in job.benefits" :key="index">
                        {{ benefit }}
                    </li>
                </ul>
            </div>

            <div v-if="job.skills_required && job.skills_required.length">
                <h5>Skills:</h5>
                <v-chip-group class="skills-tags" column>
                    <v-chip v-for="(skill, index) in job.skills_required" :key="index" color="primary">
                        {{ skill }}
                    </v-chip>
                </v-chip-group>
            </div>
        </v-card>
    </div>
</template>

<style scoped lang="scss">
.job-details {
    position: relative;
}

.sticky-card {
    position: sticky;
    top: 50px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}




.job-company {
    font-size: 1.25rem;
    //color: #777;
}

.job-description-preview {
    font-size: 1rem;
    color: #999;
}



.job-description {
    margin-top: 16px;
    line-height: 1.5;
    font-size: 1.1rem;
}
.job-page {
    padding: 20px;
}

.small-screen-padding {
    padding: 5px;
}


.job-list-card {
    margin-bottom: 12px;
    padding: 16px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.job-card-content {
    padding: 8px;
}



.company-icon {
    width: 32px;
    height: 32px;
}



.posted-date {
    font-size: 0.8rem;
    color: #999;
    margin-top: 10px;
    padding: 8px;
}

.load-more-btn {
    margin-top: 20px;
    margin-bottom: 40px;
    width: 100%;
}

.job-details {
    position: relative;
}

.sticky-card {
    position: sticky;
    top: 50px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.apply-now-button {
    padding: 0px 24px;
    font-size: 1rem;
    font-weight: bold;
    width: 100%;
}

.similarity-score-container {
    margin-top: 12px;
}

.similarity-bar-detailed {
    height: 6px;
    background-color: #4caf50;
    border-radius: 3px;
}

.similarity-score-detailed-text {
    font-size: 0.8rem;
    margin-top: 4px;
}

.job-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 12px;
}

.job-company {
    font-size: 1.25rem;
    color: #777;
}

.job-description-preview {
    font-size: 1rem;
    color: #999;
}

.requirements-list, .benefits-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.requirements-list li, .benefits-list li {
    margin: 0;
    padding: 5px 0;
}

.skills-tags {
    margin-top: 12px;
}

.job-description {
    margin-top: 16px;
    line-height: 1.5;
    font-size: 1.1rem;
}

.v-dialog .v-overlay__content > .v-card > .v-card-text {
    padding-bottom: 100px !important;
}

h5 {
    font-size: 1.25rem;
    margin-top: 20px;
    font-weight: bold;
}

.v-responsive {
    flex: 0 0 auto;
}

.applied-check,
.applied-check-details {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 25px;
}

.scroll-to-top-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.dropdown-menu {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 100;
    padding: 10px;
    min-width: 150px;
}

.dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}


.fixed-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.apply-now-full-width {
    width: 100%;
}

.action-buttons-row {
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
}

.mark-applied-btn {
    flex: 1;
    margin-right: 8px;
}

.delete-btn {
    flex: 1;
}

.toolbar-button--highlight {
    font-weight: bold;
    margin-right: 8px;
    padding: 5px 12px;
    transition: background-color 0.2s ease;
}

.toolbar-button--highlight:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.filter-apply-button {
    margin-top: 8px;
    margin-bottom: 20px;
    width: 100%;
}

.search-row {
    margin-bottom: 12px;
}

/* No results message styling */
.no-results-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #777;
}

.no-results-icon {
    font-size: 3rem;
    margin-bottom: 10px;
}

/* Fade-in animation for job-list cards */
.job-list-card {
    animation: fadeIn 0.2s ease-in-out;
}

.fade-in {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>