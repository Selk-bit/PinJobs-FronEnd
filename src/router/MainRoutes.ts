const MainRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/base-cv',
    // redirect: '/',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [

        {
            name: 'base-cv',
            path: '/base-cv',
            meta: {
                title: 'page.base-cv'
            },
            component: () => import('@/views/base-cv/BaseCvView.vue')
        },

        {
            name: 'jobs',
            path: '/jobs',
            meta: {
                title: 'page.jobs'
            },
            component: () => import('@/views/JobsView.vue')
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
            component: () => import('@/views/UserSettingsView.vue')
        },

        {
            name: 'support',
            path: 'support',
            component: () => import('@/views/ContactSupport.vue')
        },

        //     pinjobs
        {
            name: 'cv-editor',
            path: '/cv-editor',
            meta: {
                title: 'page.editor'
            },
            component: async () => await import('@/views/CvEditorView.vue')
        },

        {
            name: 'testing',
            path: 'testing',
            component: () => import('@/components/PageTest.vue')
        },




    ]
};

export default MainRoutes;
