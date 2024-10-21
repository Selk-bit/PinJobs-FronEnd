<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useI18n} from "vue-i18n";
import { onMounted, ref} from "vue";
import {useTheme} from "vuetify";
import type { Page,} from "@/types/model";
import type {Language} from "@/types/language";
import {storeToRefs} from "pinia";

const theme = useTheme();
const modelStore = useModelStore();
const {model} = storeToRefs(modelStore)
// const language = ref<Language>('');
const {t} =useI18n()




onMounted(() => {
  // language.value = modelStore.model.language;
})
</script>

<template>

  <v-row>

    <v-col cols="12" class="d-flex justify-start align-center">
      <v-icon>mdi-translate</v-icon>
      <h1 class="text-h2 font-weight-bold">Language</h1>
    </v-col>
    <v-col cols="12">
            <v-radio-group
                v-model="model.language"
                column>
              <v-radio
                  label="FR"
                  color="indigo"
                  value="fr"
              ></v-radio>
              <v-radio
                  label="EN"
                  color="indigo"
                  value="en"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <Seperator/>
  </v-row>

</template>

<style scoped lang="scss">

</style>