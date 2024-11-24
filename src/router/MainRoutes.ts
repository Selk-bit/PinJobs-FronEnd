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
            name: 'candidates',
            path: '/candidates',
            meta: {
                title: 'page.candidates'
            },
            component: () => import('@/views/CandidatesView.vue')
        },
        {
            name: 'candidate-details-view',
            path: 'candidates/:candidateId',
            meta: {
                title: 'page.candidateDetails'
            },
            component: () => import('@/views/personalisation/CandidateDetailsView.vue')
        },

        {
            name: 'create-model',
            path: '/models-creation',
            meta: {
                title: 'page.create'
            },
            component: () => import('@/views/models/CreationView.vue')
        },
        {
            name: 'models-consultation',
            path: '/models-consultation',
            meta: {
                title: 'page.consultation'
            },
            component: () => import('@/views/models/ConsultationView.vue')
        },
        {
            name: 'personalisation-editeur',
            path: '/personalisation-editeur',
            meta: {
                title: 'page.editor'
            },
            component: async () => await import('@/views/personalisation/EditorView.vue')
        },

        {
            name: 'facturation-upgrade-plan',
            path: 'facturation-upgrade-plan',
            component: () => import('@/views/facturation/UpgradePlanView.vue')
        },

        {
            name: 'facturation-invoice',
            path: 'facturation-invoice',
            meta: {
                title: 'page.invoice'
            },
            component: () => import('@/views/facturation/InvoiceView.vue')
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
            name: 'faqs',
            path: 'faqs',
            component: () => import('@/views/FAQsView.vue')
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
        //     import data options
           {
            name: 'testing',
            path: 'testing',
            component: () => import('@/components/PageTest.vue')
        },

    ]
};

export default MainRoutes;
