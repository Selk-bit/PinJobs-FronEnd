import {defineStore} from 'pinia';
import type {User} from "@/types/user";
import {router} from '@/router';
import {
    getCurrentUser, getUserById,
} from "@/api/user";
import endpoints from "@/api/endpoints";
import Api from "@/api/api";
import {
    changeUserPassword,
    login,
    logout,
    register,
    resetPassword,
    resetPasswordRequest,
    verifyAccount
} from '@/api/auth';
import type {RegistrationForm} from "@/types/auth";
import type {ChangePasswordDto} from "@/types/change-password-dto";


export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            user: {} as User,
            current_user: {} as User,
            isLoggedIn: false,
            token: '',

        }),
    actions: {
        async GET_CURRENT_USER() {
            try {
                const data = await getCurrentUser();
                this.user = data;
                this.current_user = data;
                return data;
            } catch (err) {
                console.log(err);
            }
        },
        async CHANGE_PASSWORD(form:ChangePasswordDto) {
            try {
                const data = await changeUserPassword(form);
                return data;
            } catch (err) {
               return Promise.reject(err);
            }
        },
        async LOGIN(email: string, password: string) {
            try {
                const response = await login(email, password);
                this.token = response.data.access;
                this.isLoggedIn = true;
                await router.push('/');
            } catch (error: any) {
                console.log(error);
                this.token = '';
                this.isLoggedIn = false;
                return Promise.reject(error);
            }
        },
        
        async REGISTER(data: RegistrationForm) {
            try {
                return await register(data);
            } catch (error: any) {
                console.log(error);
                this.token = '';
                this.isLoggedIn = false;
                return Promise.reject(error);
            }
        },
        async LOGOUT() {
            try {
                await logout();
                this.isLoggedIn = false;
                this.token = '';
                this.user = {} as User;
                await router.push('/auth/login');
            } catch (error) {
                this.isLoggedIn = false;
                this.token = '';
                this.user = {} as User;
                await router.push('/auth/login');
                return Promise.reject(error);
            }

        },
        async RESET_PASSWORD_REQUEST(email: string) {
            try {
                const response = await resetPasswordRequest(email);
                await router.push({name: 'reset-password-request-success'});
            } catch (error: any) {
                console.log(error);
                this.token = '';
                this.isLoggedIn = false;
                return Promise.reject(error);
            }
        },
        async RESET_PASSWORD(token: string, password: string, password_confirmation: string) {
            try {
                const response = await resetPassword(token, password, password_confirmation);
                await router.push({name: 'reset-password-success'});

            } catch (error: any) {
                console.log(error);
                this.token = '';
                this.isLoggedIn = false;
                return Promise.reject(error);
            }
        },
        async VERIFY_ACCOUNT(token: string, id: string) {
            try {
                return await verifyAccount(token, id);
                // await router.push({name: 'login'});
            } catch (error: any) {
                console.log(error);
                this.token = '';
                this.isLoggedIn = false;
                return Promise.reject(error);
            }
        },
    },
    persist: true,

});
