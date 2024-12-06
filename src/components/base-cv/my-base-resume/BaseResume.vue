<script setup lang="ts">

import ProfileHeader from '@/components/base-cv/my-base-resume/ProfileHeader.vue';
import ResumeDownloadCard from '@/components/base-cv/my-base-resume/ResumeDownloadCard.vue';
</script>

<template>
    <div>
<!--        <v-row>-->
<!--            &lt;!&ndash; Header &ndash;&gt;-->
<!--            <v-col cols="12" class=" d-flex justify-space-between align-center mb-4 ">-->
<!--                <h2 class="text-h5 font-weight-bold mt-2 ml-3">My base resume</h2>-->
<!--            </v-col>-->
<!--        </v-row>-->

        <v-row >
            <v-col cols="12" lg="12">
                <ProfileHeader />
            </v-col>
            <v-col cols="12" lg="12">
                <ResumeDownloadCard />
            </v-col>

        </v-row>
    </div>
</template>

<style scoped lang="scss">

</style>