// store/resume-view.ts
import { defineStore } from 'pinia';
import {
    deleteCV,
    editCV,
    getBaseCVData,
    importLinkedInProfile,
    uploadCV
} from '@/api/base-cv';
import type { Cv, Resume, ResumeType } from '@/types/resume';
import type { Identity, Template } from '@/types/model';

const layouts = [
    'sydney',
    'moriarty',
    'nosepass',
    'blueprint',
    'onyx',
    'siliconValley'

];
const default_template: Template = {
    'name': '',
    'reference': null,
    'language': 'en',
    'templateData': {
        'identity': 'reference' as Identity,
        'template': 'sydney',
        'company_logo': {
            'url': 'https://www.largeherds.co.za/wp-content/uploads/2024/01/logo-placeholder-image.png',
            'border': false,
            'hidden': false,
            'grayscale': false,
            'size': 70,
            'aspectRatio': 1,
            'borderRadius': 50
        },
        'page': {
            'margin': 12,
            'format': 'a4',
            'headline': true,
            'summary': true,
            'breakLine': false,
            'pageNumbers': false
        },
        'certifications': { 'name': 'certifications', 'visible': true },
        'education': { 'name': 'education', 'visible': true },
        'experience': { 'name': 'experience', 'visible': true },
        'volunteering': { 'name': 'volunteering', 'visible': true },
        'interests': { 'name': 'interests', 'visible': true },
        'languages': { 'name': 'languages', 'visible': true },
        'projects': { 'name': 'projects', 'visible': true },
        'references': { 'name': 'references', 'visible': true },
        'skills': { 'name': 'skills', 'visible': true },
        'social': { 'name': 'socials', 'visible': true },
        'theme': {
            'background': '#fff',
            'text': '#332D2D',
            'primary': '#1E1E1F'
        },
        'personnel': {
            'name': true,
            'phone': true,
            'city': true,
            'age': true,
            'email': true
        },
        'typography': {
            'family': 'open-sans',
            'size': 16,
            'lineHeight': 2,
            'hideIcons': false,
            'underlineLinks': false
        }
    }
};

export const useResumeStore = defineStore({
    id: 'pnj-resume-store',
    state: () => ({
        cv: {} as Cv,
        base: {} as Cv,
        resume: {} as Resume,
        //     model-store
        layouts: layouts,
        selected: 'sydney',
        model: {} as Template,


    }),

    actions: {
        // POST
        async UPLOAD_BASE_CV(file: File) {
            try {
                this.base = await uploadCV(file);
            } catch (error) {
                console.error('Error uploading CV:', error);
            }
        },
        async IMPORT_BASE_LINKEDIN_PROFILE(linkedinProfileUrl: string) {
            try {
                await importLinkedInProfile(linkedinProfileUrl);
            } catch (error) {
                console.error('Error importing LinkedIn profile:', error);
            }
        },


        // GET
        async GET_BASE_CV_DATA() {
            try {
                this.base = await getBaseCVData();
            } catch (error) {
                this.base = {} as Cv;
                console.error('Error getting CV data:', error);
            }

        },

        // DELETE
        async DELETE_BASE_CV() {
            try {
                await deleteCV();
            } catch (error) {
                console.error('Error deleting CV:', error);
            }
        },

        // PUT
        async EDIT_BASE_CV(updatedData: Resume, updatedModel: Template) {
            try {
                await editCV(updatedData, updatedModel);
                console.log('CV updated successfully');
            } catch (error) {
                console.error('Error editing CV:', error);
            }
        },
        setResume(resume: Resume) {
            this.resume = resume;
        },


        // ACTIONS
        //     model-store actions
        selectLayout(layout: string) {
            this.selected = layout;
        },
        setModel(item: Template) {
            this.model = item;
        },
        setFontFamily(item: string) {
            this.model.templateData.typography.family = item;
        },

        setDefaultTemplate() {
            this.model = default_template;
        }


    },
    persist: true
});
