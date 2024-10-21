import {defineStore} from 'pinia';

import {createClient, deleteClientById, deleteClientLogoById, getClients, updateClient} from "@/api/client";
import type {ClientProfile, UpdateClientDTO} from "@/types/client-profile";


export const useClientStore = defineStore({
    id: 'client-store',

    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            clients: [] as ClientProfile[],
        }),

    actions: {

        async UPDATE(dto: UpdateClientDTO, id: string) {
            try {
                const data = await updateClient(dto, id);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE_LOGO( id: string) {
            try {
                const data = await deleteClientLogoById(id);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },


    },
},);
