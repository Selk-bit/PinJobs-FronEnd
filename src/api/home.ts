import api from "@/api/api";
import endpoints from "@/api/endpoints";
import axios from 'axios';
import {useAuthStore} from '@/stores/auth';

const base = import.meta.env.VITE_API_URL

// Document upload function
export async function uploadCV(file: File) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const formData = new FormData();
  formData.append('files', file);
  const response = await api().post(`${endpoints.API}/upload-cv/`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    },
  });
  return response.data;
}

// LinkedIn profile import function
export async function importLinkedInProfile(linkedinProfileUrl: string) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const response = await api().post(`${endpoints.API}/linkedin-cv/`, {
    linkedin_profile_url: linkedinProfileUrl,
  },
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  }
);
  return response.data;
}

// Job description creation function
export async function createFromJobDescription(jobDescription: string) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const response = await api().post(`${endpoints.API}/job-description-cv/`, {
    job_description: jobDescription,
  },
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export async function getCVData() {
  const authStore = useAuthStore();
  const token = authStore.token;
  try {
    const response = await api().get(`${endpoints.API}/cv-data/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function deleteCV(cvId: string) {
  const authStore = useAuthStore();
  const token = authStore.token;
  try {
    const response = await api().delete(`${endpoints.API}/cv/${cvId}/delete/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting CV:', error);
    throw error;
  }
}

export async function editCV(updatedData) {
  const authStore = useAuthStore();
  const token = authStore.token;
  try {
    const response = await api().post(`${endpoints.API}/cv/update-cvdata/`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing CV:', error);
    throw error;
  }
}

export async function jobSearch(candidate_data) {
  const authStore = useAuthStore();
  const token = authStore.token;
  try {
    const response = await api().post(`${endpoints.API}/scrape-jobs/`, candidate_data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing CV:', error);
    throw error;
  }
}
