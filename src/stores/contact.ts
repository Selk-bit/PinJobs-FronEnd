import {defineStore} from 'pinia';
import {sendEmailToSupport} from "@/api/contact";
import type {ContactForm} from "@/types/contact";


export const useContactStore = defineStore({
    id: 'contact-store',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/

        }),
    actions: {
        async SEND_EMAIL_TO_SUPPORT(form: ContactForm) {
            try {
                return await sendEmailToSupport(form);

            } catch (error: any) {
                return Promise.reject(error);
            }
        }
    },

});
