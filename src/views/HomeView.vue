<template>
    <div>
        <!--    list of options-->
        <div class="d-flex justify-end">
            <v-btn flat variant="outlined" class="mx-1" icon="mdi-delete" color="error"></v-btn>
            <v-btn flat variant="outlined" class="mx-1" icon="mdi-cloud-download-outline" color="primary"></v-btn>
        </div>
        <v-container fluid class="pa-4">
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
import { computed, reactive, ref } from 'vue';
import HomeCard from '@/components/home/HomeCard.vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import Alert from '@/components/shared/Alert.vue';

const { t } = useI18n();
const router = useRouter();
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
