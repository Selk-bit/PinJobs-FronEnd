import api from '@/api/api';
import endpoints from '@/api/endpoints';

const base = import.meta.env.VITE_API_URL;

// Document upload function
export async function uploadCV(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    const response = await api().post(`${endpoints.API}/upload-cv/`, formData, {});
    return response.data;
}

// LinkedIn profile import function
export async function importLinkedInProfile(linkedinProfileUrl: string) {
    const response = await api().post(`${endpoints.API}/linkedin-cv/`, {
            linkedin_profile_url: linkedinProfileUrl
        }
    );
    return response.data;
}

// Job description creation function
export async function createFromJobDescription(jobDescription: string) {
    const response = await api().post(`${endpoints.API}/job-description-cv/`, {
            job_description: jobDescription
        },
        );
    return response.data;
}

export async function getCVData() {

    try {
        const response = await api().get(`${endpoints.API}/cv-data/`, {});
        return response.data;
    } catch (error: any) {
        if (error?.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function getCVModel() {

    try {
        const response = await api().get(`${endpoints.API}/cv/template/`);
        return response.data;
    } catch (error: any) {
        if (error?.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function deleteCV(cvId: string) {

    try {
        const response = await api().delete(`${endpoints.API}/cv/${cvId}/delete/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting CV:', error);
        throw error;
    }
}

export async function editCV(updatedData: any, updatedModel: any) {

    let cvResponse, templateResponse;

    try {
        // Update CV data request
        cvResponse = await api().post(`${endpoints.API}/cv/update-cvdata/`, updatedData);
    } catch (error) {
        console.error('Error editing CV data:', error);
        throw new Error('Failed to update CV data.');
    }

    try {
        // Update template data request
        templateResponse = await api().post(`${endpoints.API}/cv/template/`, updatedModel);
    } catch (error) {
        console.error('Error updating CV template:', error);

        // If the CV data update was successful but the template update failed
        if (cvResponse) {
            throw new Error('CV data updated, but template update failed.');
        } else {
            throw new Error('Both CV data and template update failed.');
        }
    }

    // Return success if both requests succeeded
    if (cvResponse && templateResponse) {
        return { message: 'CV and template updated successfully.' };
    }
}


export async function jobSearch(candidate_data: any) {
    try {
        const response = await api().post(`${endpoints.API}/scrape-jobs/`, candidate_data);
        return response.data;
    } catch (error) {
        console.error('Error editing CV:', error);
        throw error;
    }
}
