import {createRouter, createWebHistory} from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import {useAuthStore} from '@/stores/auth';
import {useSettingStore} from "@/stores/settings";
import type {Language} from "@/types/language";


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
            name:'error',
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes,

        {
            name: 'account-confirmation',
            path: '/account-confirmation/:id',
            component: () => import('@/views/authentication/AccountConfirmation.vue')
        },
        {
            name: 'resume-preview',
            path: '/resume-preview/:id',
            component: () => import('@/views/CandidateResumeView.vue'),
            meta: {requiresAuth: false},
        },

    ]
});
router.beforeEach(async (to, from, next) => {
    // Define public pages that should be accessible without authentication
    const publicPages = ['/auth/login', '/auth/register'];
    const authRequired = !publicPages.includes(to.path); // Check if auth is required
    const auth: any = useAuthStore();
    const settings = useSettingStore();

    // Get the lang query parameter from the URL
    const lang = to.query.lang;

    // If the route requires authentication and the user is not logged in
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (lang) {
            // Set the language globally in your app using the query parameter
            settings.setLanguageFromLandingPage(lang as Language);
        }

        if (authRequired && !auth.isLoggedIn) {
            auth.returnUrl = to.fullPath;
            return next('/auth/login');
        } else {
            next(); // Proceed to the restricted page
        }
    }
    // If the user is already logged in and tries to access a public page like login or register
    else if (!authRequired && auth.isLoggedIn) {
        return next('/'); // Redirect to the resume-view page
    } else {
        if (lang) {
            // Update the language in settings store if lang query exists
            settings.setLanguageFromLandingPage(lang as Language);
        }
        next(); // Proceed to the public page
    }
});

// router.beforeEach(async (to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/auth/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth: any = useAuthStore();
//     const lang = to.params.lang;
//     const settings = useSettingStore()
//
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (lang) {
//             // Assuming you're using i18n for language switching
//             settings.setLanguageFromLandingPage(lang as Language); // Set the language globally in your app
//
//         }
//         if (authRequired && !auth.isLoggedIn) {
//             auth.returnUrl = to.fullPath;
//             return next('/auth/login');
//         } else next();
//     } else if (!authRequired && auth.isLoggedIn)
//         return next('/');
//     else next();
//
// });

// router.beforeEach(async (to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     console.log('check role')
//     const publicPages = ['/auth/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth = useAuthStore();
//
//     if (!!to.meta.allowed) {
//         console.log(to.meta.allowed);
//         if (authRequired) {
//
//             // @ts-ignore
//             if (to.matched.some((record) => record.meta.allowed?.includes(auth.user.roleId))) {
//                 next();
//             } else {
//
//                 next('error/404');
//             }
//         }
//
//     } else {
//         next();
//     }
//
//
// });
