import {defineStore} from 'pinia';
import type {Position, DrawerPosition} from "@/types/position";
import type {User} from "@/types/user";
import {sleep} from "@/utils/helpers/sleep";
import type {Filters} from "@/types/filters";


export const useSettingStore = defineStore({
    id: 'settings-store',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            language: "fr",
            toast_position: 'top-center' as Position,
            editorSelectCard: true,
            dragModel: false,
            dragResume: false,
            modelDrawer: true,
            resumeDrawer: true,
            drawerPosition: 'left' as DrawerPosition,
            filter_options: {
                reference: '',
                name: '',
                email: '',
                selectedModels: [] as string[],
                skills: [],
                experienceRange: [0, 30],
                headline: '',
                selectedLanguages: [] as string[],
                certification: '',
                matchOnlySelectedSkills: false,
                matchAtLeastOneSkill: false,
            } as Filters,

        }),
    actions: {
        setLanguage(language: string) {
            this.language = language;
        },
        setEditorSelectCard(val: boolean) {
            this.editorSelectCard = val;
        },
        toggleModelDrawer() {
            this.modelDrawer = !this.modelDrawer;
        },
         toggleResumeDrawer() {
            this.resumeDrawer = !this.resumeDrawer;
        },
        setLanguageFromLandingPage(language: string) {
            this.language = language;

        },
          toggleResumeDragMode() {
            this.dragResume = !this.dragResume;
        },
    },
    persist: true,

});
