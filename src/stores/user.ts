import {defineStore} from 'pinia';
import type {AddUserDTO, User} from "@/types/user";
import {deleteUserById, getUsers, updateUser} from "@/api/user";
import {getClientUsers} from "@/api/client";


export const useUserStore = defineStore({
    id: 'user-store',

    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            users: [] as User[],
            client_users: {} as User[],
        }),

    actions: {
        async GET_ALL_USERS() {
            try {
                const data = await getUsers();
                this.users = data;
                return this.users;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_CLIENT_USERS(clientId: string | undefined) {
            try {
                this.client_users = await getClientUsers(clientId);
                return this.client_users;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_USER(user: User, id: string) {
            try {
                const data = await updateUser(user);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE_USER(userId: string) {
            try {
                return await deleteUserById(userId);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },

    },
},);
