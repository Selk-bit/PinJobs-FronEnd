// store/resume-view.ts
import { defineStore } from 'pinia';

import { getAbstractTemplates } from '@/api/abstract-template';
import type { AbstractTemplate } from '@/types/abstract-template';


export const useAbstractTemplates = defineStore({
    id: 'pnj-abstract-templates-store',

    state: () => ({
        abstractTemplates:[] as AbstractTemplate[]

    }),

    actions: {
        async GET_ABSTRACT_TEMPLATES() {
            try {
                this.abstractTemplates = await getAbstractTemplates();
            } catch (error) {
                console.error('Error :', error);
            }
        },



    }
});
