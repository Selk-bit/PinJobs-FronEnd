<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useModelStore } from '@/stores/model';
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { modelComponents } from '@/models-imports';
import { useResumeStore } from '@/stores/resume';
import ModelSettings from '@/components/model-settings/ModelSettings.vue';
import { DragZoomItem } from 'vue3-drag-zoom';
import type { Resume } from '@/types/resume';
import { toast } from 'vue-sonner';
import { getPrimary } from '@/utils/UpdateColors';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/user';
import { useSettingStore } from '@/stores/settings';
import { validateLink } from '@/utils/helpers/validate-link';
import type { Template } from '@/types/model';
import ResumeSettings from '@/components/resume-settings/ResumeSettings.vue';
import { useHomeStore } from '@/stores/home';


// const drawer = ref(true)
const settings = useSettingStore();
const transform = ref({ x: 260, y: 20, scale: 0.7 });
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const homeStore = useHomeStore();
const cvData = ref(null);
const { mobile, sm, md, xs } = useDisplay();
const { t } = useI18n();
const backBlazeUrl = ref(import.meta.env.VITE_BACKBLAZE_ENDPOINT);

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
  "age": "29",
  "city": "Paris",
  "alias": "Demo alias",
  "yoe":"3",
  "name": "John Doe",
  "work": [{
    "city": "Casablanca",
    "end_date": "06/2021",
    "job_title": "Full Stack Developer",
    "start_date": "03/2021",
    "company_name": "GoSoft",
    "responsibilities": "Conception, réalisation et déploiement d'une application web de gestion de stock en utilisant Angular et Laravel pour le développement. Utilisation de PuTTY pour la connexion au VPS et le déploiement de l'application."
  }, {
    "job_title": "Backend Developer",
    "responsibilities": "Développement de services backend robustes, optimisation des performances, et gestion des bases de données. Contribué à l'amélioration des processus CI/CD.",
    "company_name": "SocioTech",
    "city": "Paris",
    "start_date": "03/2023",
    "end_date": "05/2023"
  }],
  "email": "john.doe@gmail.com",
  "phone": "+33 6 12 34 56 78",
  "skills": [
    {"skill": "JavaScript", "level": "5",  "category": "programing languages"},
    {"skill": "Vue.js 3", "level": "5",  "category": "UI Frameworks"
},
    {"skill": "Python", "level": "4",  "category": "programing languages"
},
    {"skill": "NestJS", "level": "5","category": "backend framework"}
  ],
  "social": [
    {"skill": "Communication", "level": "5"},
    {"skill": "Teamwork", "level": "5"},
    {"skill": "Problem-solving", "level": "4"}
  ],
  "projects": [{
    "end_date": "12/2022",
    "start_date": "09/2022",
    "description": "<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul><p><strong>Environnement Technique:</strong> Jira, Confluence, XRay, Postman, Cucumber, Gherkin</p>",
    "project_name": "Réservation des Tickets Busway"
  }, {
    "end_date": "08/2022",
    "start_date": "06/2022",
    "description": "<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul><p><strong>Environnement Technique:</strong> Jira, Confluence, XRay, Postman, Cucumber, Gherkin</p>",
    "project_name": "Cartographie de degré de Centralité dans Paris"
  }, {
    "end_date": "04/2022",
    "start_date": "01/2022",
    "description": "<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul><p><strong>Environnement Technique:</strong> Jira, Confluence, XRay, Postman, Cucumber, Gherkin</p>",
    "project_name": "Application Web pour la gestion de la paie"
  }],
  "interests": [{"interest": "Cuisine"}, {"interest": "Télévision"}, {"interest": "Lecture"}],
  "languages": [
    {"level": "5", "language": "Anglais"},
    {"level": "4", "language": "Français"},
    {"level": "5", "language": "Arabe"}
  ],
  "educations": [{
    "degree": "Ingénierie Logicielle et Intégration des Systèmes Informatiques",
    "end_year": "2021",
    "start_year": "2019",
    "institution": "Faculté des Sciences et Techniques"
  }, {
    "degree": "Licence en Informatique, Réseaux et Multimédia",
    "end_year": "2019",
    "start_year": "2016",
    "institution": "Faculté des Sciences et Techniques"
  }, {
    "degree": "DEUST en Mathématiques, Informatique et Physique",
    "end_year": "2016",
    "start_year": "2014",
    "institution": "Faculté des Sciences et Techniques"
  }, {
    "degree": "Baccalauréat Scientifique",
    "end_year": "2014",
    "start_year": "2012",
    "institution": "Lycée Chahid Idriss Lahrizi"
  }],
  "references": [{
    "name": "Alice Dupont",
    "phone": "+33 6 98 76 54 32",
    "company": "TechCorp",
    "position": "Manager IT",
    "email": "alice.dupont@techcorp.com"
  }],
  "volunteering": [{
    "organization": "SocioTech",
    "position": "Community Support Volunteer",
    "start_date": "03/2023",
    "end_date": "06/2023",
    "description": "<p><strong>Contexte:</strong> Dans un premier temps au sein de l’équipe QA transversale puis après la réorganisation au sein de l’équipe SelfCare (1 Product Owner, 2 développeurs, 1 QA).</p><ul><li>Rédaction des cas de tests : Analyse des US et des critères d’acceptances.</li><li>Création et Réalisation des plans de tests : regroupement des cas de tests utiles pour la validation de la livraison.</li><li>Rédaction de ticket bug : remontées des erreurs aux équipes de développement via des tickets Jira.</li><li>Animation des réunions agiles : préparation de la rétro, animation du daily et de la retro.</li></ul><p><strong>Environnement Technique:</strong> Jira, Confluence, XRay, Postman, Cucumber, Gherkin</p>",
  }],
  "certifications": [
    {
      "certification": "Certified Java Developer",
      "institution": "Oracle",
      "date": "06/2023",
      "link": "https://www.oracle.com/certification/java-certification.html"
    }
  ],
  "headline": "Full Stack Software Developer",
  "summary": "Développeur full-stack avec une forte expérience en conception et déploiement d'applications web robustes. Compétent en JavaScript, Vue.js, Python, et NestJS, avec un engagement à créer des solutions de haute qualité pour les entreprises."
})

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


const isDragModeActive = computed(() => {
    return !mobile.value && settings.dragModel;
});

function mapToResumeFormat(data: any): Resume {
    return {
        cv_id: data.cv_id || '',
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
        social: data.social || [],
    };
}

onBeforeMount(async () => {
    modelStore.showCreateBtn = true;
    modelStore.showTemplateSection = true;
    modelStore.SetModel({ ...default_create_model_data.value, language: '' });
    try {
      cvData.value = await homeStore.getCVData();
      if (cvData.value) {
        const mappedCVData = mapToResumeFormat(cvData.value);
        resumeStore.setResume(mappedCVData);
      } else {
        resumeStore.setResume({ ...dummy_resume_data.value });
      }
    } catch (error) {
      console.error('Error loading CV data:', error);
      resumeStore.setResume({ ...dummy_resume_data.value });
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
    <v-navigation-drawer app :location="settings.drawerPosition" elevation="2" v-model="settings.modelDrawer"
                         :width="xs? 360 : sm ? 400 : md ? 500 : 590">
        <div class="text-3 ma-3">
            Edit your resume data using the relevant sections you need :
        </div>
        <ResumeSettings />
        <div class="text-3 ma-3">
            Customize your template of choice however you wish :
        </div>
        <ModelSettings />
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


</style>