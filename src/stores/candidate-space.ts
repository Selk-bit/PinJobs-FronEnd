// store/candidate-space.ts
import { defineStore } from 'pinia';
import { uploadCV, importLinkedInProfile, createFromJobDescription, getCVData, deleteCV, editCV, jobSearch, getCVModel } from '@/api/home';
import type { User } from '@/types/user';

export const useHomeStore = defineStore({
  id: 'pinjobs-home-store',

  state: () => ({
    resumeData: null as any,
    templateId: null as any,
    formattedResume: null as any,
    template: null as any,
  }),

  actions: {
    async uploadCV(file: File) {
      try {
        const data = await uploadCV(file);
        this.resumeData = data;
      } catch (error) {
        console.error('Error uploading CV:', error);
      }
    },

    async importLinkedInProfile(linkedinProfileUrl: string) {
      try {
        const data = await importLinkedInProfile(linkedinProfileUrl);
        this.resumeData = data;
      } catch (error) {
        console.error('Error importing LinkedIn profile:', error);
      }
    },

    async createFromJobDescription(jobDescription: string) {
      try {
        const data = await createFromJobDescription(jobDescription);
        this.resumeData = data;
      } catch (error) {
        console.error('Error creating CV from job description:', error);
      }
    },

    async getCVData() {
      try {
        const data = await getCVData();
        return data;
      } catch (error) {
        console.error('Error getting CV data:', error);
      }
    },
    async getCVModel() {
      try {
        const data = await getCVModel();
        return data;
      } catch (error) {
        console.error('Error getting CV model:', error);
      }
    },
    async deleteCV(cvId: string) {
      try {
        await deleteCV(cvId);
        this.resumeData = null; // Clear data locally after deletion
      } catch (error) {
        console.error("Error deleting CV:", error);
      }
    },
    async editCV(updatedData: any, updatedModel: any) {
      try {
        const updatedCVData = await editCV(updatedData, updatedModel);
        this.resumeData = updatedCVData;
        console.log("CV updated successfully");
      } catch (error) {
        console.error("Error editing CV:", error);
      }
    },
    async jobSearch(candidate_data: any) {
      try {
        await jobSearch(candidate_data);
      } catch (error) {
        console.error("Error deleting CV:", error);
      }
    },
  },
});
