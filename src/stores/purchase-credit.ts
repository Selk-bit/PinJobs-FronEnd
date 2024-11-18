import {defineStore} from 'pinia';
import type {Pack} from "@/types/pack";
// 11 - 100 : 3$
// 101 - 500: 1,99$
// +501:0,99$

export const packEn = [
    {
        id: 1,
        price: 'Free',
        type: 'Normal',
        tag: 'Free',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: false,
        import_cv_fee: '0',
        color: 'white', // Color for the Free tier
        features: [
            {content: "10 Credits", available: true},
            {content: "All CV Templates", available: true},
            {content: "Basic CV Sections", available: true},
            {content: "Real-time content suggestions", available: true},
            {content: "Applicant Tracking System (ATS)", available: true},
            {content: "Resume database (search by keyword)", available: true},
            {content: "Access to all design tools", available: false},
            {content: "CvBusiness Logo", available: false}
        ]
    },
    {
        id: 2,
        price: '3',
        type: 'Pro Creator',
        tag: 'Advanced',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: true,
        import_cv_fee: '250',
        color: 'primary', // Color for the second tier
        features: [
            {content: "11-25 Credits", available: true},
            {content: "All CV Templates", available: true},
            {content: "Basic CV Sections", available: true},
            {content: "Real-time content suggestions", available: true},
            {content: "Applicant Tracking System (ATS)", available: true},
            {content: "Resume database (search by keyword)", available: true},

            {content: "CvBusiness Logo", available: true},
            {content: "Access to all design tools", available: true}
        ]
    },
    {
        id: 3,
        price: '1,99',
        type: 'Premium',
        tag: 'Popular',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: true,
        import_cv_fee: '150',
        color: 'primary', // Color for the third tier
        features: [
            {content: "26-100 credits", available: true},
            {content: "Real-time content suggestions", available: true},
            {content: "Applicant Tracking System (ATS)", available: true},
            {content: "Pro CV Sections", available: true},
            {content: "Company Logo", available: true},
            {content: "Resume database (search by keyword)", available: true},

            {content: "Unlimited Sections", available: true},
            {content: "Advanced design options", available: true}
        ]
    },
    {
        id: 4,
        price: '0,99',
        type: 'Gold',
        tag: 'Popular',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: true,
        import_cv_fee: 'Free',
        color: 'gold', // Color for the last tier
        features: [
            {content: "+251 credits", available: true},
            {content: "Import your own templates", available: true},
            {content: "Real-time content suggestions", available: true},
            {content: "Applicant Tracking System (ATS)", available: true},
            {content: "Pro CV Sections", available: true},
            {content: "Resume database (search by keyword)", available: true},

            {content: "Company Logo", available: true},
            {content: "Multi-language CV Translation", available: true}
        ]
    }
];

export const packFr = [
    {
        id: 1,
        price: 'Gratuit',
        type: 'Normal',
        tag: 'Gratuit',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: false,
        import_cv_fee: '0',
        color: 'white', // Color for the Free tier
        features: [
            {content: "10 Crédits", available: true},
            {content: "Tous les modèles de CV", available: true},
            {content: "Sections de CV de base", available: true},
            {content: "Suggestions de contenu en temps réel", available: true},
            {content: "Système de suivi des candidats (ATS)", available: true},
            {content: "Base de données de CV (recherche par mot-clé)", available: true},
            {content: "Accès à tous les outils de design", available: false},
            {content: "Logo CvBusiness", available: false}
        ]
    },
    {
        id: 2,
        price: '3',
        type: 'Pro Créateur',
        tag: 'Avancé',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: true,
        import_cv_fee: '250',
        color: 'primary', // Color for the second tier
        features: [
            {content: "11-25 Crédits", available: true},
            {content: "Suggestions de contenu en temps réel", available: true},
            {content: "Système de suivi des candidats (ATS)", available: true},
            {content: "Tous les modèles de CV", available: true},
            {content: "Sections de base du CV", available: true},
            {content: "Base de données de CV (recherche par mot-clé)", available: true},

            {content: "Logo CvBusiness", available: true},
            {content: "Accès à tous les outils de design", available: true}
        ]
    },
    {
        id: 3,
        price: '1,99',
        type: 'Premium',
        tag: 'Populaire',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: true,
        import_cv_fee: '150',
        color: 'primary', // Color for the third tier
        features: [
            {content: "26-100 crédits", available: true},
            {content: "Suggestions de contenu en temps réel", available: true},
            {content: "Système de suivi des candidats (ATS)", available: true},
            {content: "Sections de CV pro", available: true},
            {content: "Logo Entreprise", available: true},
            {content: "Base de données de CV (recherche par mot-clé)", available: true},

            {content: "Nombre de sections illimité", available: true},
            {content: "Options de design avancées", available: true}
        ]
    },
    {
        id: 4,
        price: '0,99',
        type: 'Gold',
        tag: 'Populaire',
        personalisation: '1',
        translation: '0.5',
        content_generation: '0.5',
        cvtech: '0.5',
        import_cv: true,
        import_cv_fee: 'Gratuit',
        color: 'gold', // Color for the last tier
        features: [
            {content: "+251 crédits", available: true},
            {content: "Importer vos propres modèles", available: true},
            {content: "Suggestions de contenu en temps réel", available: true},
            {content: "Système de suivi des candidats (ATS)", available: true},
            {content: "Sections de CV pro", available: true},
            {content: "Base de données de CV (recherche par mot-clé)", available: true},

            {content: "Logo Entreprise", available: true},
            {content: "Traduction multi-langue de CV", available: true}
        ]
    }
];

export const useCreditsStore = defineStore({
    id: 'pinjobs-credits-store',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            selectedCreditPack:1,
            packEn,
            packFr,
            credits:0,
            min:11,
            max:500


        }),
    actions: {

    },
    // persist: true,

});
