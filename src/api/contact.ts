import endpoints from "@/api/endpoints";
import api from "@/api/api";
import type {ContactForm} from "@/types/contact";


const sendEmailToSupport = async (form: ContactForm) => {
    try {
        const response = await api().post(endpoints.CONTACT, form);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


export {
    sendEmailToSupport
}