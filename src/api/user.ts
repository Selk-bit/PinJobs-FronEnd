import api from "@/api/api";
import endpoints from "@/api/endpoints";
import type {AddUserDTO, User} from "@/types/user";
import {useAuthStore} from '@/stores/auth';


const getUsers = async () => {
    try {
        const response = await api().get(endpoints.USERS);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getUserById = async (id: number | undefined) => {
    try {
        const response = await api().get(endpoints.API + `/${id}/`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getCurrentUser = async () => {
    const authStore = useAuthStore();  // Access the token from the store

    try {
        const response = await api().get(endpoints.API + `/current`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,  // Use the access token
            },
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const getConsultants = async () => {
    try {
        const response = await api().get(endpoints.API + `/consultants`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const updateUser = async (user: User) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await api().patch(endpoints.API + `/candidate/update/`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};



const deleteUserById = async (id: string) => {
    try {
        await api().delete(endpoints.USERS + `/${id}/`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};





export {getUsers, getUserById, updateUser, getCurrentUser, deleteUserById, getConsultants};