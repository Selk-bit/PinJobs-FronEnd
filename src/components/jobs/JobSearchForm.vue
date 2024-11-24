<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { useBaseCvStore } from '@/stores/base-cv';

const dialog = ref( false);
const loading = ref(false);
const homeStore = useBaseCvStore();
const errors = reactive({
    keyword: '',
    location: '',
    jobCount: ''
});
const jobSearch = reactive({
    keyword: '',
    location: '',
    jobCount: 0
});

watch(dialog, (newVal) => {
    if (!newVal) {
        errors.keyword = '';
        errors.location = '';
        errors.jobCount = '';
    }
});

const clearErrors = () => {
    clearErrors();
};

const validate = () => {
    let valid = true;
    if (jobSearch.jobCount == 0) {
        errors.jobCount = 'Field required';
        valid = false;
    }

    if (!jobSearch.location) {
        errors.location = 'Field required';
        valid = false;
    } else {
        errors.location = '';
    }
    if (!jobSearch.keyword) {
        errors.keyword = 'Field required';
        valid = false;
    } else {
        errors.keyword = '';
    }
    if (jobSearch.jobCount <= 0) {
        errors.jobCount = 'number should be greater than 0';
        valid = false;
    } else {
        errors.jobCount = '';
    }
    return valid;
};

async function executeJobSearch() {

    if (!validate()) {
        return;
    }

    try {
        loading.value = true;
        await homeStore.jobSearch(jobSearch);
        toast.success('Job search started successfully');
        clearErrors();
        dialog.value = false;
    } catch (error) {
        console.error('Error executing job search:', error);
        toast.error('Failed to execute job search');
    } finally {
        loading.value = false;
    }
}


</script>

<template>
    <div>
        <v-dialog
            persistent
            width="1000"
            min-width="800"
            v-model="dialog"
            class="backdrop">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    v-bind="activatorProps"
                    color="primary"
                    variant="outlined"
                >
                    <v-icon class="mr-1">mdi-briefcase-search</v-icon>
                    Search jobs
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-form @submit.prevent="executeJobSearch">
                    <v-container>
                        <v-card class="pa-4">
                                <v-card-title class="d-flex align-center justify-space-between">
                                    <div>Job search Execution</div>
                                    <div>
                                        <v-btn
                                            class="float-right"
                                            icon="mdi-close"
                                            variant="plain"
                                            @click="isActive.value = false"
                                        >
                                        </v-btn>
                                    </div>
                                </v-card-title>
                            <v-card-text>
                                <v-row dense class="job-search-form mt-12">
                                    <v-col>
                                        <v-text-field
                                            v-model="jobSearch.location"
                                            label="Location"
                                            hide-details="auto"
                                            prepend-inner-icon="mdi-map-marker"
                                            outlined
                                            :error-messages="errors.location"
                                            dense
                                            clearable
                                        />
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="jobSearch.keyword"
                                            label="Keyword"
                                            prepend-inner-icon="mdi-magnify"
                                            outlined
                                            :error-messages="errors.keyword"
                                            hide-details="auto"

                                            dense
                                            clearable
                                        />
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="jobSearch.jobCount"
                                            label="Number of Jobs"
                                            prepend-inner-icon="mdi-counter"
                                            type="number"
                                            hide-details="auto"

                                            :error-messages="errors.jobCount"
                                            outlined
                                            dense
                                            clearable
                                        />
                                    </v-col>
                                    <v-col cols="12" class="mt-4">
                                        <v-btn color="primary" :loading="loading" type="submit">Execute</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-container>
                </v-form>
            </template>
        </v-dialog>
    </div>

</template>

<style scoped lang="scss">

</style>