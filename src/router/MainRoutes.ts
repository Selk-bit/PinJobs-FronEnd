const MainRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/resumes',
    // redirect: '/',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [

        {
            name: 'resumes',
            path: '/resumes',
            meta: {
                title: 'page.resumes'
            },
            component: () => import('@/views/resume-view/ResumeView.vue')
        },

        {
            name: 'edit-cv',
            path: '/edit-cv/:id',
            meta: {
                title: 'page.select-template'
            },
            component: () => import('@/views/edit-cv-view/EditCvView.vue'),
            children: [
                {
                    name: 'select-template',
                    path: 'select-template', // Default child route
                    meta: {
                        title: 'page.select-template'
                    },
                    component: () => import('@/views/edit-cv-view/children/SelectTemplateView.vue')
                },
                {
                    name: 'cv-editor',
                    path: 'cv-editor', // Nested under `/edit-cv/:id`
                    meta: {
                        title: 'page.editor'
                    },
                    component: async () => await import('@/views/edit-cv-view/children/CvEditorView.vue')
                }
            ]
        },


        {
            name: 'jobs',
            path: '/jobs',
            meta: {
                title: 'page.jobs'
            },
            component: () => import('@/views/jobs-view/JobsView.vue')
        },
        {
            name: 'buy-credits',
            path: 'buy-credits/:credits?',
            component: () => import('@/components/buy-credits/SelectCreditAmount.vue')

        },
        {
            name: 'user-settings',
            path: 'user-settings',
            meta: {
                title: 'page.settings'
            },
            component: () => import('@/views/settings-view/UserSettingsView.vue')
        },

        {
            name: 'support',
            path: 'support',
            component: () => import('@/views/contact-view/ContactSupport.vue')
        },

        //     pinjobs


        {
            name: 'testing',
            path: '/testing/:operation?',
            component: () => import('@/components/PageTest.vue')
        }


    ]
};

export default MainRoutes;
