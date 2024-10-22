<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {useTheme} from "vuetify";
import type {CompanyLogo, Model,} from "@/types/model";


const {t} = useI18n()
const theme = useTheme();
const modelStore = useModelStore();
const model = ref<Model>({} as Model);
const background_menu = ref(false);
const text_menu = ref(false);
const primary_menu = ref(false);

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

const dev_mode =  import.meta.env.VITE_DEV_MODE

onMounted(() => {
  model.value = modelStore.model.templateData;
})
</script>

<template>

  <v-row v-if="model.theme">

    <v-col cols="12" class="d-flex justify-start align-center">
      <v-icon>mdi-palette-outline</v-icon>
      <h1 class="text-h2 font-weight-bold">{{ $t('Models.creation.theme.themeTitle') }}</h1>
    </v-col>

<!--    <v-col cols="12" md="12" class="py-0" v-if="dev_mode == 'true'">-->
<!--      <v-label class="mb-2 font-weight-medium">{{ $t('Models.creation.theme.background') }}</v-label>-->
<!--      <v-text-field-->
<!--          v-model="model.theme.background"-->
<!--          variant="outlined"-->
<!--          color="primary"-->
<!--      >-->
<!--        <template v-slot:prepend-inner>-->
<!--          <v-menu-->
<!--              transition="slide-y-transition"-->
<!--              v-model="background_menu"-->
<!--              location="bottom"-->
<!--              :close-on-content-click="false"-->
<!--          >-->
<!--            <template v-slot:activator="{ props }">-->

<!--              <v-icon-->
<!--                  v-bind="props"-->
<!--                  :color="model.theme.background ? model.theme.background : '#fff'"-->

<!--              >mdi-circle-->
<!--              </v-icon>-->
<!--            </template>-->

<!--            <v-card min-width="300">-->
<!--              <v-color-picker hide-inputs v-model="model.theme.background"></v-color-picker>-->

<!--            </v-card>-->
<!--          </v-menu>-->

<!--        </template>-->
<!--      </v-text-field>-->


<!--    </v-col>-->


    <v-col cols="12" md="12" class="py-0">
      <v-label class="mb-2 font-weight-medium">{{ $t('Models.creation.theme.text') }}</v-label>
      <v-text-field
          v-model="model.theme.text"
          variant="outlined"
          color="primary"
      >
        <template v-slot:prepend-inner>
          <v-menu
              transition="slide-y-transition"
              v-model="text_menu"
              location="bottom"
              :close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">

              <v-icon
                  v-bind="props"
                  :color="model.theme.text ? model.theme.text : '#fff'"

              >mdi-circle
              </v-icon>
            </template>

            <v-card min-width="300">
              <v-color-picker hide-inputs v-model="model.theme.text"></v-color-picker>

            </v-card>
          </v-menu>

        </template>
      </v-text-field>


    </v-col>

        <v-col cols="12" md="12" class="py-0">
      <v-label class="mb-2 font-weight-medium">{{ $t('Models.creation.theme.primary') }}</v-label>
      <v-text-field
          v-model="model.theme.primary"
          variant="outlined"
          color="primary"
      >
        <template v-slot:prepend-inner>
          <v-menu
              transition="slide-y-transition"
              v-model="primary_menu"
              location="bottom"
              :close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">

              <v-icon
                  v-bind="props"
                  :color="model.theme.primary ? model.theme.primary : '#fff'"

              >mdi-circle
              </v-icon>
            </template>

            <v-card min-width="300">
              <v-color-picker hide-inputs v-model="model.theme.primary"></v-color-picker>

            </v-card>
          </v-menu>

        </template>
      </v-text-field>


    </v-col>
  </v-row>

</template>

<style scoped lang="scss">
.template-image {
  -webkit-transition: all 300ms 0ms ease-in-out;
  transition: all 300ms 0ms ease-in-out;
  border: none;

}


.selected {
  border: 1px solid black;
}


</style>