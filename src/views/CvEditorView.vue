<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useModelStore } from '@/stores/model';
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { modelComponents } from '@/models-imports';
import { useResumeStore } from '@/stores/resume';
import ModelSettings from '@/components/model-settings/ModelSettings.vue';
import { DragZoomContainer, DragZoomItem } from 'vue3-drag-zoom';
import type { Resume } from '@/types/resume';
import { toast } from 'vue-sonner';
import { getPrimary } from '@/utils/UpdateColors';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/user';
import { useSettingStore } from '@/stores/settings';
import { validateLink } from '@/utils/helpers/validate-link';
import type { Template } from '@/types/model';
import ResumeSettings from '@/components/resume-settings/ResumeSettings.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useBaseCvStore } from '@/stores/base-cv';

// const drawer = ref(true)
const settings = useSettingStore();
const transform = ref({ x: 260, y: 20, scale: 0.7 });
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const baseStore = useBaseCvStore();
const cvData = ref<Resume>();
const { mobile, sm, md, xs } = useDisplay();
const { t } = useI18n();
const backBlazeUrl = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);
const tab = ref(false);

function reset() {
    transform.value = { x: 207, y: 12, scale: 0.7 };
}

const notice_for_dummy_data = ref(false);

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

const default_create_model_data = ref<Template>({
    'name': '',
    'reference': null,
    'language': 'fr',
    'templateData': {
        'identity': 'alias',
        'template': 'sydney',
        'company_logo': {
            'url': logo.value as string,
            'border': false,
            'hidden': false,
            'grayscale': false,
            'size': 90,
            'aspectRatio': 1,
            'borderRadius': 50
        },
        'page': {
            'margin': 12,
            'format': 'a4',
            'headline': true,
            'summary': true,
            'breakLine': false,
            'pageNumbers': false
        },
        'certifications': {
            'name': t('Models.creation.sections.certifications', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'education': {
            'name': t('Models.creation.sections.education', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'experience': {
            'name': t('Models.creation.sections.experience', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'volunteering': {
            'name': t('Models.creation.sections.volunteering', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'interests': {
            'name': t('Models.creation.sections.interests', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'languages': {
            'name': t('Models.creation.sections.languages', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'projects': {
            'name': t('Models.creation.sections.projects', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'references': { 'name': t('Models.creation.sections.references'), 'visible': true },
        'skills': {
            'name': t('Models.creation.sections.skills', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'social': {
            'name': t('Models.creation.sections.social', '', { locale: modelStore.model.language }),
            'visible': true
        },
        'theme': {
            'background': '#fff',
            'text': '#2C3E50 ',
            'primary': '#16A085 '
        },
        'personnel': {
            'name': true,
            'phone': true,
            'city': true,
            'age': true,
            'email': true
        },

        'typography': {
            'family': 'open-sans',
            'size': 16,
            'lineHeight': 2,
            'hideIcons': false,
            'underlineLinks': false
        }
    }
});


const isDragModeActive = computed(() => {
    return !mobile.value && settings.dragModel;
});

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
    modelStore.showCreateBtn = true;
    modelStore.showTemplateSection = true;

    try {
        // Fetch CV data
        await baseStore.getCVData();
        if (baseStore.resumeData) {
            const mappedCVData = mapToResumeFormat(baseStore.resumeData);
            resumeStore.setResume(mappedCVData);
        }
        // else {
        //     resumeStore.setResume({ ...dummy_resume_data.value });
        // }

        // Fetch CV model data
        await baseStore.getCVModel();
        if (baseStore.modelData) {
            modelStore.SetModel(baseStore.modelData);
            // modelStore.SetTemplate(baseStore.modelData.templateData.template);
            modelStore.selected = baseStore.modelData.templateData.template;
        } else {
            modelStore.SetModel({ ...default_create_model_data.value });
        }

    } catch (error) {
        console.error('Error loading CV data or model:', error);
        resumeStore.setResume({
            ...dummy_resume_data.value
        });
        modelStore.SetModel({ ...default_create_model_data.value });
    }
});

onMounted(async () => {
    let user: User = await useAuthStore().GET_CURRENT_USER();
    toast.info('Les fausses données sont utilisées pour mieux visualiser les modifications apportées au modèle.', {
        duration: 3000
    });

});


</script>


<template>
    <div>
        <div class="overflow-auto" v-if="!isDragModeActive">
            <div class="resume-page-container mx-auto">
                <component :is="modelComponents[modelStore.selected]"></component>
            </div>
        </div>
        <drag-zoom-container v-else class="resume-container elevation-0" v-model="transform">
            <div class="d-flex justify-center align-center resume-page-container">

                <component class="draggable" :zoom-range="{ max: 0.8, min: 0.5, step: 0.05}"
                           :is="modelComponents[modelStore.selected]"></component>
            </div>
        </drag-zoom-container>

    </div>
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
            <BaseBreadcrumb title="Cv editor" />

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
    <div class="panel text-primary px-4" v-if="!!isDragModeActive">
        <v-btn icon="mdi-magnify-plus-outline" variant="plain" size="20" class="px-4"
               @click="transform.scale += 0.05"></v-btn>
        <v-btn class="px-4" icon="mdi-magnify-minus-outline" variant="text" size="20"
               @click="transform.scale -= 0.05"></v-btn>
        <v-btn class="px-4" size="20" icon="mdi-restart" variant="text" @click="reset"></v-btn>
        <v-btn class="px-4" size="20" icon="mdi-menu" variant="text"
               @click="settings.modelDrawer = !settings.modelDrawer"></v-btn>

    </div>
    <v-dialog v-model="notice_for_dummy_data" max-width="900" class="backdrop">
        <v-card class=" d-flex justify-center align-center ma-3 pa-4  my-6 flex-column" rounded="sm">
            <v-icon size="90" color="success">mdi-check-decagram</v-icon>
            <div class="text-success text-h2 mb-4 ">
                Success!
            </div>
            <v-row>
                <v-col>
                    <v-btn class="mt-4 mr-3" @click="notice_for_dummy_data = false" color="secondary" variant="outlined"
                           rouned="xl">
                        Fermer
                    </v-btn>
                </v-col>
            </v-row>

        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">

.panel {
    z-index: 200;
    position: fixed;
    border: 1px solid #212121;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 0px;
    height: 25px;
    background-color: white;
    width: auto;
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 50px;;
}

.parent {
    position: absolute;
}

.resume-container {
    border-width: 1px;
    border-style: solid;
    border-color: v-bind(getPrimary);
    height: calc(100vh - 140px);
    border-radius: 13px;
    padding-left-right: 30px;

    //min-height: 900px;
}

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