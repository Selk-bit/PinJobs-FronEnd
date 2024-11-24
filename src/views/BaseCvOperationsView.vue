<script setup lang="ts">

</script>

<template>
<!--    <div>-->
<!--        <div class="bd cv-options">-->
<!--            <v-btn flat variant="tonal" class="mx-1" icon="mdi-delete" color="error"></v-btn>-->
<!--            <v-btn flat variant="tonal" class="mx-1"-->
<!--            >-->
<!--                <v-icon class="mr-1">mdi-file-pdf-box</v-icon>-->
<!--                Download PDF-->
<!--            </v-btn>-->
<!--            <v-btn flat variant="tonal" class="mx-1" color="info"-->
<!--            >-->
<!--                <v-icon class="mr-1">mdi-note-edit-outline</v-icon>-->
<!--                Edit-->
<!--            </v-btn>-->
<!--        </div>-->
<!--        <v-container fluid  class="home-card-container  pa-4">-->
<!--            <v-row class="justify-center">-->
<!--                <v-col :cols="cvData ? 4 : 3" :md="cvData ? 3 : 3" sm="6">-->
<!--                    <home-card title="Import a CV" :subtitle="cardTexts.import" icon="mdi-tray-arrow-down"-->
<!--                               @open="import_cv_dialog.dialog = true" />-->
<!--                </v-col>-->
<!--                <v-col :cols="cvData ? 4 : 3" :md="cvData ? 3 : 3" sm="6">-->
<!--                    <home-card title="Import your LinkedIn profile" :subtitle="cardTexts.linkedin" icon="mdi-linkedin"-->
<!--                               @open="import_linkedin.dialog = true" />-->
<!--                </v-col>-->
<!--                <v-col :cols="cvData ? 4 : 3" :md="cvData ? 3 : 3" sm="6">-->
<!--                    <home-card title="Generate one from a job posting" :subtitle="cardTexts.job"-->
<!--                               icon="mdi-briefcase-outline" @open="import_job_description.dialog = true" />-->
<!--                </v-col>-->
<!--                <v-col  cols="3" md="3" sm="6">-->
<!--                    <home-card title="Blank CV" :subtitle="cardTexts.blank" @open="generateFromScratch" />-->
<!--                </v-col>-->
<!--            </v-row>-->
<!--        </v-container>-->


<!--         <CustomConfirmationDialog-->
<!--            v-if="showDeleteCVDialog"-->
<!--            :dialog="showDeleteCVDialog"-->
<!--            title="Confirm CV Deletion"-->
<!--            text="Are you sure you want to delete your CV?"-->
<!--            confirm-text-button="Delete"-->
<!--            cancel-text-button="Cancel"-->
<!--        />-->
<!--    </div>-->
</template>

<style scoped lang="scss">

</style>