import api from "@/api/api";
import endpoints from "@/api/endpoints";
import type {ClientProfile, UpdateClientDTO} from "@/types/client-profile";

const getClients = async () => {
    try {
        const response = await api().get(endpoints.CLIENTS);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getClientById = async (id: number) => {
    try {
        const response = await api().get(endpoints.CLIENTS + `/${id}`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const getClientUsers = async (id: string | undefined) => {
    try {
        const response = await api().get(endpoints.CLIENTS + `/users/${id}`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const createClient = async (client: ClientProfile) => {
    try {
        const response = await api().post(endpoints.CLIENTS, {
            ...client,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const updateClient = async (dto: UpdateClientDTO, id: string): Promise<any> => {
  const formData = new FormData();

  // Append the logo file if it exists and is not null or undefined
  if (dto.logo instanceof File) {
    formData.append('logo', dto.logo, dto.logo.name);
  }

  // Append other fields from the DTO
  formData.append('name', dto.name);

  console.log(formData, 'FormData content before sending');

  try {
    const response = await api().patch(`${endpoints.CLIENTS}/${id}/`, formData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating client:', error);
    return Promise.reject(error);
  }
};


const deleteClientById = async (id: number | undefined) => {
    try {
        await api().delete(endpoints.CLIENTS + `/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const deleteClientLogoById = async (id:string) => {
    try {
        await api().delete(endpoints.CLIENTS + `/logo/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export {getClients, getClientById, createClient, updateClient, deleteClientById, getClientUsers, deleteClientLogoById};