import {defineStore} from 'pinia';
import {useI18n} from "vue-i18n";
import {router} from '@/router';
import type {Identity, Model, Page, Template, Theme, Typography} from "@/types/model";
import {ref} from "vue";


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




const templates = ref([
    'sydney',
    'moriarty',
    'nosepass',
    'blueprint',
    'onyx',
    'siliconValley',

]);


export const useModelStore = defineStore({
    id: 'pinjobs-model-store',
    state: () => ({
        model: default_template as Template,
        selected: 'sydney',
        templates:  templates.value,
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
    }
});
