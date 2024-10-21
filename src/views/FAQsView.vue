<script setup lang="ts">
import { ref, computed  } from "vue";
import { useI18n } from 'vue-i18n';
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

const { t } = useI18n();

const faqs = computed(() => [
    {
        title: t('Faqs.question1.title'),
        text: t('Faqs.question1.text')
    },
    {
        title: t('Faqs.question2.title'),
        text: t('Faqs.question2.text')
    },
    {
        title: t('Faqs.question3.title'),
        text: t('Faqs.question3.text')
    },
    {
        title: t('Faqs.question4.title'),
        text: t('Faqs.question4.text')
    }
]);

const page = ref({ title: t('Faqs.title') });

</script>

<template>
    <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
    <v-card rounded="lg" elevation="0">
        <v-card-text class="pt-6">
            <v-row>
                <v-col cols="12">
                    <h3 class="mb-4">{{ $t('Faqs.heading') }}</h3>
                    <p class="mb-2">
                        {{ $t('Faqs.description') }}
                    </p>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels variant="accordion">
                        <v-expansion-panel v-for="(faq, index) in faqs" :key="index" :title="faq.title" :text="faq.text">
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped>
h3 {
    font-size: 1.5rem;
    font-weight: bold;
}

p {
    font-size: 1rem;
}
</style>
