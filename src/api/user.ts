import api from "@/api/api";
import endpoints from "@/api/endpoints";
import type {AddUserDTO, User} from "@/types/user";
import {useAuthStore} from '@/stores/auth';
import type { ChangePasswordDto } from '@/types/change-password-dto';


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
        const response = await api().get(endpoints.USERS + `/${id}/`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getCurrentUser = async () => {
    const authStore = useAuthStore();  // Access the token from the store

    try {
        const response = await api().get(endpoints.USERS + `/me`, {
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};





const updateUser = async (user: User) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    try {
        const response = await api().patch(endpoints.USERS + `/me`, user);
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

const changeUserPassword = async (dto: ChangePasswordDto) => {
    const authStore = useAuthStore();
    try {
        const response = await api().post(
            endpoints.AUTH + '/change-password/',
            {
                old_password: dto.old_password,
                new_password: dto.password,
                confirm_password: dto.password_confirmation
            },

        );
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};



export {getUsers, getUserById, updateUser, getCurrentUser, deleteUserById, changeUserPassword};