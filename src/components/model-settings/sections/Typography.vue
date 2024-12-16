<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {useTheme} from "vuetify";
import type {Model,} from "@/types/model";
import CustomAlert from "@/components/shared/CustomAlert.vue";


const {t} = useI18n()
const theme = useTheme();
const resumeStore = useResumeStore();
const model = ref<Model>({} as Model);

const fonts = ref([
  // 'anton',
  'lato',
  'poppins',
  'josefin',
  'kalam',
  'open-sans',
  'roboto-mono',
  'oswald',
  'montserrat',
  'raleway',
  'nova',
  'inter',
  'dm-sans',
  'nunito',
  'ubuntu',
  'jetbrains',
  'fira',
  'rubik',
  'dm-mono',

]);


onMounted(() => {
  model.value = resumeStore.model.templateData;
})
</script>

<template>

  <v-row>

    <v-col cols="12" class="d-flex justify-start align-center">
      <v-icon>mdi-format-letter-case</v-icon>
      <h1 class="text-h2 font-weight-bold">{{ $t('Models.creation.typography.typographyTitle') }}</h1>
    </v-col>

    <v-col cols="12" md="6" v-for="item in fonts" :key="item">
      <v-card class="py-3 text-center elevation-0 text-capitalize"
              :class="[model.typography?.family == item ? 'selected' : '',item]"
              variant="outlined" @click="resumeStore.setFontFamily(item)">{{ item }}
      </v-card>
    </v-col>
    <v-col cols="12" md="12" class="py-0" v-if="model.typography">
      <div class="text-h6 mb-2 font-weight-medium">{{ $t('Models.creation.typography.fontSize') }}</div>
      <div class="d-flex">
        <v-slider
            color="primary"
            max="18"
            step="0.1"
            v-model="model.typography.size"
        ></v-slider>
        <div>
          {{ model.typography.size }}
        </div>
      </div>
    </v-col>
    <v-row no-gutters>
      <v-col class="ma-2">
        <CustomAlert title="Top fonts" color="primary" :message="t('Models.creation.typography.fontsMessage')"/>
      </v-col>
    </v-row>
  </v-row>

</template>

<style scoped lang="scss">
.template-image {
  -webkit-transition: all 300ms 0ms ease-in-out;
  transition: all 300ms 0ms ease-in-out;
  border: none;

}

.template-image:hover {
}

.selected {
  border: 1px solid darkcyan;
}

.title {
  display: block;

  margin: auto;

  flex: 1;
  bottom: 0;
  display: grid;
  justify-content: center;
  align-content: center;
}

.template-image-selected {

  border: 2px solid black;
  -webkit-transform: scale(0.99);
  transform: scale(0.99);
}
</style>