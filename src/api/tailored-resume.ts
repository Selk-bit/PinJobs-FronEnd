import api from '@/api/api';
import endpoints from '@/api/endpoints';
import type { TailoredResume } from '@/types/tailored-resume';
import type { Template } from '@/types/model';
import type { Cv, Resume } from '@/types/resume';


const getAllCvs = async () => {
    try {
        const res = await api().get(endpoints.CVS);
        const { data } = res;
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const deleteCv = async (id: number) => {
    try {
        const res = await api().delete(`${endpoints.CVS}/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

// will be on jobs page
const createCvByJobId = async (job_id: number) => {
    try {
        const res = await api().post(`${endpoints.CVS}`, {
            job_id
        });
        return res.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

//will be on the generated resumes
const createCvFromJobLink = async (job_link: string) => {
    try {
        const res = await api().post(endpoints.CVS, {
            job_link
        });
        const { data } = res;
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const updateCv = async (cvId: number, cv: Cv) => {
    try {
        const res = await api().put(`${endpoints.CVS}/${cvId}`, {
            name: cv.name,
            cv_data: cv.cv_data,
            template: cv.template
        });
        const { data } = res;
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const getCvById = async (cvId: number) => {
    try {
        const res = await api().get(`/cvs/${cvId}/`);
        return res.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


async function editCvName(name: string, cv_data: Resume) {
    try {
        // Update CV data request
        let response = await api().patch(endpoints.CVS + `/${cv_data.cv_id}/`, {
            cv_data: { ...cv_data, name }
        });

        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export {
    // GET
    getAllCvs,
    getCvById,
    // CREATE
    createCvByJobId,
    createCvFromJobLink,

    // DELETE
    deleteCv,
    editCvName,
    // PUT
    updateCv
};
