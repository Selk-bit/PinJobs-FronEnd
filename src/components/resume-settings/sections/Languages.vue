<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Language,
} from "@/types/resume";
import {toast} from "vue-sonner";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from 'pinia';
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import _ from "lodash";


const {t} = useI18n();
const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();

const language_dialog = ref(false);
const language = ref<Language>({
  language: '',
  level: '',
});
const index = ref()


watch(language, (val) => {
  if (val.level == '') {
    val.level = '1';
  }
})
// Languages section
const OpenLanguageDialogAsCreate = () => {
  language.value = {level: '1', language: ''};
  actionOption.value = 'create';
  language.value = {} as Language;
  language_dialog.value = true
}

// Open dialog with the selected language to edit
const OpenLanguageDialogAsEdit = (item: Language, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the language to avoid auto-updates
  language.value = JSON.parse(JSON.stringify(item)) as Language;
  language_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditLanguageHandle = () => {
  // Construct the edited language object with correct types
  let editedLanguage = {
    language: language.value.language,
    level: String(language.value.level) // Ensure level is string
  };

  // Update the language array only when save is clicked
  resume.value.languages[index.value] = editedLanguage as Language;
  language_dialog.value = false;
}

const OpenLanguageDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  language.value = _.cloneDeep(item) as Language;
  language_dialog.value = true
}



const DeleteLanguageHandle = (index:number) => {
  // let index = resume.value.languages.findIndex((obj: Language) => item.language == obj.language);
  resume.value.languages.splice(index, 1);
  language_dialog.value = false;
}
// const CopyLanguageHandle = () => {
//   let copiedLanguage = {language: language.value.language.concat(' (copy)'), level: String(language.value.level)}
//   resume.value.languages.push(copiedLanguage);
//   language_dialog.value = false;
// }

const CopyLanguageHandle = () => {
  // Create a deep copy of the language object with modified language name
  let copiedLanguage = {
    language: language.value.language.concat(' (copy)'),
    level: String(language.value.level)
  };

  // Push the copied object to the resume.value.languages array
  resume.value.languages.push(copiedLanguage);

  language_dialog.value = false;
}

function CreateLanguageHandle() {
  if (language.value.language == '' || language.value.language == null) {
    toast.error(t('Resumes.languages.toasts.languageEmpty'));
  } else {
    let createdLanguage = {language: language.value.language, level: String(language.value.level)}
    resume.value.languages.push(createdLanguage);
    language.value = {} as Language;
    language_dialog.value = false;
  }

}

const CloseLanguageDialogHandle = () => {
  language.value = {} as Language;
  language_dialog.value = false;
}

</script>

<template>
  <section>
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-translate</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.languages.headers.languages') }}</h1>
      </v-col>
    </v-row>
    <!--      languages section -->
    <v-row>
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)" :list="resume.languages" ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.languages"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :title="item.language"

              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1" style="cursor: move" class="handle">
                    <v-icon>mdi-drag</v-icon>
                  </v-avatar>
                   <v-icon class="mx-0" v-if="Number(item.level) > 1">mdi-check</v-icon>
                </template>

                <template v-slot:append>
                  <v-btn size="30" icon variant="plain" class="mt-1">
                    <v-avatar size="22">
                      <DotsVerticalIcon size="20"/>
                    </v-avatar>
                    <v-menu activator="parent">
                      <v-list>
                        <v-list-item value="action" hide-details
                                     @click="OpenLanguageDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenLanguageDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteLanguageHandle(index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-trash-can-outline</v-icon>
                            {{ $t('Resumes.actions.delete') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-btn>
                </template>
              </v-list-item>
            </vue-draggable-next>
          </v-slide-y-transition>
        </v-list>
      </v-col>
      <v-col cols="12">
        <v-btn block
               variant="outlined"
               v-if="resume.languages?.length <= 0" class="py-6"
               @click="OpenLanguageDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenLanguageDialogAsCreate"
               v-else
                    class="border-primary float-right px-7 "
               style="border-style: dashed "
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
      </v-col>
    </v-row>
  </section>

  <!--  languages dialog-->
<draggable-container>
    <v-dialog
      v-model="language_dialog"
      max-width="600"
       class="backdrop"
  >


    <v-card

    >
      <v-card-title class="my-2  d-flex justify-space-between">
          <div>

          <v-icon>mdi-plus</v-icon>
            {{
        t('Resumes.actions.newItem')
            }}
          </div>
           <v-avatar color="grey-lighten-1" style="cursor: move" class="vss-movable">
                    <v-icon>mdi-drag</v-icon>
                  </v-avatar>
        </v-card-title>
      <v-card-text>
        <v-row dense>
          <!--          name-->
          <v-col cols="12" class="py-0">
            <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.languages.headers.languageName') }}</v-label>
            <v-text-field variant="outlined" v-model="language.language"
                          placeholder="ex: English"
                          color="primary"></v-text-field>
          </v-col>
          <!--           <v-col cols="12" class="py-0">-->
          <!--            <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.skills.headers.level') }}</v-label>-->
          <!--            <v-text-field variant="outlined" v-model="language.level"-->
          <!--                          color="primary"></v-text-field>-->
          <!--          </v-col>-->
          <v-col cols="12" class="py-0">
            <v-label class="mb-10 font-weight-medium">{{ $t('Resumes.languages.headers.level') }}</v-label>
            <v-slider
                  v-model="language.level"
                  show-ticks="always"
                  thumb-label="always"
                  step="1"
                  :max="5"
                  :min="1"
                  color="primary"
                  tick-size="4"
              ></v-slider>
          </v-col>
        </v-row>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text="Close"
            variant="plain"
            @click="CloseLanguageDialogHandle"
        > {{ $t('Resumes.actions.close') }}
        </v-btn>

        <div>
          <v-btn
              v-if="actionOption == 'create'"
              color="primary"
              variant="tonal"
              @click="CreateLanguageHandle"
          > {{ $t('Resumes.actions.create') }}
          </v-btn>
          <v-btn
              v-else-if="actionOption == 'edit'"
              color="primary"
              variant="tonal"
              @click="EditLanguageHandle"
          > {{ $t('Resumes.actions.edit') }}
          </v-btn>
          <v-btn
              v-else
              color="primary"
              variant="tonal"
              @click="CopyLanguageHandle"
          > {{ $t('Resumes.actions.duplicate') }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</draggable-container>

</template>

<style scoped lang="scss">

</style>