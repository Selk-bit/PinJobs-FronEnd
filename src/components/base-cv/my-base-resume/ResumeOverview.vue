<template>
    <v-container flui class="py-4">
        <!-- Overview Header -->
        <div style="width: auto" class=" align-center justify-space-between mb-4">
            <div class="d-flex align-center mt-2 mb-4">
                <v-icon small>mdi-clipboard-file-outline</v-icon>
                <h3 class="text-h6 font-weight-bold mr-2">Overview</h3>
            </div>
        </div>
        <v-divider />
        <!-- Cards Section -->
        <v-row class="mb-4 mt-2">
            <!-- New Order -->
            <v-col cols="12" sm="12" md="4" lg="3">
                <v-card elevation="1" min-width="260" variant="elevated"
                        class=" overview-card d-flex flex-column align-start">

                    <v-card-title class="d-flex flex-column justify-start ">
                        <h3 class="text-body-1 font-weight-bold mt-2">Total Educational programs</h3>
                        <p class="text-body-2 text-grey">{{ formations }} <span class="text-subtitle-2">Programs</span>
                        </p>
                    </v-card-title>


                    <v-card-actions>
                        <v-icon class="overview-icon" color="secondary" size="36">mdi-school-outline</v-icon>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="3">
                <v-card elevation="1" min-width="260" variant="elevated"
                        class=" overview-card d-flex flex-column align-start">

                    <v-card-title class="d-flex flex-column justify-start ">
                        <h3 class="text-body-1 font-weight-bold mt-2">Total Work Experience</h3>
                        <p class="text-body-2 text-grey">{{ formations }} <span
                            class="text-subtitle-2">Experiences</span>
                        </p>
                    </v-card-title>

                    <v-card-actions class="d-flex justify-space-between">
                        <v-icon class="overview-icon" color="secondary" size="36">mdi-briefcase-outline</v-icon>
                        <div v-if="yearsOfExperience">
                            {{ yearsOfExperience }} years of experiences
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="3">
                <v-card elevation="1" min-width="260" variant="elevated"
                        class=" overview-card d-flex flex-column align-start">

                    <v-card-title class="d-flex flex-column justify-start ">
                        <h3 class="text-body-1 font-weight-bold mt-2">Total Languages</h3>
                        <p class="text-body-2 text-grey">{{ languages }} <span
                            class="text-subtitle-2">Languages</span>
                        </p>
                    </v-card-title>

                    <v-card-actions class="d-flex justify-space-between">
                        <v-icon class="overview-icon" color="secondary" size="36">mdi-translate</v-icon>

                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="3">
                <v-card elevation="1" min-width="260" variant="elevated"
                        class=" overview-card d-flex flex-column align-start">

                    <v-card-title class="d-flex flex-column justify-start ">
                        <h3 class="text-body-1 font-weight-bold mt-2">Total Skills</h3>
                        <p class="text-body-2 text-grey">{{ skills }} <span
                            class="text-subtitle-2">Skills</span>
                        </p>
                    </v-card-title>

                    <v-card-actions class="d-flex justify-space-between">
                        <v-icon class="overview-icon" color="secondary" size="36">mdi-math-compass</v-icon>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>


    </v-container>
</template>

<script setup lang="ts">

defineProps<{
    experiences: number;
    formations: number;
    skills: number;
    languages: number;
    yearsOfExperience: string;
}>();

</script>

<style>
.contact-card {
    padding: 16px;
}

.contact-card .d-flex {
    justify-content: space-around; /* Spaces email and phone evenly */
}


.overview-card {
    padding: 16px;
}

.text-grey {
    color: #6c757d;
}
</style>
