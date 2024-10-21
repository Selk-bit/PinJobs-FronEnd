import api from "@/api/api";
import endpoints from "@/api/endpoints";
import type {ImportedTemplateDTO} from "@/types/imported-templates";

const uploadDraft = async (data: ImportedTemplateDTO) => {
    try {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('name', data.name);
        const response = await api().post(endpoints.IMPORTED_TEMPLATES, formData,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getTemplateDraftByClientId = async (id: string | undefined) => {
    try {
        const response = await api().get(endpoints.IMPORTED_TEMPLATES + `/client/${id}/`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
export {
    uploadDraft,
    getTemplateDraftByClientId
}