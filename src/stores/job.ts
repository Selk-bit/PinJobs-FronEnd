import {defineStore} from 'pinia';
import type {Job} from "@/types/job";
import {
    getJobs, unFavoriteJob
} from '@/api/job';

import type {Language} from "@/types/language";


export const useJobStore = defineStore({
    id: 'pinjobs-Job-store',

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
        async GET_JOBS(filters: any, page: any) {
            try {
                const data = await getJobs(filters, page);
                this.jobs = data;
                return this.jobs;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UNFAVORITE_JOB(job_id: number) {
            try {
                await unFavoriteJob(job_id);
            } catch (error) {
                return Promise.reject(error);
            }
        },

    },
},);
