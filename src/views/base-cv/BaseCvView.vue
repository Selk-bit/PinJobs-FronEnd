<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import noBaseCv from '@/assets/images/illustrations/no-cv-base.svg';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import Alert from '@/components/shared/Alert.vue';
import type { Template } from '@/types/model';
import { useAuthStore } from '@/stores/auth';
import { validateLink } from '@/utils/helpers/validate-link';
import type { Resume } from '@/types/resume';
import { useModelStore } from '@/stores/model';
import { useResumeStore } from '@/stores/resume';
import { useBaseCvStore } from '@/stores/base-cv';
import CustomConfirmationDialog from '@/components/shared/CustomConfirmationDialog.vue';
import AppLoader from '@/components/shared/AppLoader.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingFlash from '@/components/shared/LoadingFlash.vue';


const { t } = useI18n();
const router = useRouter();
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const isResumeFormatted = ref(false);
const showDeleteCVDialog = ref(false);
const loading = ref(false);
const cvData = ref({} as Resume);
const baseStore = useBaseCvStore();


// Dynamic card texts based on upload state
const cardTexts = reactive({
    import: 'Upload an existing resume file for quick customization.',
    linkedin: 'Seamlessly convert your LinkedIn data into a professional resume.',
    job: 'Create a tailored resume based on a job listing.',
    blank: 'Start from scratch.'
});


// upload functions and props
const import_cv_dialog = reactive({
    dialog: false,
    loading: false,
    dialogTitle: 'Submit Your Resume',
    dialogSubTitle: 'Upload your document in PDF, DOCX format to proceed.',
    clickToUpload: 'Click to upload the file',
    cancelText: 'Cancel',
    importText: 'Generate',
    notEnoughCredits: 'Not enough credits',
    errors: ''
});

const openImportCvDialog = () => {
    import_cv_dialog.dialog = true;
};

// generate from linkedIn
const import_linkedin = reactive({
    link: '',
    loading: false,
    dialog: false,
    dialogTitle: 'Connect your LinkedIn profile',
    dialogSubTitle: 'Effortlessly import your professional details and let your experience speak for itself.',
    cancelText: 'Cancel',
    importText: 'Generate',
    notEnoughCredits: 'Not enough credits',
    placeholder: 'https://www.linkedin.com/in/johndoe',
    errors: ''
});

const openImportLinkedInDialog = () => {
    import_linkedin.dialog = true;
};

async function generateFromLinkedIn() {
    if (!import_linkedin.link) {
        import_linkedin.errors = 'LinkedIn profile link is required';
        return;
    } else if (useAuthStore().user.credits == 0) {
        import_linkedin.errors = 'You don\'t have enough credits';
        return;
    }
    try {
        import_linkedin.loading = true;
        await baseStore.importLinkedInProfile(import_linkedin.link);
        toast.success('LinkedIn profile imported successfully');
    } catch (error) {
        import_linkedin.errors = 'Unknown error occured';
    } finally {
        import_linkedin.loading = false;
        import_linkedin.dialog = false;
    }
}


async function generateFromScratch() {
    // app_loading.value = true;
    loading.value = true;
    await router.push({ name: 'cv-editor' });
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
    if (useAuthStore().user.credits == 0) {
        import_cv_dialog.errors = 'You don\'t have enough credits';
        return;
    } else if (!file?.value) {
        import_cv_dialog.errors = 'File required';
    } else if (!(fileName?.endsWith('.pdf') || fileName?.endsWith('.docx'))) {
        import_cv_dialog.errors = t('Models.consultation.toasts.correctFormat');
    } else {
        try {
            import_cv_dialog.loading = true;
            await baseStore.uploadCV(file.value); // Send the request with homeStore
            import_cv_dialog.dialog = false;
            toast.success(t('Models.consultation.toasts.templateUploadSuccess'));
        } catch (err: any) {
            const errData = err.response?.data;
            console.error('Error uploading CV:', err);
            toast.error('An error occurred while uploading the document.');
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


const app_loading = ref<boolean>(false);


onMounted(async () => {
    try {
        app_loading.value = true;
        await baseStore.getCVData();
        app_loading.value = false;
    } catch (err: any) {
        console.log(err);
    } finally {

        app_loading.value = false;
    }
});

onUnmounted(() => {
    app_loading.value = false;

});




const resumeData = ref({
  age: "29",
  imageUrl: "",
  city: "Paris",
  alias: "Demo alias",
  yoe: "4",
  name: "John Doe",
  work: [
    {
      city: "Casablanca",
      end_date: "2019",
      start_date: "Depuis Décembre",
      job_title: "Ingénieur Devops",
      company_name: "SOCIETE GENERALE",
      responsibilities:
        "<ul><li>Provisioning de l’infrastructure (Infra-as-code) : Terraform</li><li>Assurer l’intégration continue des différents projets et le déploiement continu depuis l’environnement de Dev au Production (Github Actions, Hooks, Jenkins, gradle, Nexus, Consul, PostgresSql, Ansible, AWS, Python, Bash, traefik, Vault, Gradle, Scrum, Kanban)</li><li>Intégration et Déploiement du Socle WSO2 pour la gestion d’authentification, OTP, Token</li><li>Monitoring des services (Elasticsearch, Kibana, Filebeat, Heartbeat, Grafana, Loki)</li><li>Assurer le Run des projets (Checkly)</li></ul>",
    },
    {
      job_title: "Backend Developer",
      responsibilities:
        "Développement de services backend robustes, optimisation des performances, et gestion des bases de données. Contribué à l'amélioration des processus CI/CD.",
      company_name: "SocioTech",
      city: "Paris",
      start_date: "03/2023",
      end_date: "05/2023",
    },
  ],
  email: "john.doe@gmail.com",
  phone: "+33 6 12 34 56 78",
  skills: [
    { skill: "JavaScript", level: "Advanced", category: "programming languages" },
    { skill: "Vue.js 3", level: "Advanced", category: "UI Frameworks" },
  ],
  languages: [
    { level: "Exceptional", language: "Anglais" },
    { level: "Advanced", language: "Français" },
    { level: "Exceptional", language: "Arabe" },
  ],
  certifications: [
    {
      certification: "Certified Java Developer",
      institution: "Oracle",
      date: "06/2023",
      link: "https://www.oracle.com/certification/java-certification.html",
    },
  ],
  headline: "Ingénieur Prod/Devops ",
  summary:
    "Développeur full-stack avec une forte expérience en conception et déploiement d'applications web robustes.",
});
</script>


<template>
    <v-container>
        <!--        header-->
        <PageHeader title="Resume Data Hub"
                    subtitle="Seamlessly manage, update, and showcase your resume data with ease.">

            <template v-slot:actions>
                <v-btn
                    class="ml-auto mr-1"
                    color="primary"
                    large
                    v-if="false"
                    :block="$vuetify.display.mobile"
                    outlined
                >
                    update resume
                </v-btn>
            </template>
        </PageHeader>

        <!--        main-->

        <div class="" v-if="!app_loading">
           <v-container>
    <v-card class="mb-4 mx-auto" max-width="1000" elevation="3">
      <v-card-title>
        <v-avatar size="80">
          <v-img :src="resumeData.imageUrl || 'https://via.placeholder.com/80'" />
        </v-avatar>
        <div class="ml-4">
          <h2 class="mb-1">{{ resumeData.name }}</h2>
          <span class="text-subtitle-1 text-grey-darken-1">{{ resumeData.headline }}</span>
        </div>
      </v-card-title>
      <v-card-subtitle>
        <v-chip-group>
          <v-chip>{{ resumeData.city }}</v-chip>
          <v-chip>{{ resumeData.age }} years old</v-chip>
          <v-chip>{{ resumeData.yoe }} years of experience</v-chip>
        </v-chip-group>
      </v-card-subtitle>
      <v-card-text>
        <p>{{ resumeData.summary }}</p>
        <v-divider class="my-3"></v-divider>
        <div>
          <strong>Recent Work:</strong>
          <p>
            {{ resumeData.work[0].job_title }} at {{ resumeData.work[0].company_name }}
            ({{ resumeData.work[0].start_date }} - {{ resumeData.work[0].end_date }})
          </p>
        </div>
        <div>
          <strong>Top Skills:</strong>
          <ul>
            <li v-for="(skill, index) in resumeData.skills.slice(0, 3)" :key="index">
              {{ skill.skill }} ({{ skill.level }})
            </li>
          </ul>
        </div>
        <div>
          <strong>Languages:</strong>
          <ul>
            <li v-for="(lang, index) in resumeData.languages.slice(0, 2)" :key="index">
              {{ lang.language }} ({{ lang.level }})
            </li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
        </div>

        <div v-else class="no-cv-found d-flex mt-14 pa-3 flex-column align-center">
            <!--            icon-->
            <img :src="noBaseCv" height="170" alt="no base resume">
            <!--            <v-icon size="80" color="grey100">mdi-file-document-outline</v-icon>-->
            <div class="text-h1 font-weight-light mt-8 text-grey100">
                No base resume found
            </div>
            <div style="font-size: 2.3rem" class=" mt-5  kalam">
                choose your favorite way to upload your resume
            </div>
            <!--            Call to action-->
            <div class="">
                <v-btn variant="outlined"
                       class="ma-2"
                       color="success"
                       @click="openImportCvDialog"
                       prepend-icon="mdi-file-document">
                    Upload Resume
                </v-btn>
                <v-btn variant="outlined"
                       @click="openImportLinkedInDialog"
                       class="ma-2" color="info" prepend-icon="mdi-linkedin">
                    Connect LinkedIn
                </v-btn>
                <v-btn variant="outlined"
                       @click="generateFromScratch"
                       class="ma-2" color="primary"
                       :loading="loading"
                       prepend-icon="mdi-file-edit-outline">
                    Create from
                    scratch
                </v-btn>
            </div>
            <div class="kalam">
                inspired by Salim
            </div>
        </div>
    </v-container>

    <!--import cv dialog -->
    <v-dialog v-model="import_cv_dialog.dialog" class="backdrop" width="700px" persistent>
        <v-card class="pa-2" rounded="lg">
            <v-card-title class="d-flex pa-3 text-wrap text-center align-center flex-column justify-space-between">
                <div class="text-h4">{{ import_cv_dialog.dialogTitle }}</div>
                <div class="text-body-1">
                    {{ import_cv_dialog.dialogSubTitle }}
                </div>
            </v-card-title>
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
            <div class="text-center text-body-1 mb-2 text-error" v-if="import_cv_dialog.errors">
                {{ import_cv_dialog.errors }}
            </div>
            <v-divider></v-divider>

            <!-- Actions Section -->
            <v-card-actions>
                <v-btn color="primary" prepend-icon="mdi-arrow-left" @click="import_cv_dialog.dialog = false">

                    {{ import_cv_dialog.cancelText }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-creation" variant="outlined" color="primary" @click="importFile"
                       :loading="import_cv_dialog.loading">
                    {{ import_cv_dialog.importText }}
                </v-btn>
            </v-card-actions>

            <div>

            </div>
        </v-card>
    </v-dialog>
    <!--    linkedin dialog-->
    <v-dialog v-model="import_linkedin.dialog " class="backdrop" width="700px" persistent>

        <v-card class="pa-2 " rounded="lg">
            <v-card-title class="d-flex pa-3 text-wrap text-center align-center flex-column justify-space-between">
                <div class="text-h4">{{ import_linkedin.dialogTitle }}</div>
                <div class="text-body-1">
                    {{ import_linkedin.dialogSubTitle }}
                </div>
            </v-card-title>
            <VTextField
                prepend-inner-icon="mdi-linkedin"
                v-model="import_linkedin.link"
                class="mb-6  px-2"
                required
                :error-messages="import_linkedin.errors"
                :placeholder="import_linkedin.placeholder"

                hide-details="auto"
            ></VTextField>

            <v-divider></v-divider>

            <!-- Actions Section -->
            <v-card-actions>
                <v-btn prepend-icon="mdi-arrow-left" color="primary" @click="import_linkedin.dialog = false">
                    {{ import_linkedin.cancelText }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" prepend-icon="mdi-creation" variant="outlined" @click="generateFromLinkedIn"
                       :loading="import_linkedin.loading">
                    {{ import_linkedin.importText }}
                </v-btn>
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


.upload list
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

</style>