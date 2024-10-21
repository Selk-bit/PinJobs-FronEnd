import api from "@/api/api";


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
    try {
        const response = await api().post(endpoints.CLIENTS + '/top-up', {
            credits
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const captureOrderWithPaypal = async (orderId: string) => {
    try {
        const response = await api().post(endpoints.CLIENTS + '/top-up-confirm', {
            orderId
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


export { createOrderWithPaypal, captureOrderWithPaypal};
