<script setup lang="ts">
import { ref } from 'vue';
import type { CompanyLogo } from '@/types/model';
import { useI18n } from 'vue-i18n';
import Seperator from '@/components/Seperator.vue';
import { useResumeStore } from '@/stores/resume';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const company_logo = ref<CompanyLogo>({} as CompanyLogo);
const resumeStore = useResumeStore();
const { model } = storeToRefs(resumeStore);


</script>

<template>
    <!--    company logo-->
    <section>
        <!--    logo  title-->
        <v-row>
            <v-col class="d-flex justify-start align-center">
                <v-icon>mdi-image-outline</v-icon>
                <h1 class="text-h2 font-weight-bold">{{ t('Models.creation.logo.logoTitle') }}</h1>
            </v-col>
        </v-row>
        <!--        basics info-->
        <v-row class="mt-2 p-0">

            <v-col cols="12" md="12" class="py-0">
                <v-label class="mb-2 font-weight-medium">{{ t('Models.creation.logo.size') }}</v-label>
                <!--        <v-text-field variant="outlined" type="number" v-model.number="company_logo.size"-->
                <!--                      color="primary"></v-text-field>-->
                <div class="d-flex ">
                    <v-slider v-model.number="model.templateData.company_logo.size" max="110" step="1" min="60"></v-slider>
                    <div>
                        {{ model.templateData.company_logo.size }}
                    </div>

                </div>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
                <v-checkbox
                    color="primary"
                    v-model="model.templateData.company_logo.hidden"
                    :label="t('Models.creation.logo.hidden')"
                ></v-checkbox>

            </v-col>


        </v-row>
    </section>
    <Seperator />

</template>

<style scoped lang="scss">

</style>