// store/resume-view.ts
import { defineStore } from 'pinia';
import {
    createCvByJobId,
    createCvFromJobLink,
    deleteCv,
    editCvName,
    getAllCvs,
    getCvById,
    updateCv
} from '@/api/tailored-resume';
import type { TailoredResume, TailoredResumesPaginated } from '@/types/tailored-resume';
import type { Template } from '@/types/model';
import type { Cv, Resume } from '@/types/resume';


export const useTailoredResumeStore = defineStore({
    id: 'pnj-tailored-resume-store',

    state: () => ({
        tailoredResumes: [] as TailoredResume[],
        getCvsResults: {} as TailoredResumesPaginated
    }),

    actions: {
        async GET_ALL() {
            try {
                this.getCvsResults = await getAllCvs();
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async GET_BY_ID(cvId: number) {
            try {
                return await getCvById(cvId);
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async DELETE(id: number) {
            try {
                return await deleteCv(id);
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async UPDATE_CV(cvId: number, cv: Cv) {
            try {
                return await updateCv(cvId, cv);
            } catch (error) {
                console.error('Error :', error);
            }
        },

        async CREATE_BY_JOB_ID(job_id: number) {
            try {
                return await createCvByJobId(job_id);
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async CREATE_BY_JOB_LINK(link: string) {
            try {
                return await createCvFromJobLink(link);
            } catch (error) {
                console.error('Error :', error);
            }
        },
        async UPDATE_NAME(name: string, cv_data: Resume) {
            try {
                return await editCvName(name, cv_data);
            } catch (error) {
                console.error('Error :', error);
            }
        }


    }
});
