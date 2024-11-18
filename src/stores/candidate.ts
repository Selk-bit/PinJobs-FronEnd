import {defineStore} from 'pinia';
import type {Candidate, Summary} from "@/types/candidate";
import {
    createCandidate, createDrafts,
    deleteCandidateById, generateSummary,
    getCandidateById,
    getCandidates,
    getCandidatesByClientId,
    getDataForCandidate, renderFormattedResume,
    sendEditDataEmail, translateResumeData,
    updateCandidate,
    updateCandidateResumeData,
    updateCandidateResumeFile,
    updateResumeData
} from "@/api/candidate";
import type {Education, Resume} from "@/types/resume";
import type {Language} from "@/types/language";


export const useCandidateStore = defineStore({
    id: 'pinjobs-candidate-store',

    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            candidates: [] as Candidate[],
            summaries: [] as Summary[],
            lang: ''
        }),

    actions: {
        selectLanguage(lang: string) {
            this.lang = lang;
        },
        async GET_ALL() {
            try {
                const data = await getCandidates();
                this.candidates = data;
                return this.candidates;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_ALL_BY_CLIENT(id: string | undefined) {
            try {
                const data = await getCandidatesByClientId(id);
                this.candidates = data;
                return this.candidates;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_BY_ID(id: string | undefined) {
            try {
                const data = await getCandidateById(id);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        cleanText(summary: string) {

            function decodeUnicode(text: string) {
                // Use JavaScript's `unescape` method to convert Unicode characters to readable text
                return text.replace(/\\u([\dA-F]{4})/gi, function (match, group) {
                    return String.fromCharCode(parseInt(group, 16));
                });
            }

            return decodeUnicode(summary);
        },
        async CREATE(files: any) {
            try {
                const data = await createCandidate(files);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        }, async GENERATE_SUMMARY(data: Resume, language: Language) {
            try {
                const res = await generateSummary(data, language);
                let summary = this.cleanText(res.summary);

                this.summaries.push({summary});
                return res;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async RENDER_FORMATTED_RESUME(id: string) {
            try {
                return await renderFormattedResume(id);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE(candidate: Candidate, id: string) {
            try {
                return await updateCandidate(candidate, id);

            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_RESUME_DATA(resumeData: Resume, templateId: string, candidateId: string,) {

            try {
                return await updateResumeData(resumeData, templateId, candidateId)
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE(candidateId: string) {
            try {
                const data = await deleteCandidateById(candidateId);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async SEND_EMAIL_LINK(id: string, templateId: string) {
            try {
                const data = await sendEditDataEmail(id, templateId);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async CREATE_DRAFT(emails: string[], templateId: string) {
            try {
                const data = await createDrafts(emails, templateId);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_DATA_FOR_CANDIDATE(id: string, token: string) {
            try {
                const data = await getDataForCandidate(id, token);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_CANDIDATE_DATA(id: string, token: string, resume: Resume) {


            try {
                const data = await updateCandidateResumeData(id, token, resume);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async TRANSLATE(resumeData: Resume, language: Language) {
            try {
                const data = await translateResumeData(resumeData, language);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_CANDIDATE_FILE(id: string, token: string) {
            try {
                const data = await updateCandidateResumeFile(id, token);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },

    },
},);
