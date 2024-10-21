import {defineStore} from 'pinia';
import type {Candidate} from '@/types/candidate';
import type {Template} from '@/types/model';
import type {Language} from "@/types/language";

export const useFormattingStore = defineStore({
    id: 'formatting-store',
    state: () =>
        ({
            candidate: {} as Candidate,
            template: {} as Template,
            language: 'fr' as Language,
        }),
    persist: true,

});