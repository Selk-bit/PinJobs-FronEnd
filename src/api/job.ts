import api from "@/api/api";
import endpoints from "@/api/endpoints";
import axios from "axios";
import type {Language} from "@/types/language";
import qs from 'qs';
import {useAuthStore} from '@/stores/auth';


const base = import.meta.env.VITE_API_URL

let axs = axios.create({baseURL: base, timeout: 50000,})

  // src/api/job.ts
const getJobs = async (filters = {}, page) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page: String(page), // ensure page is part of the query
      }).toString();
  
      const response = await api().get(`${endpoints.API}/candidate-jobs/?${queryParams}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return response.data;  // includes next, previous, and results for pagination
    } catch (error: any) {
      return Promise.reject(error);
    }
  };
  

  const delete_job = async (job_id) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
      await api().delete(`${endpoints.API}/jobsearches/${job_id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const update_job_status = async (job_id, status) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
      await api().post(
        `${endpoints.API}/jobsearches/${job_id}/update-status/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  export { getJobs, delete_job, update_job_status };