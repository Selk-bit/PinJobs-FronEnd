<script setup lang="ts">
import Seperator from '@/components/Seperator.vue';
import Basics from '@/components/resume-settings/sections/Basics.vue';
import Work from '@/components/resume-settings/sections/Work.vue';
import Education from '@/components/resume-settings/sections/Education.vue';
import Projects from '@/components/resume-settings/sections/Projects.vue';
import References from '@/components/resume-settings/sections/References.vue';
import Interests from '@/components/resume-settings/sections/Interests.vue';
import Languages from '@/components/resume-settings/sections/Languages.vue';
import Skills from '@/components/resume-settings/sections/Skills.vue';
import Socials from '@/components/resume-settings/sections/Socials.vue';
import Certifications from '@/components/resume-settings/sections/Certifications.vue';
import Volunteering from '@/components/resume-settings/sections/Volunteering.vue';


</script>

<template>
    <div class="bg-surface elevation-0 pa-1  mb-4">

        <!--    <Seperator/>-->
        <v-expansion-panels
            variant="popout"
            class="elevation-0 "
        >

             <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.basics.basicsTitle') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Basics class="mb-1" />
                </v-expansion-panel-text>
            </v-expansion-panel>


            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.experiences.headers.work') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Work class="mb-1" />
                </v-expansion-panel-text>
            </v-expansion-panel>



            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.educations.headers.education') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Education class="mb-1" />
                </v-expansion-panel-text>
            </v-expansion-panel>



            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.projects.headers.project') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Projects class="mb-1" />
                </v-expansion-panel-text>
            </v-expansion-panel>



            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.certifications.headers.certifications') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Certifications />
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.references.headers.reference') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <References class="mb-1" />
                </v-expansion-panel-text>
            </v-expansion-panel>


            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.volunteering.headers.volunteering') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Volunteering class="mb-1" />

                </v-expansion-panel-text>
            </v-expansion-panel>


            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.interests.headers.interests') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Interests class="mb-1" />


                </v-expansion-panel-text>
            </v-expansion-panel>


            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.languages.headers.languages') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Languages class="mb-1" />


                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.skills.headers.skills') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Skills class="mb-1" />


                </v-expansion-panel-text>
            </v-expansion-panel>


            <v-expansion-panel class="mb-1">
                <v-expansion-panel-title>{{ $t('Resumes.socials.headers.socials') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <Socials class="mb-1" />
                </v-expansion-panel-text>
            </v-expansion-panel>


        </v-expansion-panels>

        <!--    <Seperator/>-->
        <!--        <Education class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <Projects class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <Certifications class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <References class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <Volunteering class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <Interests class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <Languages class="mb-1" />-->
        <!--    <Seperator/>-->
        <!--        <Skills class="mb-1" />-->
        <!--    <Seperator/>-->
<!--        <Socials class="mb-1" />-->
    </div>


</template>

<style scoped lang="scss">


</style>

