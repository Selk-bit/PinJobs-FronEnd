<script setup >
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useJobStore } from '@/stores/job';
import { toast } from 'vue-sonner';
import CustomConfirmationDialog from '@/components/shared/CustomConfirmationDialog.vue';
import '@vuepic/vue-datepicker/dist/main.css';
import JobCard from '@/components/jobs/JobCard.vue';
import JobDetailsCard from '@/components/jobs/JobDetailsCard.vue';


const { t } = useI18n();
const jobStore = useJobStore();
const filter_dialog = ref(false);
const filters = reactive({
    search: '',
    sort_by: 'similarity_score',
    company_name: '',
    location: '',
    employment_type: '',
    job_type: '',
    posted_date_range_after: '',
    posted_date_range_before: '',
    salary_min: '',
    salary_max: ''
});

const sortOptions = [
    { title: 'Score', value: 'similarity_score' },
    { title: 'Posted Date', value: 'posted_date' }
];

const employmentTypeOptions = [
    { title: 'Remote', value: 'remote' },
    { title: 'Hybrid', value: 'hybrid' },
    { title: 'On-site', value: 'on-site' }
];

const jobTypeOptions = [
    { title: 'Full-time', value: 'full-time' },
    { title: 'Part-time', value: 'part-time' },
    { title: 'Contract', value: 'contract' },
    { title: 'Freelance', value: 'freelance' },
    { title: 'CDD', value: 'CDD' },
    { title: 'CDI', value: 'CDI' },
    { title: 'Other', value: 'other' }
];

const dateMenu = ref(false);
const endDateMenu = ref(false);
const startDateTop = ref(0);
const startDateLeft = ref(0);
const endDateTop = ref(0);
const endDateLeft = ref(0);

const openDatePicker = (event, picker )=> {
    const rect = event.currentTarget.getBoundingClientRect();
    if (picker === 'startDate') {
        startDateTop.value = rect.top + window.scrollY + rect.height;
        startDateLeft.value = rect.left + window.scrollX;
        dateMenu.value = true;
    } else if (picker === 'endDate') {
        endDateTop.value = rect.top + window.scrollY + rect.height;
        endDateLeft.value = rect.left + window.scrollX;
        endDateMenu.value = true;
    }
};

const jobs = ref([]);
const selectedJob = ref(null);
const showDropdown = ref(false);
const dropdownTop = ref(0);
const dropdownLeft = ref(0);
const showMarkAsAppliedDialog = ref(false);
const showDeleteJobDialog = ref(false);
const showModal = ref(false);
const currentPage = ref(1);
const fadeInDetails = ref(false);
const loading = ref(true);

const pagination = reactive({
    next: null,
    previous: null,
    count: 0
});

const isSmallScreen = ref(window.innerWidth < 1200);

const handleResize = () => {
    isSmallScreen.value = window.innerWidth < 1200;
};


const sanitizeFilters = (filters) => {
    const sanitizedFilters = {};
    Object.keys(filters).forEach((key) => {
        sanitizedFilters[key] = (filters[key] === null || filters[key] === 'null') ? '' : filters[key];
    });
    return sanitizedFilters;
};

const applyFilters = async () => {
    loading.value = true;
    selectedJob.value = null;
    currentPage.value = 1;
    const sanitizedFilters = sanitizeFilters(filters);
    const data = await jobStore.GET_JOBS(sanitizedFilters, currentPage.value);
    jobs.value = data.results;
    pagination.next = data.next;
    pagination.previous = data.previous;
    loading.value = false;
    if (!isSmallScreen.value && jobs.value.length) {
        selectJob(jobs.value[0]);
    }
};

const loadMoreJobs = async () => {
    if (pagination.next) {
        currentPage.value++;
        const data = await jobStore.GET_JOBS(filters, currentPage.value);
        jobs.value.push(...data.results);
        pagination.next = data.next;
    }
};

const selectJob = (job) => {
    selectedJob.value = job;
    showDropdown.value = false;
    dropdownTop.value = 0;
    dropdownLeft.value = 0;

    // Trigger the fade-in effect
    fadeInDetails.value = false;
    setTimeout(() => fadeInDetails.value = true, 0);

    if (isSmallScreen.value) {
        showModal.value = true;
    }
};

const closeModal = () => {
    showModal.value = false;
};

const getJobIcon = (url) => {
    const jobIcons = {
        linkedin: 'https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico',
        indeed: 'https://d3fw5vlhllyvee.cloudfront.net/companyLogos/v2/INDEED/favicon.ico'
    };
    for (const key in jobIcons) {
        if (url.includes(key)) return jobIcons[key];
    }
    return 'default-job-icon.png';
};

const formatDescription = (description) => description.replace(/●/g, '<br>●');

const limitDescription = (description) => {
    const maxLength = isSmallScreen.value ? 40 : 80;
    const cleanDescription = description.replace(/(<br>|<br\/>)/g, ' ');
    return cleanDescription.length > maxLength
        ? cleanDescription.substring(0, maxLength) + '...'
        : cleanDescription;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const positionDropdown = (event) => {
    const button = event.target;
    dropdownTop.value = button.offsetTop + button.offsetHeight;
    dropdownLeft.value = button.offsetLeft;
};

const openMarkAsAppliedDialog = () => {
    showMarkAsAppliedDialog.value = true;
};

const closeMarkAsAppliedDialog = () => {
    showMarkAsAppliedDialog.value = false;
};

const openDeleteJobDialog = () => {
    showDeleteJobDialog.value = true;
};

const closeDeleteJobDialog = () => {
    showDeleteJobDialog.value = false;
};

const markAsApplied = async () => {
    try {
        await jobStore.UPDATE_JOB_STATUS(selectedJob.value.id, 'applied');
        toast.success('Job marked as applied successfully');
        closeMarkAsAppliedDialog();
        await applyFilters();
    } catch (error) {
        console.error(error);
    }
};

const deleteJob = async () => {
    try {
        await jobStore.DELETE_JOB(selectedJob.value.id);
        toast.success('Job deleted successfully');
        closeDeleteJobDialog();
         applyFilters();
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    applyFilters();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>


<template>
    <div class="d-flex gap-2 ">
        <JobSearchForm />
        <v-btn
            color="primary"
            variant="outlined"
            @click="filter_dialog = true"
        >
            <v-icon class="mr-1">mdi-filter-variant</v-icon>
             filter jobs
        </v-btn>
    </div>
    <div :class="['job-page', { 'small-screen-padding': isSmallScreen }]">


        <!-- Job Listings & Details Layout -->
        <v-row>
            <!-- Job Listings Section -->
            <v-col v-if="!loading && jobs.length" :cols="isSmallScreen ? 12 : 4" class="job-list">
                <JobCard
                    v-for="job in jobs"
                    :key="job.id"
                    :job="job"
                    @click="selectJob(job)"
                    outlined
                />
                <v-btn v-if="pagination.next && jobs.length" @click="loadMoreJobs" color="primary"
                       class="load-more-btn">
                    Load More
                </v-btn>
            </v-col>

            <v-col v-else-if="!loading && !jobs.length" cols="12" class="no-results-message">
                <v-icon large color="primary" class="no-results-icon">mdi-alert-circle-outline</v-icon>
                <p>No results found. Try adjusting your filters.</p>
            </v-col>


            <!-- Job Details Section for >1200px -->
            <v-col
                v-if="!isSmallScreen && selectedJob && jobs.length"
                cols="8"
                class="job-details"
                :class="{ 'fade-in': fadeInDetails }"
            >
              <JobDetailsCard :job="selectedJob" />
            </v-col>

            <!-- Job Details Modal for Small Screens -->
            <v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon @click="closeModal">
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ selectedJob?.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-if="selectedJob?.job_search.status !== 'applied'"
                            color="green"
                            class="toolbar-button--highlight"
                            @click="openMarkAsAppliedDialog"
                            outlined
                            small
                        >
                            Mark as Applied
                        </v-btn>
                        <v-btn
                            color="red"
                            class="toolbar-button--highlight"
                            @click="openDeleteJobDialog"
                            outlined
                            small
                        >
                            Delete
                        </v-btn>
                    </v-toolbar>
                    <v-card-text class="v-card-text">
                        <p class="job-company">
                            <strong>{{ selectedJob?.company_name }} - {{ selectedJob?.location }}</strong>
                        </p>
                        <div class="job-description" v-html="formatDescription(selectedJob?.description)"></div>
                        <div v-if="selectedJob?.requirements && selectedJob.requirements.length">
                            <h5>Requirements:</h5>
                            <ul class="requirements-list">
                                <li v-for="(requirement, index) in selectedJob.requirements" :key="index">
                                    {{ requirement }}
                                </li>
                            </ul>
                        </div>
                        <div v-if="selectedJob?.benefits && selectedJob.benefits.length">
                            <h5>Benefits:</h5>
                            <ul class="benefits-list">
                                <li v-for="(benefit, index) in selectedJob.benefits" :key="index">
                                    {{ benefit }}
                                </li>
                            </ul>
                        </div>
                        <div v-if="selectedJob?.skills_required && selectedJob.skills_required.length">
                            <h5>Skills:</h5>
                            <v-chip-group class="skills-tags" column>
                                <v-chip v-for="(skill, index) in selectedJob.skills_required" :key="index"
                                        color="primary">
                                    {{ skill }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                    </v-card-text>
                    <div class="fixed-bottom-bar">
                        <v-btn :href="selectedJob?.original_url" target="_blank" color="primary"
                               class="apply-now-full-width">
                            Apply
                        </v-btn>
                    </div>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Scroll to Top Button -->
        <v-btn fab color="primary" class="scroll-to-top-btn" @click="scrollToTop">
            <v-icon>mdi-arrow-up</v-icon>
        </v-btn>

        <!-- Custom Confirmation Dialogs -->
        <CustomConfirmationDialog
            v-if="showMarkAsAppliedDialog"
            :dialog="showMarkAsAppliedDialog"
            title="Confirm Action"
            text="Are you sure you want to mark this job as applied?"
            confirm-text-button="Yes"
            cancel-text-button="No"
            @accept="markAsApplied"
            @reject="closeMarkAsAppliedDialog"
        />
        <CustomConfirmationDialog
            v-if="showDeleteJobDialog"
            :dialog="showDeleteJobDialog"
            title="Confirm Deletion"
            text="Are you sure you want to delete this job?"
            confirm-text-button="Delete"
            cancel-text-button="Cancel"
            @accept="deleteJob"
            @reject="closeDeleteJobDialog"
        />

        <!--        filter dialog -->
        <v-dialog
            persistent
            width="1000"
            min-width="800"
            v-model="filter_dialog"
            class="backdrop">
            <v-container>
                <v-card class="pa-4">
                    <v-card-title class="d-flex align-center justify-space-between">
                        <div>Job search Execution</div>
                        <div>
                            <v-btn
                                class="float-right"
                                icon="mdi-close"
                                variant="plain"
                                @click="filter_dialog = false"
                            >
                            </v-btn>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <!-- Search Filters -->
                        <div>
                            <v-row dense>
                                <!-- Search and Company Name Row -->
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="filters.search"
                                        label="Search for terms"
                                        prepend-inner-icon="mdi-magnify"
                                        @keydown.enter="applyFilters"
                                        outlined
                                        dense
                                        clearable
                                    />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="filters.company_name"
                                        label="Company Name"
                                        prepend-inner-icon="mdi-domain"
                                        outlined
                                        dense
                                        clearable
                                    />
                                </v-col>
                            </v-row>

                            <!-- Location, Employment Type, Job Type, and Sort By Row -->
                            <v-row dense>
                                <v-col cols="3">
                                    <v-text-field
                                        v-model="filters.location"
                                        label="Location"
                                        prepend-inner-icon="mdi-map-marker"
                                        outlined
                                        dense
                                        clearable
                                    />
                                </v-col>
                                <v-col cols="3">
                                    <v-select
                                        v-model="filters.employment_type"
                                        :items="employmentTypeOptions"
                                        label="Employment Type"
                                        prepend-inner-icon="mdi-briefcase"
                                        outlined
                                        dense
                                        clearable
                                    />
                                </v-col>
                                <v-col cols="3">
                                    <v-select
                                        v-model="filters.job_type"
                                        :items="jobTypeOptions"
                                        label="Job Type"
                                        prepend-inner-icon="mdi-clipboard-list-outline"
                                        outlined
                                        dense
                                        clearable
                                    />
                                </v-col>
                                <v-col cols="3">
                                    <v-select
                                        v-model="filters.sort_by"
                                        :items="sortOptions"
                                        label="Sort by"
                                        prepend-inner-icon="mdi-sort"
                                        outlined
                                        dense
                                        clearable
                                    />
                                </v-col>
                            </v-row>

                            <!-- Date Range and Salary Range Row -->
                            <v-row dense>
                                <v-col cols="6">
                                    <v-menu
                                        v-model="dateMenu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        :style="{ position: 'absolute', top: `${startDateTop}px`, left: `${startDateLeft}px` }"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="filters.posted_date_range_after"
                                                label="Start Date"
                                                prepend-inner-icon="mdi-calendar-start"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="openDatePicker($event, 'startDate')"
                                                outlined
                                                dense
                                                clearable
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="filters.posted_date_range_after"
                                            no-title
                                            @input="dateMenu = false"
                                        />
                                    </v-menu>
                                </v-col>

                                <!-- End Date Input -->
                                <v-col cols="6">
                                    <v-menu
                                        v-model="endDateMenu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        :style="{ position: 'absolute', top: `${endDateTop}px`, left: `${endDateLeft}px` }"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="filters.posted_date_range_before"
                                                label="End Date"
                                                prepend-inner-icon="mdi-calendar-end"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="openDatePicker($event, 'endDate')"
                                                outlined
                                                dense
                                                clearable
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="filters.posted_date_range_before"
                                            no-title
                                            @input="endDateMenu = false"
                                        />
                                    </v-menu>
                                </v-col>
                            </v-row>

                            <!-- Apply Filters Button -->
                            <v-row justify="center" dense class="filter-apply-row">
                                <v-col cols="12">
                                    <v-btn color="primary"  @click="applyFilters">
                                        Apply Filters
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-dialog>
    </div>
</template>



<style scoped lang="scss">
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