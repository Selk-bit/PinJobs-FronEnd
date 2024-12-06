import api from '@/api/api';
import endpoints from '@/api/endpoints';



// Document upload function
export async function uploadCV(file: File) {
    try {
        const formData = new FormData();
        formData.append('files', file);
        const response = await api().post(endpoints.CVS_BASE + `/upload/`, formData, {});
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

export async function getCVData() {

    try {
        const response = await api().get(endpoints.CVS_BASE + `/cvdata/`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function getCVModel() {
    try {
        const response = await api().get(endpoints.CVS_BASE+`/template/`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function deleteCV() {

    try {
        const response = await api().delete(endpoints.CVS_BASE +`/cvdata/`);
        return response.data;
    }  catch (error: any) {
        return Promise.reject(error);
    }
}

export async function editCV(updatedData: any, updatedModel: any) {

    let cvResponse, templateResponse;

    try {
        // Update CV data request
        cvResponse = await api().patch(endpoints.CVS_BASE+`/cvdata/`, updatedData);
    }  catch (error: any) {
        return Promise.reject(error);
    }

    try {
        // Update template data request
        templateResponse = await api().post(endpoints.CVS_BASE+ `/template/`, updatedModel);
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


