<template>
  <v-card class="ma-1 pa-5" elevation="0" variant="elevated">
    <v-card-title class="text-h5">{{ selectedPack?.price }}</v-card-title>
    <v-card-subtitle>Pack Details</v-card-subtitle>
    <v-row class="d-flex" justify="space-between">
    <v-col cols="12" md="auto" sm="6" lg="auto">
      <v-list-item>
        <v-list-item-title>CV Personalisation:</v-list-item-title>
        <v-list-item-subtitle class="text-h5">{{ selectedPack?.cv_personalisation + ' ' + t('credit.label') }}</v-list-item-subtitle>
      </v-list-item>
    </v-col>
    <v-col cols="12" md="auto" sm="6" lg="auto">
      <v-list-item>
        <v-list-item-title>CV Translation:</v-list-item-title>
        <v-list-item-subtitle class="text-h5">{{ selectedPack?.cv_translation + ' ' + t('credit.label') }}</v-list-item-subtitle>
      </v-list-item>
    </v-col>
    <v-col cols="12" md="auto" sm="6" lg="auto">
      <v-list-item>
        <v-list-item-title>Content Generation:</v-list-item-title>
        <v-list-item-subtitle class="text-h5">{{ selectedPack?.content_generation + ' ' + t('credit.label') }}</v-list-item-subtitle>
      </v-list-item>
    </v-col>
    <v-col cols="12" md="auto" sm="6" lg="auto">
      <v-list-item>
        <v-list-item-title>CV Tech:</v-list-item-title>
        <v-list-item-subtitle class="text-h5">{{ selectedPack?.cvtech + ' ' + t('credit.label') }}</v-list-item-subtitle>
      </v-list-item>
    </v-col>
    <v-col cols="12" md="auto" sm="6" lg="auto">
      <v-list-item>
        <v-list-item-title>Import CV:</v-list-item-title>
        <v-list-item-subtitle class="text-h5">{{ selectedPack?.import_cv }}</v-list-item-subtitle>
      </v-list-item>
    </v-col>
  </v-row>
  </v-card>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {useCreditsStore} from "@/stores/purchase-credit";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const {credits, packs} = storeToRefs(useCreditsStore())
const {t} =useI18n()
const selectedPack = computed(() => {
  if (credits.value >= 11 && credits.value <= 30) {
    return packs.value.find(pack => pack.id === 2);
  } else if (credits.value > 30 && credits.value <= 500) {
    return packs.value.find(pack => pack.id === 3);
  } else if(credits.value >= 500 ) {
    return packs.value.find(pack => pack.id === 4);
  }
})

</script>

<style scoped>
.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  margin-bottom: 20px;
}
</style>
