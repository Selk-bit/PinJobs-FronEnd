<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useBaseCvStore } from '@/stores/base-cv';
import { reactive, ref, watch } from 'vue';
import { toast } from 'vue-sonner';


const baseStore = useBaseCvStore();

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

</script>

<template>
    <!--    linkedin dialog-->
    <v-btn variant="outlined"
           @click="openImportLinkedInDialog"
           class="ma-2" color="info" prepend-icon="mdi-linkedin">
        Connect LinkedIn
    </v-btn>
    <v-dialog v-model="import_linkedin.dialog" class="backdrop" width="700px" persistent>

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
</template>

<style scoped lang="scss">

</style>