<template>
    <div>
        <!--    list of options-->
        <div class="d-flex  justify-end">
            <v-btn flat variant="outlined" class="mx-1" @click="isResumeFormatted = !isResumeFormatted"
                   icon="mdi-toggle-switch-outline" color="accent"></v-btn>
            <v-spacer />
            <div v-if="isResumeFormatted">
                <v-btn flat variant="outlined" class="mx-1" icon="mdi-delete" color="error"></v-btn>
                <v-btn flat variant="outlined" class="mx-1" icon="mdi-cloud-download-outline" color="primary"></v-btn>
                <v-btn flat variant="outlined" class="mx-1" icon="mdi-pencil" color="info"></v-btn>
            </div>
        </div>
        <v-container fluid v-if="!isResumeFormatted" class="pa-4">
            <div class="mb-6">

                <h1>Create your own resume</h1>
                <h4>Choose how you want to create or generate your resume</h4>
            </div>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    lg="3"
                >
                    <home-card title="Import a CV" subtitle="Upload an existing resume file for quick customization."
                               icon="mdi-tray-arrow-down" @open="import_cv_dialog.dialog = true" />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    lg="3"
                >
                    <home-card title="Import your LinkedIn profile"
                               @open="import_linkedin.dialog = true"
                               subtitle="Seamlessly convert your LinkedIn data into a professional resume."
                               icon="mdi-linkedin" />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    lg="3"
                >
                    <home-card title="Generate one from a job posting"
                               @open="import_job_description.dialog = true"
                               subtitle="Create a tailored resume based on a job listing."
                               icon="mdi-briefcase-outline" />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    lg="3"
                >
                    <home-card title="Blank CV" @open="generateFromScratch" />
                </v-col>
            </v-row>
        </v-container>
        <div v-else>
            <div class="resume-page-container mx-auto">
                <component :is="modelComponents[modelStore.selected]"></component>
            </div>
        </div>

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


                <span class="pa-0 ma-0">


                  <v-tooltip :text="disableImport ? import_cv_dialog.notEnoughCredits: import_cv_dialog.importText">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="pa-0 ma-0">
                 <v-btn size="large" block :variant="disableImport ? 'tonal': 'elevated' "
                        :disabled="disableImport" color="primary"
                        @click="importFile"
                        :loading="import_cv_dialog.loading"
                 >
                            {{ import_cv_dialog.importText }}
                          </v-btn>

                </span>
              </template>
            </v-tooltip>
                </span>

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


                <span class="pa-0 ma-0">


                  <v-tooltip :text="disableImport ? import_linkedin.notEnoughCredits: import_linkedin.importText">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="pa-0 ma-0">
                 <v-btn size="large" block :variant="disableImport ? 'tonal': 'elevated' "
                        :disabled="disableImport" color="primary"
                        @click="generateFromLinkedIn"
                        :loading="import_linkedin.loading"
                 >
                            {{ import_linkedin.importText }}
                          </v-btn>

                </span>
              </template>
            </v-tooltip>
                </span>

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


                <span class="pa-0 ma-0">


                  <v-tooltip
                      :text="disableImport ? import_job_description.notEnoughCredits: import_job_description.importText">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="pa-0 ma-0">
                 <v-btn size="large" block :variant="disableImport ? 'tonal': 'elevated' "
                        :disabled="disableImport" color="primary"
                        @click="generateFromJobPosting"
                        :loading="import_job_description.loading"
                 >
                            {{ import_job_description.importText }}
                          </v-btn>

                </span>
              </template>
            </v-tooltip>
                </span>

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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import HomeCard from '@/components/home/HomeCard.vue';
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

const { t } = useI18n();
const router = useRouter();
const modelStore = useModelStore();
const resumeStore = useResumeStore();
const isResumeFormatted = ref(false);
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

function generateFromLinkedIn() {
    if (import_linkedin.link == null || import_linkedin.link == '') {
        showUploadError(import_linkedin.errors.linkEmpty);
    } else {
        try {
            import_linkedin.loading = true;
            //     Api call
            toast.success('Data uploaded successfully');
        } catch (err: any) {
            console.log(err);
            toast.error(import_linkedin.errors.unknownError);
        } finally {
            import_linkedin.loading = false;
        }
    }
}


// generate from job description


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

function generateFromJobPosting() {
    if (import_job_description.description == null || import_job_description.description == '') {
        showUploadError(import_job_description.errors.descriptionEmpty);
    } else {
        try {
            import_linkedin.loading = true;
            //     Api call
            toast.success('Data uploaded successfully');
        } catch (err: any) {
            console.log(err);
            toast.error(import_job_description.errors.unknownError);
        } finally {
            import_job_description.loading = false;
        }
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
    console.log(fileName);


    // Check if the file has a valid extension (.pdf, .doc, or .docx)
    if (!file?.value) {
        showUploadError('File required');
    } else if (!(fileName?.endsWith('.pdf') || fileName?.endsWith('.docx'))) {
        showUploadError(t('Models.consultation.toasts.correctFormat'));
    } else {
        try {
            import_cv_dialog.loading = true;
            // await modelStore.UPLOAD_TEMPLATE(importedFileDto.value as ImportedTemplateDTO);
            import_cv_dialog.loading = false;
            import_cv_dialog.dialog = false;
            toast.success(t('Models.consultation.toasts.templateUploadSuccess'));
        } catch (err: any) {
            const errData = err.response.data;
            if (errData.message == 'Client already has an unfinished imported template !') {
                toast.info(t('Models.consultation.toasts.templateAlreadyExist'));
            }
            console.log(err);
        }
        import_cv_dialog.loading = false;
    }
}

const disableImport = computed(() => {
        //   if (user.value) {
        //     return user.value?.credits <= 0;
        //   }
        // }
        return false;
    }
);


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
    'city': 'Paris',
    'alias': 'Demo alias',
    'name': 'John Doe',
    'work': [{
        'city': 'Casablanca',
        'end_date': '06/2021',
        'job_title': 'Full Stack Developer',
        'start_date': '03/2021',
        'company_name': 'GoSoft',
        'responsibilities': 'Conception, réalisation et déploiement d\'une application web de gestion de stock en utilisant Angular et Laravel pour le développement. Utilisation de PuTTY pour la connexion au VPS et le déploiement de l\'application.'
    }, {
        'job_title': 'Backend Developer',
        'responsibilities': 'Développement de services backend robustes, optimisation des performances, et gestion des bases de données. Contribué à l\'amélioration des processus CI/CD.',
        'company_name': 'SocioTech',
        'city': 'Paris',
        'start_date': '03/2023',
        'end_date': '05/2023'
    }],
    'email': 'john.doe@gmail.com',
    'phone': '+33 6 12 34 56 78',
    'skills': [
        { 'skill': 'JavaScript', 'level': '5' },
        { 'skill': 'Vue.js 3', 'level': '5' },
        { 'skill': 'Python', 'level': '4' },
        { 'skill': 'NestJS', 'level': '5' }
    ],
    'social': [
        { 'skill': 'Communication', 'level': '5' },
        { 'skill': 'Teamwork', 'level': '5' },
        { 'skill': 'Problem-solving', 'level': '4' }
    ],
    'projects': [{
        'end_date': '12/2022',
        'start_date': '09/2022',
        'description': 'Application pour la réservation des tickets du Busway, permettant de trouver le plus court chemin et de résoudre le problème d\'encombrement, en utilisant Java et Neo4j.',
        'project_name': 'Réservation des Tickets Busway'
    }, {
        'end_date': '08/2022',
        'start_date': '06/2022',
        'description': 'Réalisation de la cartographie du degré de centralité en se basant sur le trafic avec C et Leaflet.',
        'project_name': 'Cartographie de degré de Centralité dans Paris'
    }, {
        'end_date': '04/2022',
        'start_date': '01/2022',
        'description': 'Gestion de la paie des employés d\'une entreprise, soit en interne soit avec des filiales, en utilisant HTML, CSS, JavaScript, et PHP.',
        'project_name': 'Application Web pour la gestion de la paie'
    }],
    'interests': [{ 'interest': 'Cuisine' }, { 'interest': 'Télévision' }, { 'interest': 'Lecture' }],
    'languages': [
        { 'level': '5', 'language': 'Anglais' },
        { 'level': '4', 'language': 'Français' },
        { 'level': '5', 'language': 'Arabe' }
    ],
    'educations': [{
        'degree': 'Ingénierie Logicielle et Intégration des Systèmes Informatiques',
        'end_year': '2021',
        'start_year': '2019',
        'institution': 'Faculté des Sciences et Techniques'
    }, {
        'degree': 'Licence en Informatique, Réseaux et Multimédia',
        'end_year': '2019',
        'start_year': '2016',
        'institution': 'Faculté des Sciences et Techniques'
    }, {
        'degree': 'DEUST en Mathématiques, Informatique et Physique',
        'end_year': '2016',
        'start_year': '2014',
        'institution': 'Faculté des Sciences et Techniques'
    }, {
        'degree': 'Baccalauréat Scientifique',
        'end_year': '2014',
        'start_year': '2012',
        'institution': 'Lycée Chahid Idriss Lahrizi'
    }],
    'references': [{
        'name': 'Alice Dupont',
        'phone': '+33 6 98 76 54 32',
        'company': 'TechCorp',
        'position': 'Manager IT',
        'email': 'alice.dupont@techcorp.com'
    }],
    'volunteering': [{
        'organization': 'SocioTech',
        'position': 'Community Support Volunteer',
        'start_date': '03/2023',
        'end_date': '06/2023',
        'description': 'Aide et support pour la communauté à travers des sessions d\'apprentissage et d\'accompagnement sur les nouvelles technologies.'
    }],
    'certifications': [
        {
            'certification': 'Certified Java Developer',
            'institution': 'Oracle',
            'date': '06/2023',
            'link': 'https://www.oracle.com/certification/java-certification.html'
        }
    ],
    'headline': 'Full Stack Software Developer',
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


onBeforeMount(() => {

    modelStore.SetModel({ ...default_create_model_data.value, language: '' });
    resumeStore.setResume({ ...dummy_resume_data.value } as unknown as Resume);
});

</script>

<style scoped lang="scss">

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


</style>
