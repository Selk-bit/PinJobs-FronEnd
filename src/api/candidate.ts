import api from "@/api/api";
import endpoints from "@/api/endpoints";
import type {Candidate} from "@/types/candidate";
import type {Resume} from "@/types/resume";
import axios from "axios";
import type {Language} from "@/types/language";

const base = import.meta.env.VITE_API_URL

let axs = axios.create({baseURL: base, timeout: 50000,})

const getCandidates = async () => {
    try {
        const response = await api().get(endpoints.CANDIDATES);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getCandidateById = async (id: string | undefined) => {
    try {
        const response = await api().get(endpoints.CANDIDATES + `/${id}`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getCandidatesByClientId = async (id: string | undefined) => {
    try {
        const response = await api().get(endpoints.CANDIDATES + `/client/${id}/`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const getClientCandidates = async (id: number | undefined) => {
    try {
        const response = await api().get(endpoints.CANDIDATES + `/client/${id}`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const createCandidate = async (files: any) => {
    try {
        const formData = new FormData();
        for (let file of files) {
            formData.append('resumes', file);
        }
        const response = await api().post(endpoints.CANDIDATES, formData,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const renderFormattedResume = async (candidateId: string) => {
    try {

        const response = await api().post(endpoints.CANDIDATES + `/update-formatted/${candidateId}`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
const generateSummary = async (data: Resume, language: Language) => {
    try {

        const response = await api().post(endpoints.CANDIDATES + `/generate-summary/`, {
            data,
            language,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const updateCandidate = async (user: Candidate, id: string) => {
    try {
        const response = await api().patch(endpoints.CANDIDATES + `/${id}/`, user);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const updateResumeData = async (resume: Resume, templateId: string, candidateId: string,) => {
    try {
        const response = await api().patch(endpoints.CANDIDATES + `/${candidateId}/`, {
                templateId,
                resumeData: resume,
            }
        );
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const deleteCandidateById = async (id: string | undefined) => {
    try {
        await api().delete(endpoints.CANDIDATES + `/${id}/`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const sendEditDataEmail = async (id: string, templateId: string,) => {
    try {
        const response = await api().post(endpoints.CANDIDATES + `/send-email/${id}`, {
            templateId,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


const createDrafts = async (emails: string[], templateId: string,) => {
    try {
        const response = await api().post(endpoints.CANDIDATES + `/create-drafts/`, {
            emails,
            templateId,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

const getDataForCandidate = async (id: string, token: string) => {
    try {
        const response = await axs.get(endpoints.CANDIDATES + `/candidate-info/${id}?cdtk=${token}`);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

const updateCandidateResumeData = async (id: string, token: string, resumeData: Resume) => {

    try {
        const response = await axs.patch(endpoints.CANDIDATES + `/candidate-data/${id}?cdtk=${token}`, {resumeData});
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


const translateResumeData = async (resumeData: Resume, language: Language) => {
    try {
        const response = await api().post(endpoints.CANDIDATES + `/translate/`, {
            data: resumeData,
            language,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


const updateCandidateResumeFile = async (id: string, token: string) => {
    try {
        const response = await axs.post(endpoints.CANDIDATES + `/candidate-file/${id}?cdtk=${token}`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


export {
    getCandidates,
    // get candidate data for edit
    getDataForCandidate,
    updateResumeData,
    // send email to candidate
    sendEditDataEmail,
    generateSummary,
    renderFormattedResume,
    // update resume data
    updateCandidateResumeData,
    // update resume file
    updateCandidateResumeFile,
    getCandidatesByClientId,
    getCandidateById,
    translateResumeData,
    createDrafts,
    createCandidate,
    updateCandidate,
    deleteCandidateById,
    getClientCandidates
};