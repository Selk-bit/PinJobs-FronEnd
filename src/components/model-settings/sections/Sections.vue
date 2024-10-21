<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useI18n} from "vue-i18n";
import {onMounted, ref, watch} from "vue";
import type {CompanyLogo, Model,} from "@/types/model";
import {storeToRefs} from "pinia";

const modelStore = useModelStore();
const {t} = useI18n();
const {model} = storeToRefs(modelStore)
const rules = ref(
    {
      required: (value: string) => !!value || 'Field is required',
      counter: (value: string) => value.length <= 13 || 'Max 13 characters',
    }
)

const updateFieldsBasedOnLanguage = () => {
  const lang = modelStore.model.language;
  model.value.templateData.skills.name = lang === 'en' ? 'Skills' : 'Compétences techniques';
  model.value.templateData.certifications.name = lang === 'en' ? 'Certifications' : 'Certifications';
  model.value.templateData.education.name = lang === 'en' ? 'Education' : 'Éducation';
  model.value.templateData.experience.name = lang === 'en' ? 'Experience' : 'Expérience';
  model.value.templateData.volunteering.name = lang === 'en' ? 'Volunteering' : 'Bénévolat';
  model.value.templateData.projects.name = lang === 'en' ? 'Projects' : 'Projets';
  model.value.templateData.references.name = lang === 'en' ? 'References' : 'Références';
  model.value.templateData.interests.name = lang === 'en' ? 'Interests' : 'Intérêts';
  model.value.templateData.languages.name = lang === 'en' ? 'Languages' : 'Langues';
  model.value.templateData.social.name = lang === 'en' ? 'Social' : 'Compétences personnelles';
};

watch(() => modelStore.model.language, (newLang) => {
  updateFieldsBasedOnLanguage();
});
onMounted(() => {

})
</script>

<template>
  <v-row>
    <v-col class="d-flex justify-start align-center">
      <v-icon>mdi-toy-brick-outline</v-icon>
      <h1 class="text-h2 font-weight-bold">{{ t('Models.creation.sections.sectionsTitle') }}</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6">
      <v-list class="mb-2">
<!--        <v-list-subheader>Main</v-list-subheader>-->
        <v-list-item class="mb-2" v-if="model.templateData.certifications">
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.certifications') }}</v-label>
          <v-text-field
              v-model="model.templateData.certifications.name"
              :append-inner-icon="model.templateData.certifications.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.certifications.visible = !model.templateData.certifications.visible"

          ></v-text-field>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.education">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.education') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.education.name"
              :append-inner-icon="model.templateData.education.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.education.visible = !model.templateData.education.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.experience">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.experience') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.experience.name"
              :append-inner-icon="model.templateData.experience.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.experience.visible = !model.templateData.experience.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.volunteering">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.volunteering') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.volunteering.name"
              :append-inner-icon="model.templateData.volunteering.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.volunteering.visible = !model.templateData.volunteering.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.projects">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.projects') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.projects.name"
              :append-inner-icon="model.templateData.projects.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.projects.visible = !model.templateData.projects.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.references">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.references') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.references.name"
              :append-inner-icon="model.templateData.references.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.references.visible = !model.templateData.references.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" md="6">
      <v-list class="mb-1">
<!--        <v-list-subheader>Sidebar</v-list-subheader>-->
        <v-list-item class="mb-1" v-if="model.templateData.interests">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.interests') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.interests.name"
              :append-inner-icon="model.templateData.interests.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.interests.visible = !model.templateData.interests.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.languages">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.languages') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <v-text-field

              v-model="model.templateData.languages.name"
              :append-inner-icon="model.templateData.languages.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.languages.visible = !model.templateData.languages.visible"
              class="pwdInput "
          ></v-text-field>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.skills">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.skills') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.skills.name"
              :append-inner-icon="model.templateData.skills.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.skills.visible = !model.templateData.skills.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
        <v-list-item class="mb-1" v-if="model.templateData.social">
          <v-label class="mb-1 font-weight-medium">{{ t('Models.creation.sections.social') }}</v-label>
<!--              :maxlength="maxLength"-->
<!--              counter-->
          <VTextField

              v-model="model.templateData.social.name"
              :append-inner-icon="model.templateData.social.visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="model.templateData.social.visible = !model.templateData.social.visible"
              class="pwdInput "
          ></VTextField>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>