import api from '@/api/api';
import endpoints from '@/api/endpoints';
import type { Resume } from '@/types/resume';


// Document upload function
export async function uploadCV(file: File) {
    try {
        const formData = new FormData();
        formData.append('files', file);
        const response = await api().post(endpoints.CVS_BASE + `/upload/`, formData, {});
        console.log(response.data, 'DATA FROM RESPONSE UPLOAD BASE FILE');
        return response.data;

    } catch (error: any) {
        return Promise.reject(error);
    }
}

// LinkedIn profile import function
export async function importLinkedInProfile(linkedinProfileUrl: string) {
    try {
        const response = await api().post(`${endpoints.CVS_BASE}/linkedin/`, {
                linkedin_profile_url: linkedinProfileUrl
            }
        );
        return response.data;

    } catch (error: any) {
        return Promise.reject(error);
    }
}

// Job description creation function
export async function createFromJobDescription(jobDescription: string) {
    const response = await api().post(`${endpoints.CVS_BASE}/job-description-cv/`, {
            job_description: jobDescription
        }
    );
    return response.data;
}

export async function getBaseCVData() {

    try {
        const response = await api().get(endpoints.CVS_BASE);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


export async function deleteCV() {

    try {
        const response = await api().delete(endpoints.CVS_BASE + `/cvdata/`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function editCV(cv_data: any, template: any) {
    try {
        // Update CV data request
        let response = await api().put(endpoints.CVS_BASE + '/', {
            cv_data,
            template
        });

        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


