import {defineStore} from 'pinia';
import type {Job} from "@/types/job";
import {
    getJobs,
    delete_job,
    update_job_status
} from "@/api/Job";
import type {Language} from "@/types/language";


export const useJobStore = defineStore({
    id: 'Job-store',

    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            jobs: [] as Job[],
            lang: ''
        }),

    actions: {
        selectLanguage(lang: string) {
            this.lang = lang;
        },
        async GET_JOBS(filters, page) {
            try {
                const data = await getJobs(filters, page);
                this.jobs = data;
                return this.jobs;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE_JOB(job_id) {
            try {
                await delete_job(job_id);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async UPDATE_JOB_STATUS(job_id, status) {
            try {
                await update_job_status(job_id, status);
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
},);
