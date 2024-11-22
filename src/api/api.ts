import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { router } from '@/router';
import type { User } from '@/types/user';
import { logout } from '@/api/auth';

/**
 * axios setup
 */
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },

let refreshTokenPromise: any;

const getRefreshToken = () => axios.get('auth/refresh', {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then((dt: any) => console.log(dt));


const api = () => {
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 180000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    axiosInstance.interceptors.request.use(
        (config) => {
            const authStore = useAuthStore();
            if (authStore.isLoggedIn) {
                const token = authStore.token;
                if (token) {
                    config.headers!.Authorization = 'Bearer ' + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function(error) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                if (!refreshTokenPromise) { // check for an existing in-progress request
                    // if nothing is in-progress, start a new refresh token request
                    refreshTokenPromise = getRefreshToken().then(() => {
                        refreshTokenPromise = null; // clear state
                    }).catch(async (error) => {
                        refreshTokenPromise = null;
                        console.error('Token refresh failed:', error);
                        const authStore = useAuthStore();
                        authStore.isLoggedIn = false;
                        authStore.user = {} as User;
                        authStore.token = '';
                        await router.push('/auth/login');
                    });
                }

                return refreshTokenPromise.then(() => {
                    return axiosInstance(originalRequest);
                });
            }
            return Promise.reject(error); // For all other errors, return the error as is.
        }
    );

    return axiosInstance;
};

export default api;
