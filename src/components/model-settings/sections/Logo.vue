<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {onMounted, onUnmounted, ref} from "vue";
import type {CompanyLogo} from "@/types/model";
import {useI18n} from "vue-i18n";
import Seperator from "@/components/Seperator.vue";
import {storeToRefs} from "pinia";

const modelStore = useModelStore();
const {t} = useI18n();
const {model} = storeToRefs(modelStore);
const company_logo = ref<CompanyLogo>({} as CompanyLogo)

onMounted(() => {
  company_logo.value = model.value.templateData?.company_logo;
})

onUnmounted(() => {
  console.log('leaving page ')

})

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
      <!--        image  -->
      <!--      <v-col class="d-flex" cols="12">-->
      <!--        <v-avatar size="60" class="mr-2">-->
      <!--          <v-icon size="60" v-if="company_logo.url == ''" icon="mdi-account-circle"></v-icon>-->
      <!--          <v-img-->
      <!--              v-else-->
      <!--              alt="company logo here"-->
      <!--              :src="company_logo.url"-->
      <!--          ></v-img>-->
      <!--        </v-avatar>-->
      <!--        <div class="w-100">-->
      <!--          <v-label class="ml-3 font-weight-medium">{{ t('Models.creation.logo.picture') }}</v-label>-->
      <!--          <v-text-field variant="outlined" density="compact" type="text"-->
      <!--                        placeholder="https://..." color="primary"-->

      <!--                        v-model="company_logo.url">-->
      <!--          </v-text-field>-->

      <!--        </div>-->
      <!--      </v-col>-->
      <!--      <v-col cols="12">-->
      <!--        <v-alert-->
      <!--            density="compact"-->
      <!--            type="info"-->
      <!--            variant="outlined"-->
      <!--            class="text-h6"-->
      <!--        >-->
      <!--          {{ t('Models.creation.logo.logoMessage') }}-->
      <!--        </v-alert>-->

      <!--      </v-col>-->
      <!--      <v-col cols="12" md="6" class="py-0">-->
      <!--        <v-label class="mb-2 font-weight-medium">{{ t('Models.creation.logo.borderRadius') }}</v-label>-->
      <!--        <v-text-field variant="outlined" type="number" v-model.number="company_logo.borderRadius"-->
      <!--                      color="primary"></v-text-field>-->
      <!--      </v-col>-->
      <!--          size-->
      <v-col cols="12" md="12" class="py-0">
        <v-label class="mb-2 font-weight-medium">{{ t('Models.creation.logo.size') }}</v-label>
        <!--        <v-text-field variant="outlined" type="number" v-model.number="company_logo.size"-->
        <!--                      color="primary"></v-text-field>-->
        <div class="d-flex ">
          <v-slider v-model.number="company_logo.size" max="110" step="1" min="60"></v-slider>
          <div>
            {{ company_logo.size }}
          </div>

        </div>
      </v-col>

      <v-col cols="12" md="6" class="py-0">
        <v-checkbox
            color="primary"
            v-model="company_logo.hidden"
            :label="t('Models.creation.logo.hidden')"
        ></v-checkbox>

      </v-col>


    </v-row>
  </section>
  <Seperator/>

</template>

<style scoped lang="scss">

</style>