<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useI18n} from "vue-i18n";
import { onMounted, ref} from "vue";
import {useTheme} from "vuetify";
import type { Page,} from "@/types/model";

const theme = useTheme();
const modelStore = useModelStore();
const page = ref<Page>({} as Page);
const {t} =useI18n()
const fonts = ref([
  'anton',
  'lato',
  'poppins',
  'josefin',
  'kalam',
  'open-sans',
  'roboto-mono',
  'oswald',
]);

const format = [
  {name: 'Letter', value: 'letter'},
  {name: 'A4', value: 'a4'},

]


onMounted(() => {
  page.value = modelStore.model.templateData.page;
})
</script>

<template>

  <v-row>

    <v-col cols="12" class="d-flex justify-start align-center">
      <v-icon>mdi-book-open-page-variant-outline</v-icon>
      <h1 class="text-h2 font-weight-bold">{{ $t('Models.creation.page.pageTitle') }}</h1>
    </v-col>


<!--    <v-col cols="12" md="12" class="py-0" v-if="page">-->
<!--      <div class="text-h6 mb-2 font-weight-medium">Format</div>-->
<!--      <v-select-->
<!--          :items="format"-->
<!--          item-title="name"-->
<!--          item-value="value"-->
<!--          v-model="page.format"-->
<!--          variant="outlined"-->
<!--      ></v-select>-->
<!--    </v-col>-->


    <v-col cols="12" md="12" class="py-0" v-if="page">
      <div class="text-h6 mb-2 font-weight-medium">{{ $t('Models.creation.page.options') }}</div>
      <div>
        <v-switch class="my-0 py-0" inset color="primary" v-model="page.headline"
                  :label="t('Models.creation.page.showHeadline')"></v-switch>
        <v-switch inset class="my-0 py-0" color="primary" v-model="page.summary"
                  :label="t('Models.creation.page.showSummary')"></v-switch>
      </div>
    </v-col>
  </v-row>

</template>

<style scoped lang="scss">

</style>