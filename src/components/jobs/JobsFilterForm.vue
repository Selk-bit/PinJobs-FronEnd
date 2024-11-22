<template>

</template>
<!--<script setup lang="ts">-->
<!--import { onUnmounted, reactive, ref, watch } from 'vue';-->
<!--import { toast } from 'vue-sonner';-->


<!--const dialog = ref(false);-->
<!--const loading = ref(false);-->

<!--const filters = reactive({-->
<!--    search: '',-->
<!--    sort_by: 'similarity_score',-->
<!--    company_name: '',-->
<!--    location: '',-->
<!--    employment_type: '',-->
<!--    job_type: '',-->
<!--    posted_date_range_after: '',-->
<!--    posted_date_range_before: '',-->
<!--    salary_min: '',-->
<!--    salary_max: ''-->
<!--});-->


<!--const sortOptions = [-->
<!--    { title: 'Score', value: 'similarity_score' },-->
<!--    { title: 'Posted Date', value: 'posted_date' }-->
<!--];-->

<!--const employmentTypeOptions = [-->
<!--    { title: 'Remote', value: 'remote' },-->
<!--    { title: 'Hybrid', value: 'hybrid' },-->
<!--    { title: 'On-site', value: 'on-site' }-->
<!--];-->


<!--const jobTypeOptions = [-->
<!--    { title: 'Full-time', value: 'full-time' },-->
<!--    { title: 'Part-time', value: 'part-time' },-->
<!--    { title: 'Contract', value: 'contract' },-->
<!--    { title: 'Freelance', value: 'freelance' },-->
<!--    { title: 'CDD', value: 'CDD' },-->
<!--    { title: 'CDI', value: 'CDI' },-->
<!--    { title: 'Other', value: 'other' }-->
<!--];-->

<!--const dateMenu = ref(false);-->
<!--const endDateMenu = ref(false);-->
<!--const startDateTop = ref(0);-->
<!--const startDateLeft = ref(0);-->
<!--const endDateTop = ref(0);-->
<!--const endDateLeft = ref(0);-->
<!--const clearErrors = () => {-->
<!--    clearErrors();-->
<!--};-->

<!--const sanitizeFilters = (filters) => {-->
<!--    const sanitizedFilters = {};-->
<!--    Object.keys(filters).forEach((key) => {-->
<!--        sanitizedFilters[key] = (filters[key] === null || filters[key] === 'null') ? '' : filters[key];-->
<!--    });-->
<!--    return sanitizedFilters;-->
<!--};-->

<!--const applyFilters = async () => {-->
<!--    loading.value = true;-->
<!--    selectedJob.value = null;-->
<!--    currentPage.value = 1;-->
<!--    const sanitizedFilters = sanitizeFilters(filters);-->
<!--    const data = await jobStore.GET_JOBS(sanitizedFilters, currentPage.value);-->
<!--    jobs.value = data.results;-->
<!--    pagination.next = data.next;-->
<!--    pagination.previous = data.previous;-->
<!--    loading.value = false;-->
<!--    if (!isSmallScreen.value && jobs.value.length) {-->
<!--        selectJob(jobs.value[0]);-->
<!--    }-->
<!--};-->
<!--const validate = () => {-->
<!--    let valid = true;-->
<!--    return valid;-->
<!--};-->

<!--async function executeJobSearch() {-->

<!--    if (!validate()) {-->
<!--        return;-->
<!--    }-->


<!--}-->


<!--</script>-->

<!--<template>-->
<!--    <div>-->
<!--        <v-btn-->
<!--            @click="dialog=true"-->
<!--            color="primary"-->
<!--            variant="outlined"-->
<!--        >-->
<!--            <v-icon class="mr-1">mdi-briefcase-search</v-icon>-->
<!--            Search jobs-->
<!--        </v-btn>-->
<!--        <v-dialog-->
<!--            persistent-->
<!--            width="1000"-->
<!--            min-width="800"-->
<!--            v-model="dialog"-->
<!--            class="backdrop">-->
<!--            <v-form @submit.prevent="executeJobSearch">-->
<!--                <v-container>-->
<!--                    <v-card class="pa-4">-->
<!--                        <v-card-title class="d-flex align-center justify-space-between">-->
<!--                            <div>Job search Execution</div>-->
<!--                            <div>-->
<!--                                <v-btn-->
<!--                                    class="float-right"-->
<!--                                    icon="mdi-close"-->
<!--                                    variant="plain"-->
<!--                                    @click="dialog = false"-->
<!--                                >-->
<!--                                </v-btn>-->
<!--                            </div>-->
<!--                        </v-card-title>-->
<!--                        <v-card-text>-->
<!--                          -->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-container>-->
<!--            </v-form>-->
<!--        </v-dialog>-->
<!--    </div>-->

<!--</template>-->

<!--<style scoped lang="scss">-->

<!--</style>-->