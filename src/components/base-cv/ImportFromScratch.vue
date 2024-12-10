<script setup lang="ts">


import { reactive, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AppLoader from '@/components/shared/AppLoader.vue';
import { toast } from 'vue-sonner';
import { useBaseCvStore } from '@/stores/base-cv';
import { useI18n } from 'vue-i18n';

const baseStore = useBaseCvStore();
const { t } = useI18n();
const openImportCvDialog = () => {
    dialogState.value = true;
};
const app_loading = ref(false);
// upload functions and props
const import_cv_dialog = reactive({
    loading: false,
    dialogTitle: 'Submit Your Resume',
    dialogSubTitle: 'Upload your document in PDF, DOCX format to proceed.',
    clickToUpload: 'Click to upload the file',
    cancelText: 'Cancel',
    importText: 'Generate',
    notEnoughCredits: 'Not enough credits',
    errors: ''
});


interface IProps {
    dialog?: boolean;
    showBtn?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    dialog: false,
    showBtn: false
});

const dialogState = ref(props.dialog);

const emits = defineEmits(['update:dialog']);

watch(() => props.dialog, (newVal) => {
    dialogState.value = newVal;
});

watch(dialogState, (newVal) => {
    emits('update:dialog', newVal);
});
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
            dialogState.value = false;
            app_loading.value = true;

            // import_cv_dialog.loading = true;
            await baseStore.uploadCV(file.value); // Send the request with homeStore
            toast.success(t('Models.consultation.toasts.templateUploadSuccess'));
        } catch (err: any) {
            const errData = err.response?.data;
            console.error('Error uploading CV:', err);
            toast.error('An error occurred while uploading the document.');
        } finally {
            import_cv_dialog.loading = false;
            app_loading.value = false;
        }
    }
}
</script>

<template>
    <v-btn variant="outlined"
           class="ma-2"
           color="success"
       v-if="showBtn"
           @click="openImportCvDialog"
           prepend-icon="mdi-file-document">
        Upload Resume
    </v-btn>
    <!--import cv dialog -->
    <v-dialog v-model="dialogState" class="backdrop" width="700px" persistent>
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
                        <v-chip color="primary" large>
                            <span v-if="file">{{ file?.name }} ({{ (file?.size / 1024).toFixed(2) }} KB)</span>
                            <v-btn icon variant="text" @click="removeFile()">
                                <v-icon color="red">mdi-close</v-icon>
                            </v-btn>
                        </v-chip>
                    </ul>
                </div>
            </v-container>
            <div class="text-center text-body-1 mb-2 text-error" v-if="import_cv_dialog.errors">
                {{ import_cv_dialog.errors }}
            </div>
            <v-divider></v-divider>

            <!-- Actions Section -->
            <v-card-actions>
                <v-btn color="primary" prepend-icon="mdi-arrow-left" @click="dialogState = false">

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
    <AppLoader :loading="app_loading" is-logo />
</template>

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


.upload list,
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