import api from '@/api/api';
import endpoints from '@/api/endpoints';

// src/api/job.ts
const getJobs = async (filters = {}, page: any) => {
    try {
        const queryParams = new URLSearchParams({
            ...filters,
            page: String(page) // ensure page is part of the query
        }).toString();

        const response = await api().get(endpoints.JOBS + `/all?${queryParams}`);
        return response.data;  // includes next, previous, and results for pagination
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const unFavoriteJob = async (jobId: number) => {

    try {
        await api().delete(`${endpoints.JOBS}/favorites/${jobId}`);
    } catch (error) {
        return Promise.reject(error);
    }
};
const getFavoriteJobs = async () => {

    try {
        await api().get(endpoints.JOBS + '/favorites/');
    } catch (error) {
        return Promise.reject(error);
    }
};
const addJobToFavorites = async (job_id: number) => {

    try {
        await api().post(endpoints.JOBS + '/favorites/', {
            job_id
        });
    } catch (error) {
        return Promise.reject(error);
    }
};
const getFavoriteJobSimilarityScores = async (job_id: any, status: any) => {

    try {
        await api().post(
            endpoints.JOBS+
            `/favorites/scores/`,
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

export { getJobs, getFavoriteJobs, unFavoriteJob,addJobToFavorites, getFavoriteJobSimilarityScores };