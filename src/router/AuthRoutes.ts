const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'login',
            path: 'login',
            component: () => import('@/views/authentication/LoginView.vue')
        },
           {
            name: 'register',
            path: 'register',
            component: () => import('@/views/authentication/RegisterView.vue')
        },
        {
            name: 'reset-password-request',
            path: 'reset-password-request',
            component: () => import('@/views/authentication/ResetPasswordRequestView.vue')
        },
        {
            name: 'reset-password-request-success',
            path: 'reset-password-request-success',
            component: () => import('@/views/authentication/ResetPasswordRequestSuccessView.vue')
        },
        {
            name: 'reset-password-success',
            path: 'reset-password-success',
            component: () => import('@/views/authentication/ResetPasswordSuccessView.vue')
        },
            {
            name: 'reset-password',
            path: 'reset-password/',
            component: () => import('@/views/authentication/ResetPasswordView.vue')
        },
        // {
        //     name: 'Error',
        //     path: '404',
        //     component: () => import('@/views/authentication/Error.vue')
        // }

    ]
};

export default AuthRoutes;
