import {defineStore} from 'pinia';
import {captureOrderWithPaypal, createOrderWithPaypal, } from "@/api/payment";


export const usePaymentStore = defineStore({
    id: 'pinjobs-payment-store',
    state: () => ({
        // templates,
    }),
    getters: {
        //
    },
    actions: {
        async CREATE_ORDER(credits: Number | NumberConstructor) {
            try {
                const res = await createOrderWithPaypal(credits as number);
                return res;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async CAPTURE_ORDER(orderId:string) {
            try {
                const res = await captureOrderWithPaypal(orderId);
                return res;
            } catch (error: any) {
                return Promise.reject(error);
            }
        }
    }
});
