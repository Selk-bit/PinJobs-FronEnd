import { defineStore } from 'pinia';
import type { User } from '@/types/user';
import {  updateUser } from '@/api/user';



export const useUserStore = defineStore({
    id: 'pinjobs-user-store',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            users: [] as User[],
            client_users: {} as User[],
        }),

    actions: {

        async UPDATE_USER(user: User, id: string) {
            try {
                const data = await updateUser(user);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },


    },
},);
