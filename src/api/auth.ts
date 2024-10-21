import api from "@/api/api";
import endpoints from "@/api/endpoints";
import type {RegistrationForm} from "@/types/auth";
import type {ChangePasswordDto} from "@/types/change-password-dto";
import {useAuthStore} from '@/stores/auth';


const resetPasswordRequest = async (email: string) => {
    try {
        const response = await api().post(endpoints.AUTH + '/forgot-password', {
            email,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const changeUserPassword = async (dto: ChangePasswordDto) => {
    const authStore = useAuthStore();
    try {
        const response = await api().post(
            endpoints.API + '/change-password/', 
            {
                old_password: dto.old_password,
                new_password: dto.password,
                confirm_password: dto.password_confirmation
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const login = async (username: string, password: string) => {
    try {
        // Send login request as JSON
        return await api().post(endpoints.API + '/login/', {
            identifier: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json',  // Ensure content-type is JSON
            },
        });
    } catch (error: any) {
        return Promise.reject(error);
    }
};

// const createCandidate = async (files: any) => {
//     try {
//         const formData = new FormData();
//         for (let file of files) {
//             formData.append('resumes', file);
//         }
//         const response = await api().post(endpoints.CANDIDATES, formData, {responseType: 'blob'});
//         return response.data;
//     } catch (error: any) {
//         return Promise.reject(error);
//     }
// };

const register = async (form: RegistrationForm) => {
    // Prepare the JSON payload
    const payload = {
        username: form.username,  // Add username
        first_name: form.firstName,  // Django expects snake_case for field names
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        password_confirmation: form.password_confirmation,
        age: form.age,  // Send age directly as a number
        city: form.city,
        country: form.country,
    };

    try {
        // Post the JSON payload to the Django backend API
        const response = await api().post(endpoints.API + '/signup/', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const logout = async () => {
    const authStore = useAuthStore();

    try {
        const response = await api().post(endpoints.API + '/logout/', {
            access: authStore.token
        });
        return response;
    } catch (error: any) {
        return Promise.reject(error);
    }
};


const resetPassword = async (token: string, password: string, password_confirmation: string) => {
    try {
        const response = await api().post(endpoints.AUTH + `/reset-password?rstk=${token}`, {
            password,
            password_confirmation,
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const verifyAccount = async (confirmationToken:string,id:string) => {
    try {
        const response = await api().post(endpoints.AUTH + `/account-verification/${id}?cftk=${confirmationToken}`,);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};



export {
    resetPasswordRequest,
    resetPassword,
    login,
    verifyAccount,
    changeUserPassword,
    logout,
    register,
};