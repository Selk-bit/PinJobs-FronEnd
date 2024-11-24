<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import HomeCard from '@/components/base-cv/ImportCard.vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import Alert from '@/components/shared/Alert.vue';
import type { Template } from '@/types/model';
import { useAuthStore } from '@/stores/auth';
import { validateLink } from '@/utils/helpers/validate-link';
import type { Resume } from '@/types/resume';
import { useModelStore } from '@/stores/model';
import { useResumeStore } from '@/stores/resume';
import { modelComponents } from '@/models-imports';
import { useHomeStore } from '@/stores/candidate-space';
import CustomConfirmationDialog from '@/components/shared/CustomConfirmationDialog.vue';
import AppLoader from '@/components/shared/AppLoader.vue';


const { t } = useI18n();
const router = useRouter();
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const isResumeFormatted = ref(false);
const showDeleteCVDialog = ref(false);
const cvData = ref({} as Resume);
const homeStore = useHomeStore();
// Dynamic card texts based on upload state
const cardTexts = reactive({
    import: 'Upload an existing resume file for quick customization.',
    linkedin: 'Seamlessly convert your LinkedIn data into a professional resume.',
    job: 'Create a tailored resume based on a job listing.',
    blank: 'Start from scratch.'
});

// Function to update card texts based on the state
function updateCardTexts(state: 'initial' | 'reupload') {
    const texts = {
        initial: {
            import: 'Upload an existing resume file for quick customization.',
            linkedin: 'Seamlessly convert your LinkedIn data into a professional resume.',
            job: 'Create a tailored resume based on a job listing.',
            blank: 'Start from scratch.'
        },
        reupload: {
            import: 'Re-upload your CV to update the data.',
            linkedin: 'Import a new LinkedIn profile to overwrite existing data.',
            job: 'Generate a new resume based on a different job listing.',
            blank: 'Create a new blank CV to replace the existing one.'
        }
    };
    Object.assign(cardTexts, texts[state]);
}


function editCV() {
//   router.push({ name: 'cv-editor' });
    window.location.href = router.resolve({ name: 'cv-editor' }).href;
}

function confirmDeleteCV() {
    showDeleteCVDialog.value = true;
}

function closeDeleteCVDialog() {
    showDeleteCVDialog.value = false;
}

function deleteCV() {
    // if (!cvId) {
    //     console.error('No CV ID found for deletion.');
    //     return;
    // }
    //
    // homeStore.deleteCV(cvId)
    //     .then(() => {
    //         toast.success('CV deleted successfully.');
    //         closeDeleteCVDialog();
    //         location.reload();
    //     })
    //     .catch((error) => {
    //         console.error('Error deleting CV:', error);
    //         toast.error('Failed to delete CV.');
    //     });
}

//
// function mapToResumeFormat(data: any): Resume {
//     return {
//         cv_id: data.cv_id || '',
//         name: data.name || '',
//         yoe: data.yoe || '',
//         headline: data.headline || '',
//         alias: data.alias || '',
//         imageUrl: data.imageUrl || '',
//         email: data.email || '',
//         phone: data.phone || '',
//         age: data.age || '',
//         city: data.city || '',
//         language: data.language || { language: '', level: '' },
//         summary: data.summary || '',
//         work: data.work || [],
//         educations: data.educations || [],
//         projects: data.projects || [],
//         certifications: data.certifications || [],
//         references: data.references || [],
//         volunteering: data.volunteering || [],
//         interests: data.interests || [],
//         languages: data.languages || [],
//         skills: data.skills || [],
//         social: data.social || []
//     };
// }


// upload functions and props
const import_cv_dialog = reactive({
    dialog: false,
    loading: false,
    dialogTitle: 'Upload and attach cv file',
    clickToUpload: 'Click to upload the file',
    cancelText: 'Cancel',
    importText: 'Upload',
    notEnoughCredits: 'Not enough credits'
});


// generate from linkedIn
const import_linkedin = reactive({
    link: '',
    loading: false,
    dialog: false,
    dialogTitle: 'Upload your linkedIn profile data',
    cancelText: 'Cancel',
    importText: 'Generate',
    notEnoughCredits: 'Not enough credits',
    placeholder: 'https://www.linkedin.com/in/johndoe',
    errors: {
        linkEmpty: 'Link required ',
        unknownError: 'An error occured, try again please'
    }
});

async function generateFromLinkedIn() {
    if (!import_linkedin.link) {
        showUploadError(import_linkedin.errors.linkEmpty);
        return;
    } else if (useAuthStore().user.credits == 0) {
        showUploadError('Youd don\'t have enough credits');
        return;
    }
    try {
        import_linkedin.loading = true;
        await homeStore.importLinkedInProfile(import_linkedin.link);
        toast.success('LinkedIn profile imported successfully');
    } catch (error) {
        toast.error(import_linkedin.errors.unknownError);
    } finally {
        import_linkedin.loading = false;
        import_linkedin.dialog = false;
    }
}


const import_job_description = reactive({
    description: '',
    loading: false,
    dialog: false,
    dialogTitle: 'Generate from job posting',
    cancelText: 'Cancel',
    importText: 'Generate',
    notEnoughCredits: 'Not enough credits',
    placeholder: 'Description',
    errors: {
        descriptionEmpty: 'Description required ',
        unknownError: 'An error occured, try again please'
    }
});

async function generateFromJobPosting() {
    if (!import_job_description.description) {
        showUploadError(import_job_description.errors.descriptionEmpty);
        return;
    } else if (useAuthStore().user.credits == 0) {
        showUploadError('Youd don\'t have enough credits');
        return;
    }
    try {
        import_job_description.loading = true;
        await homeStore.createFromJobDescription(import_job_description.description);
        toast.success('Resume generated from job description');
    } catch (error) {
        toast.error(import_job_description.errors.unknownError);
    } finally {
        import_job_description.loading = false;
        import_job_description.dialog = false;
    }
}


function generateFromScratch() {
    router.push({ name: 'cv-editor' });
}


// import cv file
const fileInput = ref<HTMLInputElement | null>(null);
const file = ref();

// actions
function handleFileChange() {
    file.value = fileInput.value?.files![0];
    console.log(file.value);
}


function onButtonClick() {
    window.addEventListener('focus', () => {
    }, { once: true });
    fileInput.value ? fileInput.value.click() : '';
}

function removeFile() {
    file.value = null;
}

const errorText = ref<string>('');
const showError = ref<boolean>(false);

function showUploadError(text: string) {
    errorText.value = text;
    showError.value = true;
    setTimeout(() => {
        showError.value = false;
        errorText.value = '';
    }, 3000);

}

async function importFile() {
    const fileName = file?.value?.name;
    // Check if the file has a valid extension (.pdf, .doc, or .docx)
    if (useAuthStore().user.credits == 0) {
        showUploadError('Youd don\'t have enough credits');
        return;
    } else if (!file?.value) {
        showUploadError('File required');
    } else if (!(fileName?.endsWith('.pdf') || fileName?.endsWith('.docx'))) {
        showUploadError(t('Models.consultation.toasts.correctFormat'));
    } else {
        try {
            import_cv_dialog.loading = true;
            await homeStore.uploadCV(file.value); // Send the request with homeStore
            import_cv_dialog.dialog = false;
            toast.success(t('Models.consultation.toasts.templateUploadSuccess'));
        } catch (err: any) {
            const errData = err.response?.data;
            if (errData?.message === 'Client already has an unfinished imported template !') {
                toast.info(t('Models.consultation.toasts.templateAlreadyExist'));
            } else {
                console.error('Error uploading CV:', err);
                toast.error('An error occurred while uploading the document.');
            }
        } finally {
            import_cv_dialog.loading = false;
        }
    }
}


// dummy data for test
const backBlazeUrl = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);
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
    'language': 'en',
    'templateData': {
        'identity': 'reference',
        'template': 'sydney',
        'company_logo': {
            'url': logo as unknown as string,
            'border': false,
            'hidden': false,
            'grayscale': false,
            'size': 70,
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
        'certifications': { 'name': t('Models.creation.sections.certifications'), 'visible': true },
        'education': { 'name': t('Models.creation.sections.education'), 'visible': true },
        'experience': { 'name': t('Models.creation.sections.experience'), 'visible': true },
        'volunteering': { 'name': t('Models.creation.sections.volunteering'), 'visible': true },
        'interests': { 'name': t('Models.creation.sections.interests'), 'visible': true },
        'languages': { 'name': t('Models.creation.sections.languages'), 'visible': true },
        'projects': { 'name': t('Models.creation.sections.projects'), 'visible': true },
        'references': { 'name': t('Models.creation.sections.references'), 'visible': true },
        'skills': { 'name': t('Models.creation.sections.skills'), 'visible': true },
        'social': { 'name': t('Models.creation.sections.social'), 'visible': true },
        'theme': {
            'background': '#fff',
            'text': '#972F2F',
            'primary': '#E0D3D3'
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


const app_loading = ref<boolean>(false);


onBeforeMount(async () => {
    try {
        app_loading.value = true;
        // Fetch the CV model
        const modelData = await homeStore.getCVModel();
        if (modelData) {
            modelStore.SetModel(modelData);
            modelStore.selected = modelData.templateData.template;
        } else {
            modelStore.SetModel({ ...default_create_model_data.value, language: '' });
        }

        // Fetch the CV data
        cvData.value = await homeStore.getCVData();
        if (cvData.value) {
            isResumeFormatted.value = true;
            resumeStore.setResume(cvData.value);
            updateCardTexts('reupload');
        } else {
            resumeStore.setResume({ ...dummy_resume_data.value });
            updateCardTexts('initial');
        }
        app_loading.value = false;
    } catch (error) {
        console.error('Error loading data:', error);
        // Set default values if an error occurs
        modelStore.SetModel({ ...default_create_model_data.value, language: '' });
        resumeStore.setResume({
            ...dummy_resume_data.value,
            imageUrl: ''
        });
        updateCardTexts('initial');
    } finally {
        app_loading.value = false;
    }
});


</script>


<template>
    <div v-if="!app_loading">
        <!--    list of options-->
        <div class="d-flex  justify-end">
            <v-btn flat variant="outlined" class="mx-1" @click="isResumeFormatted = !isResumeFormatted"
                   :icon="isResumeFormatted && cvData? 'mdi-file-refresh-outline' : 'mdi-text-box-outline' "
                   color="primary"></v-btn>
            <v-spacer />
            <div v-if="isResumeFormatted && cvData" class="cv-options">
                <v-btn flat variant="tonal" class="mx-1" icon="mdi-delete" color="error"
                       @click="confirmDeleteCV"></v-btn>
                <v-btn flat variant="tonal" class="mx-1"
                >
                    <v-icon class="mr-1">mdi-file-pdf-box</v-icon>
                    Download PDF
                </v-btn>
                <v-btn flat variant="tonal" class="mx-1" color="info"
                       @click="editCV">
                    <v-icon class="mr-1">mdi-note-edit-outline</v-icon>
                    Edit
                </v-btn>
            </div>
        </div>
        <!-- Resume Creation Options -->
        <v-container fluid v-if="!isResumeFormatted" class="home-card-container pa-4">
            <v-row class="justify-center">
                <v-col :cols="cvData ? 4 : 3" :md="cvData ? 3 : 3" sm="6">
                    <home-card title="Import a CV" :subtitle="cardTexts.import" icon="mdi-tray-arrow-down"
                               @open="import_cv_dialog.dialog = true" />
                </v-col>
                <v-col :cols="cvData ? 4 : 3" :md="cvData ? 3 : 3" sm="6">
                    <home-card title="Import your LinkedIn profile" :subtitle="cardTexts.linkedin" icon="mdi-linkedin"
                               @open="import_linkedin.dialog = true" />
                </v-col>
                <v-col :cols="cvData ? 4 : 3" :md="cvData ? 3 : 3" sm="6">
                    <home-card title="Generate one from a job posting" :subtitle="cardTexts.job"
                               icon="mdi-briefcase-outline" @open="import_job_description.dialog = true" />
                </v-col>
                <v-col v-if="!cvData" cols="3" md="3" sm="6">
                    <home-card title="Blank CV" :subtitle="cardTexts.blank" @open="generateFromScratch" />
                </v-col>
            </v-row>

            <!-- Job Search Form (below cards) -->

        </v-container>

        <div v-else>
            <div class="resume-page-container mx-auto">
                <component :is="modelComponents[modelStore.selected]"></component>
            </div>
        </div>

        <CustomConfirmationDialog
            v-if="showDeleteCVDialog"
            :dialog="showDeleteCVDialog"
            title="Confirm CV Deletion"
            text="Are you sure you want to delete your CV?"
            confirm-text-button="Delete"
            cancel-text-button="Cancel"
            @accept="deleteCV"
            @reject="closeDeleteCVDialog"
        />

    </div>

    <!--import cv dialog -->
    <v-dialog v-model="import_cv_dialog.dialog " class="backdrop" width="600px" persistent>

        <v-card class="pa-2 " rounded="lg">
            <v-card-text class="text-h3">{{ import_cv_dialog.dialogTitle }}
            </v-card-text>
            <v-file-input
                class="d-none"
                show-size
                type="file"
                color="secondary"
                ref="fileInput"
                @change="handleFileChange"
                accept=".pdf, .doc, .docx"
                variant="outlined"
            ></v-file-input>
            <v-container>
                <div
                    @click="onButtonClick"
                    class="drag-drop-area"
                    @dragover.prevent
                    @dragenter.prevent
                >
                    <v-icon color="primary" class="mr-2" size="30">mdi-cloud-upload</v-icon>
                    <div>{{ import_cv_dialog.clickToUpload }}</div>
                </div>
                <div v-if="file" class="file-list my-2 ">
                    <!--                <h3>Files ({{ files.length }})</h3>-->
                    <ul class="overflow-y-auto mb-3 " style="max-height: 300px">
                        <li>
                            <span v-if="file">{{ file?.name }} ({{ (file?.size / 1024).toFixed(2) }} KB)</span>
                            <v-btn icon variant="text" @click="removeFile()">
                                <v-icon color="red">mdi-close</v-icon>
                            </v-btn>
                        </li>
                    </ul>
                </div>
            </v-container>
            <v-card-actions class="">
                <v-row class="d-flex justify-center mt-3">
                    <v-col>
                        <v-btn size="large" block variant="outlined" @click="import_cv_dialog.dialog = false">
                            {{ import_cv_dialog.cancelText }}
                        </v-btn>
                    </v-col>
                    <v-col>
                        <div class="pa-0 ma-0">
                            <v-btn size="large" block
                                   color="primary"
                                   variant="outlined"
                                   @click="importFile"
                                   :loading="import_cv_dialog.loading"
                            >
                                {{ import_cv_dialog.importText }}
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <Alert :show="showError" :text="errorText" />
                    </v-col>
                </v-row>
            </v-card-actions>


            <div>

            </div>
        </v-card>
    </v-dialog>
    <!--    linkedin dialog-->
    <v-dialog v-model="import_linkedin.dialog " class="backdrop" width="600px" persistent>

        <v-card class="pa-2 " rounded="lg">
            <v-card-text class="text-h3">{{ import_linkedin.dialogTitle }}
            </v-card-text>

            <VTextField
                prepend-inner-icon="mdi-link"
                v-model="import_linkedin.link"
                class="mb-3 px-2"
                required
                :placeholder="import_linkedin.placeholder"

                hide-details="auto"
            ></VTextField>

            <v-card-actions>
                <v-row class="d-flex justify-center mt-3">
                    <v-col>
                        <v-btn size="large" block variant="outlined" @click="import_linkedin.dialog = false">
                            {{ import_linkedin.cancelText }}
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn size="large" block
                               @click="generateFromLinkedIn"
                               variant="outlined"
                               :loading="import_linkedin.loading"
                        >
                            {{ import_linkedin.importText }}
                        </v-btn>

                    </v-col>
                    <v-col cols="12">

                        <Alert :show="showError" :text="errorText" />
                    </v-col>
                </v-row>
            </v-card-actions>


            <div>

            </div>
        </v-card>
    </v-dialog>
    <!--job description dialog-->
    <v-dialog v-model="import_job_description.dialog " class="backdrop" width="600px" persistent>

        <v-card class="pa-2 overflow-y-auto  " rounded="lg" style="max-height: 300px">
            <v-card-text class="text-h3">{{ import_job_description.dialogTitle }}
            </v-card-text>

            <v-textarea
                prepend-inner-icon="mdi-briefcase-outline"
                v-model="import_job_description.description"
                class="mb-3 px-2"
                required

                clearable
                max-rows="18" rows="6"
                :placeholder="import_job_description.placeholder"
            ></v-textarea>

            <v-card-actions>
                <v-row class="d-flex justify-center mt-3">
                    <v-col>
                        <v-btn size="large" block variant="outlined" @click="import_job_description.dialog = false">
                            {{ import_job_description.cancelText }}
                        </v-btn>
                    </v-col>
                    <v-col>


                        <v-btn size="large" block
                               color="primary"
                               variant="outlined"
                               @click="generateFromJobPosting"
                               :loading="import_job_description.loading"
                        >
                            {{ import_job_description.importText }}
                        </v-btn>


                    </v-col>
                    <v-col cols="12">

                        <Alert :show="showError" :text="errorText" />
                    </v-col>
                </v-row>
            </v-card-actions>


            <div>

            </div>
        </v-card>
    </v-dialog>
    <AppLoader :loading="app_loading" />
</template>


<style scoped lang="scss">

.cv-options {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
    bottom: 20px;
    right: 20px;
    border-radius: 23px;
    padding: 6px;
    z-index: 1000;
}

.drag-drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    height: 100px;

    border-radius: 25px;
    transition: background-color 0.3s;
}

.drag-drop-area:hover {
    background-color: rgba(140, 212, 222, 0.26); /* A lighter shade close to the primary color */
}


//upload list
.file-list ul {

    list-style-type: none;
    padding: 0;
}

.file-list li {
    display: flex;
    border-radius: 20px;
    //border: 1px solid black;
    margin-bottom: 10px;
    border-width: 1px;
    margin-top: 8px;
    border-style: solid;
    border-color: #1ABC9C;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
}

/* Centered and larger text for header titles */
.header-container {
    text-align: center;
    margin-bottom: 1.5rem;
}

.header-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: #333;
}

.header-subtitle {
    font-size: 1.6rem;
    color: #555;
}

/* Container for cards with hover shadow effect */
.home-card-container {
    justify-content: center;
    margin-top: 20px;
}

.v-card {
    border-radius: 15px;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    //background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-height: 180px;
    text-align: center;
}

.v-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
}

/* Job Search Form styling with border for structure */
.job-search-form {
    padding: 10px;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    margin-top: 20px;
}
</style>