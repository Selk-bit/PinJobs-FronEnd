// store/base-cv.ts
import { defineStore } from 'pinia';
import {
    createFromJobDescription,
    deleteCV,
    editCV,
    getCVData,
    getCVModel,
    importLinkedInProfile,

    uploadCV
} from '@/api/base-cv';
import type { Resume } from '@/types/resume';
import type { Template } from '@/types/model';

export const useBaseCvStore = defineStore({
    id: 'pinjobs-base-cv-store',

    state: () => ({
        resumeData: {} as Resume,
        modelData: {} as Template,
        isCreate: false,
        import_dialog_data: false,
        page_operations_title: ''
    }),

    actions: {
        async uploadCV(file: File) {
            try {
                this.resumeData = await uploadCV(file);
            } catch (error) {
                console.error('Error uploading CV:', error);
            }
        },

        async importLinkedInProfile(linkedinProfileUrl: string) {
            try {
                this.resumeData = await importLinkedInProfile(linkedinProfileUrl);
            } catch (error) {
                console.error('Error importing LinkedIn profile:', error);
            }
        },


        async getCVData() {
            try {
                this.resumeData = await getCVData();
                return this.resumeData;
            } catch (error) {
                this.resumeData = {} as Resume;
                console.error('Error getting CV data:', error);
            }
        },
        async getCVModel() {
            try {
                return await getCVModel();
            } catch (error) {
                console.error('Error getting CV model:', error);
            }
        },
        async deleteCV() {
            try {
                await deleteCV();

            } catch (error) {
                console.error('Error deleting CV:', error);
            }
        },
        async editCV(updatedData: any, updatedModel: any) {
            try {
                await editCV(updatedData, updatedModel);
                console.log('CV updated successfully');
            } catch (error) {
                console.error('Error editing CV:', error);
            }
        }

    }
});
