import {defineStore} from 'pinia';
import {useI18n} from "vue-i18n";
import {router} from '@/router';
import type {Identity, Model, Page, Template, Theme, Typography} from "@/types/model";
import {ref} from "vue";
import {
    createTemplate,
    deleteTemplateById,
    getTemplateById,
    getTemplates,
    getTemplatesByClientId,
    updateTemplate
} from "@/api/template";
import type {ImportedTemplateDTO} from "@/types/imported-templates";
import {getTemplateDraftByClientId, uploadDraft} from "@/api/imported-templates";

const default_template: Template = {
    "name": '',
    "reference": null,
    "language":'en',
    "templateData": {
        "identity":"reference" as Identity,
        "template": "sydney",
        "company_logo": {
            "url": "https://www.largeherds.co.za/wp-content/uploads/2024/01/logo-placeholder-image.png",
            "border": false,
            "hidden": false,
            "grayscale": false,
            "size": 70,
            "aspectRatio": 1,
            "borderRadius": 50,
        },
        "page": {
            "margin": 12,
            "format": 'a4',
            "headline": true,
            "summary": true,
            "breakLine": false,
            "pageNumbers": false,
        },
        "certifications": {"name": 'certifications', "visible": true},
        "education": {"name": 'education', "visible": true},
        "experience": {"name": 'experience', "visible": true},
        "volunteering": {"name": 'volunteering', "visible": true},
        "interests": {"name": 'interests', "visible": true},
        "languages": {"name": 'languages', "visible": true},
        "projects": {"name": 'projects', "visible": true},
        "references": {"name": 'references', "visible": true},
        "skills": {"name": 'skills', "visible": true},
        "social": {"name": 'socials', "visible": true},
        "theme": {
            'background': "#fff",
            "text": "#332D2D",
            "primary": "#1E1E1F",
        },
        "personnel": {
            "name": true,
            "phone": true,
            "city": true,
            "age": true,
            "email": true
        },
        "typography": {
            "family": "open-sans",
            "size": 16,
            "lineHeight": 2,
            "hideIcons": false,
            "underlineLinks": false,
        },
    }
}


const dev_mode = import.meta.env.VITE_DEV_MODE;

const templates = ref([
    'sydney',
    'moriarty',
    'nosepass',
    'blueprint',
    'onyx',
    'siliconValley',
    // 'bronzor',
    // 'chikorita',
    // 'pikachu',
]);


export const useModelStore = defineStore({
    id: 'pinjobs-model-store',
    state: () => ({
        model: default_template as Template,
        selected: 'sydney',
        templates: dev_mode == 'true' ? templates.value : templates.value.filter(item => item != 'bronzor'),
        models: [] as Template[],
        showCreateBtn: true,
        showTemplateSection: true,

        // templates,
    }),
    getters: {
        //
    },
    actions: {
        assignModel(model: Template) {
            this.model = model;
        },
        SetTemplate(item: string) {
            this.selected = item;
            this.model.templateData.template = item;
        },
        InitModel() {
            this.model = default_template as Template;
            this.showCreateBtn = true;
        },
        SetFontFamily(item: string) {
            this.model.templateData.typography.family = item;
        },
        SetModel(item: Template) {
            this.model = {} as Template;
            this.model = item;
        },
        async GET_TEMPLATES() {
            try {
                const data = await getTemplates();
                this.models = data;
                return this.models;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_TEMPLATE_BY_ID(id: string) {
            try {
                const data: Template = await getTemplateById(id);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_ALL_BY_CLIENT_ID(id: string | undefined) {
            try {
                const data = await getTemplatesByClientId(id);
                this.models = data;
                return this.models;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_TEMPLATE_DRAFT_BY_CLIENT_ID(id: string | undefined) {
            try {
                const data = await getTemplateDraftByClientId(id);
                this.models = data;
                return this.models;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async CREATE_TEMPLATE(template: Template) {
            try {
                const data = await createTemplate(template);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_TEMPLATE(template: Template, id: string | undefined) {
            try {
                const data = await updateTemplate(template, id);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPLOAD_TEMPLATE(data: ImportedTemplateDTO) {
            try {
                const res = await uploadDraft(data);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE_TEMPLATE(id: string) {
            try {
                const data = await deleteTemplateById(id);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
    }
});
