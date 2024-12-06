import api from "@/api/api";
import {useAuthStore} from '@/stores/auth';



import endpoints from "@/api/endpoints";

// const payWithPaypal = async (data:any) => {
//     try {
//         const response = await api().post(endpoints.CLIENTS + 'paypal-process-payment', data);
//         return response.data;
//     } catch (error: any) {
//         return Promise.reject(error);
//     }
// };


const createOrderWithPaypal = async (credits: number) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
        const response = await api().post(endpoints.USERS + '/top-up', {
            credits
        },);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const captureOrderWithPaypal = async (orderId: string) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    try {
        const response = await api().post(endpoints.USERS + '/top-up-confirm', {
            orderId
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


export { createOrderWithPaypal, captureOrderWithPaypal};
