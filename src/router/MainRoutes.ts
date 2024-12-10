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
            name: 'select-template',
            path: '/select-template',
            meta: {
                title: 'page.resumes'
            },
            component: () => import('@/views/template-view/SelectTemplateView.vue')
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
            name: 'cv-editor',
            path: '/cv-editor',
            meta: {
                title: 'page.editor'
            },
            component: async () => await import('@/views/cv-editor-view/CvEditorView.vue')
        },

        {
            name: 'testing',
            path: 'testing',
            component: () => import('@/components/PageTest.vue')
        }


    ]
};

export default MainRoutes;
