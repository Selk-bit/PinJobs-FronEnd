<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { modelComponents } from '@/models-imports';
import { useResumeStore } from '@/stores/resume';
import ModelSettings from '@/components/model-settings/ModelSettings.vue';

import type { Resume, ResumeType } from '@/types/resume';
import { toast } from 'vue-sonner';
import { getPrimary } from '@/utils/UpdateColors';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/user';
import { useSettingStore } from '@/stores/settings';
import { validateLink } from '@/utils/helpers/validate-link';
import type { Template } from '@/types/model';
import ResumeSettings from '@/components/resume-settings/ResumeSettings.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import AppLoader from '@/components/shared/AppLoader.vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute } from 'vue-router';

const settings = useSettingStore();
const transform = ref({ x: 260, y: 20, scale: 0.7 });
const resumeStore = useResumeStore();
const cvData = ref<Resume>();
const loading = ref<boolean>(false);
const { mobile, sm, md, xs } = useDisplay();
const { t } = useI18n();
const backBlazeUrl = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);
const tab = ref(false);
const { width, height } = useWindowSize();
const route = useRoute();
const resumeId = Number.parseInt(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);

const logo = computed(() => {
    if (!useAuthStore().user.clientProfile?.logo) {
        return 'https://www.largeherds.co.za/wp-content/uploads/2024/01/logo-placeholder-image.png';
    } else {
        return validateLink(backBlazeUrl.value + useAuthStore().user.clientProfile?.logo);

    }
});
const dummy_resume_data = ref({
    'age': '29',
    'imageUrl': '',
    'city': 'Paris',
    'alias': 'Demo alias',
    'yoe': '4',
    'name': 'John Doe',
    'work': [
        {
            'city': 'Casablanca',
            'end_date': '2019',
            'start_date': 'Depuis Décembre  ',
            'job_title': 'Ingénieur Devops',
            'company_name': 'SOCIETE GENERALE',
            'responsibilities': '<ul><li>Provisioning de l’infrastructure (Infra-as-code) : Terraform</li><li>Assurer l’intégration continue des différents projets et le déploiement continu depuis l’environnement de Dev au Production (Github Actions, Hooks, Jenkins, gradle, Nexus, Consul, PostgresSql, Ansible, AWS, Python, Bash, traefik, Vault, Gradle, Scrum, Kanban)</li><li>Intégration et Déploiement du Socle WSO2 pour la gestion d’authentification, OTP, Token</li><li>Monitoring des services (Elasticsearch, Kibana, Filebeat, Heartbeat, Grafana, Loki)</li><li>Assurer le Run des projets (Checkly)</li></ul>',
            'environnement': 'Github Actions, Hooks, Jenkins, gradle, Nexus, Consul, PostgresSql, Ansible, AWS, Python, Bash, traefik, Vault, Gradle, Scrum, Kanban'
        },
        {
            'job_title': 'Backend Developer',
            'responsibilities': 'Développement de services backend robustes, optimisation des performances, et gestion des bases de données. Contribué à l\'amélioration des processus CI/CD.',
            'company_name': 'SocioTech',
            'city': 'Paris',
            'start_date': '03/2023',
            'end_date': '05/2023',
            'environnement': 'Java8 Maven Hibernate Springboot Springdata Springsecurity Soap Angular13 Angularmaterial Bootstrap4 PL/SQL SSH MySQL Git SandBoxing DevOps Sonar Jenkins Jira ScaledSCRUM'

        },
        {
            'city': 'Casablanca',
            'end_date': 'à Décembre 2019',
            'job_title': 'Ingénieur Devops',
            'start_date': 'De Septembre 2018',
            'company_name': 'Banque Centrale Populaire',
            'responsibilities': '<ul><li>Test</li><li>Gestion de bugs</li><li>Déploiement du développement des spécifications fonctionnelles détaillées par domaine métier</li></ul>',
            'environnement': 'Gitlab, Ansible, Npm, Jenkins, Maven, SonarQube, Jboss, Nexus, VMware, Junit, Selenium'
        }
    ],
    'email': 'john.doe@gmail.com',
    'phone': '+33 6 12 34 56 78',
    'skills': [
        { 'skill': 'JavaScript', 'level': 'Advanced', 'category': 'programming languages' },
        { 'skill': 'C', 'level': 'Advanced', 'category': 'programming languages' },
        { 'skill': 'Java', 'level': 'Advanced', 'category': 'programming languages' },
        { 'skill': 'AngularJS', 'level': 'Advanced', 'category': 'programming languages' },
        { 'skill': ' PL/SQL JEE/JAVA,', 'level': 'Advanced', 'category': 'programming languages' },
        { 'skill': 'Visual Basic', 'level': 'Advanced', 'category': 'programming languages' },
        { 'skill': 'Python', 'level': 'Proficient', 'category': 'programming languages' },
        { 'skill': 'Git', 'level': 'Advanced', 'category': 'Gestion de version, bugs et de configuration' },
        { 'skill': 'SVN', 'level': 'Intermediate', 'category': 'Gestion de version, bugs et de configuration' },
        { 'skill': 'Mantis', 'level': 'Intermediate', 'category': 'Gestion de version, bugs et de configuration' },
        { 'skill': 'Ansible', 'level': 'Advanced', 'category': 'Gestion de version, bugs et de configuration' },
        { 'skill': 'Merise', 'level': 'Advanced', 'category': 'Conception et modélisation' },
        { 'skill': 'UML', 'level': 'Advanced', 'category': 'Conception et modélisation' },
        { 'skill': 'Scrum', 'level': 'Advanced', 'category': 'Méthodes agiles' },
        { 'skill': 'Gantt', 'level': 'Intermediate', 'category': 'Gestion des projets SI' },
        { 'skill': 'Pert', 'level': 'Intermediate', 'category': 'Gestion des projets SI' },
        { 'skill': 'MySQL', 'level': 'Advanced', 'category': 'SGBD' },
        { 'skill': 'Oracle', 'level': 'Advanced', 'category': 'SGBD' },
        { 'skill': 'SQL Server', 'level': 'Advanced', 'category': 'SGBD' },
        { 'skill': 'JPA', 'level': 'Advanced', 'category': 'Framework J2EE' },
        { 'skill': 'EJB', 'level': 'Advanced', 'category': 'Framework J2EE' },
        { 'skill': 'Hibernante', 'level': 'Advanced', 'category': 'Framework J2EE' },
        { 'skill': 'JSF', 'level': 'Advanced', 'category': 'Framework J2EE' },
        { 'skill': 'T24', 'level': 'Advanced', 'category': 'Core Banking' },
        { 'skill': 'SonarQube', 'level': 'Advanced', 'category': 'Test et contrôle de qualité' },
        { 'skill': 'Jmeter', 'level': 'Advanced', 'category': 'Test et contrôle de qualité' },
        { 'skill': 'Selenium', 'level': 'Advanced', 'category': 'Test et contrôle de qualité' },
        { 'skill': 'Junit', 'level': 'Advanced', 'category': 'Test et contrôle de qualité' },
        { 'skill': 'Docker', 'level': 'Advanced', 'category': 'Build et automatisation' },
        { 'skill': 'Nexus', 'level': 'Advanced', 'category': 'Build et automatisation' },
        { 'skill': 'Maven', 'level': 'Advanced', 'category': 'Build et automatisation' },
        { 'skill': 'Jenkins', 'level': 'Advanced', 'category': 'Build et automatisation' },
        { 'skill': 'Vue.js 3', 'level': 'Advanced', 'category': 'UI Frameworks' },
        { 'skill': 'NestJS', 'level': 'Advanced', 'category': 'backend framework' }
    ],
    'social': [
        { 'skill': 'Communication', 'level': 'Exceptional' },
        { 'skill': 'Teamwork', 'level': 'Exceptional' },
        { 'skill': 'Problem-solving', 'level': 'Advanced' }
    ],
    'projects': [
        {
            'end_date': '12/2022',
            'start_date': '09/2022',
            'description': '<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul>',
            'project_name': 'Réservation des Tickets Busway'
        },
        {
            'end_date': '08/2022',
            'start_date': '06/2022',
            'description': '<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul>',
            'project_name': 'Cartographie de degré de Centralité dans Paris'
        },
        {
            'end_date': '04/2022',
            'start_date': '01/2022',
            'description': '<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul>',
            'project_name': 'Application Web pour la gestion de la paie'
        }
    ],
    'interests': [{ 'interest': 'Cuisine' }, { 'interest': 'Télévision' }, { 'interest': 'Lecture' }],
    'languages': [
        { 'level': 'Exceptional', 'language': 'Anglais' },
        { 'level': 'Advanced', 'language': 'Français' },
        { 'level': 'Exceptional', 'language': 'Arabe' }
    ],
    'educations': [
        {
            'degree': 'Diplôme d\'ingénieur d\'état en informatique',
            'end_year': '2018',
            'start_year': '2015',
            'institution': 'EMI, Rabat'
        },
        {
            'degree': 'Classes Préparatoires aux Grandes Ecoles d’ingénieurs',
            'end_year': '2015',
            'start_year': '2013',
            'institution': 'Reda Slaoui, Agadir'
        },
        {
            'degree': 'Baccalauréat scientifique, option : Sciences Mathématiques B',
            'end_year': '2013',
            'start_year': '2011',
            'institution': 'Tiznit'
        }
    ],
    'references': [
        {
            'name': 'Alice Dupont',
            'phone': '+33 6 98 76 54 32',
            'company': 'TechCorp',
            'position': 'Manager IT',
            'email': 'alice.dupont@techcorp.com'
        }
    ],
    'volunteering': [
        {
            'organization': 'SocioTech',
            'position': 'Community Support Volunteer',
            'start_date': '03/2023',
            'end_date': '06/2023',
            'description': '<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul><p><strong>Environnement Technique:</strong> Jira, Confluence, XRay, Postman, Cucumber, Gherkin</p>'
        }
    ],
    'certifications': [
        {
            'certification': 'Certified Java Developer',
            'institution': 'Oracle',
            'date': '06/2023',
            'link': 'https://www.oracle.com/certification/java-certification.html'
        }
    ],
    'headline': 'Ingénieur Prod/Devops ',
    'summary': 'Développeur full-stack avec une forte expérience en conception et déploiement d\'applications web robustes. Compétent en JavaScript, Vue.js, Python, et NestJS, avec un engagement à créer des solutions de haute qualité pour les entreprises.'
});
const loadBaseFromScratch = async () => {
    try {
        loading.value = true;
        await resumeStore.GET_BASE_CV_DATA();
        resumeStore.setResume({
            ...resumeStore.base?.cv_data,
            interests: resumeStore.base?.cv_data.interests ?? []
        });
        resumeStore.setDefaultTemplate();
    } catch (error) {
        console.error('Error loading CV data or model:', error);
    } finally {
        loading.value = false;

    }
};

const updateBaseResume = async () => {
    try {
        loading.value = true;
        await resumeStore.EDIT_BASE_CV(resumeStore.resume, resumeStore.model);
    } catch (error) {
        console.error('Error loading CV data or model:', error);
    } finally {
        loading.value = false;

    }
};

function mapToResumeFormat(data: any): Resume {
    return {
        name: data.name || '',
        yoe: data.yoe || '',
        headline: data.headline || '',
        alias: data.alias || '',
        imageUrl: data.imageUrl || '',
        email: data.email || '',
        phone: data.phone || '',
        age: data.age || '',
        city: data.city || '',
        language: data.language || { language: '', level: '' },
        summary: data.summary || '',
        work: data.work || [],
        template: {} as Template,
        educations: data.educations || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        references: data.references || [],
        volunteering: data.volunteering || [],
        interests: data.interests || [],
        languages: data.languages || [],
        skills: data.skills || [],
        social: data.social || []
    };
}

onBeforeMount(async () => {

    //
    // if (resumeStore.resumeType == 'base-from-scratch') {
    //     await loadBaseFromScratch();
    // }

});





</script>


<template>
    {{resumeId}}
<!--    <div class="overflow-auto bd  " v-if="!loading">-->
<!--        <div class=" resume-page-container mx-auto"-->
<!--        >-->
<!--            <component class="mx-auto my-2   " :is="modelComponents[resumeStore.selected]"></component>-->
<!--        </div>-->
<!--    </div>-->
    <v-navigation-drawer
        app
        :location="settings.drawerPosition"
        elevation="2"
        v-model="settings.modelDrawer"
        :width="xs ? 360 : sm ? 400 : md ? 500 : 590"
    >
        <!-- Sticky Toolbar -->
        <v-card
            elevation="0"
            density="compact"
            class="sticky-card  "
        >
            <div class="d-flex justify-space-between">
                <BaseBreadcrumb class="bd" title="Cv editor" />
                <div class="ma-3">
                    <v-btn @click="updateBaseResume" color="primary" variant="tonal">save</v-btn>
                </div>
            </div>


            <v-tabs

                v-model="tab"
                grow
                color="primary"
            >
                <v-tab :value="1">
                    <v-icon class="mr-1 ">mdi-text-account</v-icon>
                    CV Data
                </v-tab>
                <v-tab :value="2">
                    <v-icon class="mr-1 ">mdi-file-document-outline</v-icon>
                    Template
                </v-tab>
            </v-tabs>
        </v-card>

        <v-window v-model="tab">
            <v-window-item :value="1">
                <v-container fluid>
                    <!-- Public Templates -->
                    <v-row dense>
                        <div class="text-3 ma-3">
                            Edit your resume data using the relevant sections you need:
                        </div>
                    </v-row>
                </v-container>
                <ResumeSettings />
            </v-window-item>
            <v-window-item :value="2">
                <v-container>
                    <v-row dense>

                        <div class="text-3 ma-3">
                            Customize your template of choice however you wish:
                        </div>
                    </v-row>
                </v-container>
                <ModelSettings />
            </v-window-item>
        </v-window>
    </v-navigation-drawer>
    <AppLoader :loading="loading" />

</template>

<style scoped lang="scss">


.parent {
    position: absolute;
}

//.resume-container {
//    border-width: 1px;
//    border-style: solid;
//    border-color: v-bind(getPrimary);
//    height: calc(100vh - 140px);
//    border-radius: 13px;
//    padding-left-right: 30px;
//
//    //min-height: 900px;
//}

.draggable {
    position: relative;
    user-select: none;
    cursor: move;
}

.resume {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sticky-card {
    position: sticky;
    top: 0;
    z-index: 10; /* Ensure it remains above the content */
}
</style>