import api from '@/api/api';
import endpoints from '@/api/endpoints';
import type { AbstractTemplate } from '@/types/abstract-template';

const getAbstractTemplates = async (): Promise<AbstractTemplate[]> => {
    try {
        // Send login request as JSON
        const res = await api().get(endpoints.TEMPLATES);
        const { data } = res;
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


export {
    getAbstractTemplates
};