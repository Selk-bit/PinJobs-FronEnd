<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useI18n} from "vue-i18n";
import {onMounted, ref, watch} from "vue";
import {useTheme} from "vuetify";
import type {Identity, Page, Personnel,} from "@/types/model";
import {storeToRefs} from "pinia";
import CustomAlert from "@/components/shared/CustomAlert.vue";

const theme = useTheme();
const modelStore = useModelStore();
const {model} = storeToRefs(modelStore)
const personnel = ref<Personnel>({} as Personnel);
const {t} = useI18n()

watch(() => model.value.templateData.identity, (newVal) => {
  if(newVal == 'alias') {
    model.value.reference = null;
  }
})
watch(() => model.value.templateData.personnel.name, (newVal) => {
  if(newVal) {
    model.value.templateData.identity = 'alias';
  }
})
onMounted(() => {
  personnel.value = modelStore.model.templateData.personnel;
  model.value.templateData.identity = 'alias' as Identity;
})
</script>

<template>

  <v-row>

    <v-col cols="12" class="d-flex justify-start align-center">
      <v-icon>mdi-book-open-page-variant-outline</v-icon>
      <h1 class="text-h2 font-weight-bold">{{ t('Models.creation.personnel.title') }}</h1>
    </v-col>


    <v-col cols="12" md="12" class="py-0" v-if="personnel">
      <div class="text-h6 mb-2 font-weight-medium">{{ $t('Models.creation.page.options') }}</div>
      <div>
        <v-switch class="my-0 py-0" inset color="primary" v-model="personnel.name"
                  :label="t('Models.creation.personnel.showName')"></v-switch>
        <v-divider></v-divider>
        <v-switch class="my-0 py-0" inset color="primary" v-model="personnel.age"
                  :label="t('Models.creation.personnel.showAge')"></v-switch>
        <v-divider></v-divider>
        <v-switch class="my-0 py-0" inset color="primary" v-model="personnel.city"
                  :label="t('Models.creation.personnel.showCity')"></v-switch>
        <v-divider></v-divider>
        <v-switch class="my-0 py-0" inset color="primary" v-model="personnel.email"
                  :label="t('Models.creation.personnel.showEmail')"></v-switch>
        <v-divider></v-divider>
        <v-switch class="my-0 py-0" inset color="primary" v-model="personnel.phone"
                  :label="t('Models.creation.personnel.showPhone')"></v-switch>
      </div>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <v-expand-transition>
        <div v-if="!personnel?.name">
          <v-col cols="12" class="d-flex justify-start align-center">
            <div class="text-h5 mb-2 font-weight-medium">Alias / Reference</div>

          </v-col>
             <CustomAlert title="" color="info" class="text-body-1 d-flex" :message="t('Models.creation.personnel.alias-tip')" />
          <v-col cols="12">
            <div class="text-body-1 mb-2 font-weight-medium">{{ t('Models.creation.personnel.choose-info') }}</div>
            <v-radio-group
                v-model="model.templateData.identity"
                column>
              <v-radio
                  label="Alias"
                  color="indigo"
                  :value="'alias' as Identity"
              ></v-radio>
              <v-radio
                  :label=" t('Models.creation.personnel.modelReference')"
                  color="indigo"
                  :value="'reference' as Identity"
              ></v-radio>
            </v-radio-group>

          </v-col>
        </div>
      </v-expand-transition>
      <v-expand-transition>
        <v-col v-if="model.templateData.identity == 'reference'">
          <v-label class=" font-weight-medium">{{ t('Models.creation.personnel.reference') }}</v-label>
          <div class="text-subtitle-2 mb-2">
            {{ t('Models.creation.personnel.modelReference') }}
          </div>
          <v-text-field variant="outlined" v-model="model.reference"
                        color="primary" class="text-black" :placeholder="t('Models.creation.personnel.enterReference')"
                        hint="This reference will appear instead of the candidate name"></v-text-field>
        </v-col>

      </v-expand-transition>
    </v-col>


  </v-row>

</template>

<style scoped lang="scss">

</style>