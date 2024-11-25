<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Skill,
} from "@/types/resume";
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {storeToRefs} from 'pinia';
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import _ from "lodash";


const {t, locale} = useI18n();
const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();

const skill_dialog = ref(false);
const skill = ref<Skill>({
  skill: '',
  level: '',
  category: '',
  checked: false,
});
const index = ref()
const selected_category = ref('');
const selected_level = ref('');

watch(selected_level, (val) => {
  if (val == t('other')) {
    skill.value.level = '';
  }
})
watch(selected_category, (val) => {
  if (val == t('other')) {
    skill.value.category = '';
  }
})


// skill functions

const OpenSkillDialogAsCreate = () => {
  skill.value = {
    skill: '',
    level: '',
    category: '',
  }
  selected_level.value = '';
  selected_category.value = '';
  actionOption.value = 'create';
  // skill.value = {} as Skill;
  skill_dialog.value = true
}

const OpenSkillDialogAsEdit = (item: any, itemIndex: number) => {
  index.value = itemIndex

  selected_category.value = item.category;
  actionOption.value = 'edit';
  if (item.level == '') {
    selected_level.value = '';
  }

  skill.value = _.cloneDeep(item) as Skill;
  skill_dialog.value = true
}

const OpenSkillDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  skill.value = _.cloneDeep(item) as Skill;
  skill_dialog.value = true
}

const EditSkillHandle = () => {

  if (skill.value.skill == '' || skill.value.skill == null) {
    toast.error(t('Resumes.skills.headers.skills.toasts.skillEmpty'));
  } else if (selected_category.value == '') {
    toast.error(t('Resumes.skills.headers.skills.toasts.categoryEmpty'));
  } else if (selected_category.value == t('other') && skill.value.category == '') {
    toast.error(t('Resumes.skills.headers.skills.toasts.categoryRequired'));

  }
  // else if (selected_level.value == '') {
  //   toast.error(t('Resumes.languages.toasts.levelEmpty'));
  // } else if (selected_level.value == t('other') && skill.value.level == '') {
  //   toast.error(t('Resumes.languages.toasts.levelEmpty'));
  //
  // }
  else {
    const editedSkill = {
      skill: skill.value.skill,
      level: selected_level.value === t('other') ? skill.value.level : selected_level.value,
      category: selected_category.value === t('other') ? skill.value.category : selected_category.value
    };
    resume.value.skills[index.value] = editedSkill as Skill;
    skill_dialog.value = false;
  }
}

const DeleteSkillHandle = (index: number) => {
  // let index = resume.value.skills.findIndex((obj: Skill) => item.skill == obj.skill);
  resume.value.skills.splice(index, 1);
  skill_dialog.value = false;
}


const CopySkillHandle = () => {
  // Create a deep copy of the skill object with modified skill name
  let copiedSkill = {
    ...skill.value,
    skill: skill.value.skill.concat(' (copy)'),
    level: String(skill.value.level),

  };

  // Push the copied object to the resume.value.skills array
  resume.value.skills.push(copiedSkill);

  skill_dialog.value = false;
}

function CreateSkillHandle() {
  if (skill.value.skill == '' || skill.value.skill == null) {
    toast.error(t('Resumes.skills.headers.skills.toasts.skillEmpty'));
  } else if (selected_category.value == '') {
    toast.error(t('Resumes.skills.headers.skills.toasts.categoryEmpty'));
  } else if (selected_category.value == t('other') && skill.value.category == '') {
    toast.error(t('Resumes.skills.headers.skills.toasts.categoryRequired'));
  }
  // else if (selected_level.value == '') {
  //   toast.error(t('Resumes.languages.toasts.levelEmpty'));
  // } else if (selected_level.value == t('other') && skill.value.level == '') {
  //   toast.error(t('Resumes.languages.toasts.levelEmpty'));
  //
  // }
  else {
    const createdSkill = {
      skill: skill.value.skill,
      level: selected_level.value === t('other') ? skill.value.level : selected_level.value,
      category: selected_category.value === t('other') ? skill.value.category : selected_category.value
    };
    resume.value.skills.push(createdSkill);
    skill.value = {} as Skill;
    skill_dialog.value = false;
  }
}

const CloseSkillDialogHandle = () => {
  skill.value = {} as Skill;
  skill_dialog.value = false;
}
const technicalLevelsFr = [
  {
    "name": "Novice",
    "subtitle": "Peu ou pas d'expérience"
  },
  {
    "name": "Débutant",
    "subtitle": "Connaissances de base, application pratique limitée"
  },
  {
    "name": "Intermédiaire",
    "subtitle": "Compétence opérationnelle, capable de réaliser des tâches de manière autonome"
  },
  {
    "name": "Compétent",
    "subtitle": "Compréhension solide, capable de gérer des tâches complexes"
  },
  {
    "name": "Avancé",
    "subtitle": "Expertise approfondie, performance de haut niveau constante"
  },
  {
    "name": "Expert",
    "subtitle": "Hautement spécialisé, reconnu comme une autorité dans cette compétence"
  },
  {
    "name": t('other'),
    "subtitle": t("otherSubtitle"),
  }
];
const technicalLevelsEn = [
  {
    "name": "Novice",
    "subtitle": "Little to no experience"
  },
  {
    "name": "Beginner",
    "subtitle": "Basic knowledge, limited practical application"
  },
  {
    "name": "Intermediate",
    "subtitle": "Working proficiency, able to complete tasks independently"
  },
  {
    "name": "Proficient",
    "subtitle": "Strong understanding, capable of handling complex tasks"
  },
  {
    "name": "Advanced",
    "subtitle": "In-depth expertise, consistent high-level performance"
  },
  {
    "name": "Expert",
    "subtitle": "Highly specialized, recognized authority in the skill"
  },
  {
    "name": t('other'),
    "subtitle": t("otherSubtitle"),
  }
];

const computedLevels = computed(() => {
  return locale.value == 'en' ? technicalLevelsEn : technicalLevelsFr;
})

const resumeCategories = computed(() => {
  let categories = resume.value.skills.map((item: Skill) => item.category);
  // Remove duplicates by converting to a Set, then back to an array
  categories = [...new Set(categories)];
  // Add the new string (for example, "other") if it's not already in the list
  if (!categories.includes("other")) {
    categories.push(t("other"));
  }
  return categories;
});


</script>

<template>

  <section>
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-ruler-square-compass</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.skills.headers.skills') }}
        </h1>
      </v-col>
    </v-row>
    <!--      skills section -->
    <v-row>
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :list="resume.skills" :key="Math.random().toString(36).substr(2, 9)"
                                ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.skills"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9)+ '_' + index"
                  :title="item.skill"
                  :subtitle="item.category"

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
                                     @click="OpenSkillDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenSkillDialogAsEdit(item, index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteSkillHandle(index as number)"
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
               v-if="resume.skills?.length <= 0" class="py-6"
               @click="OpenSkillDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenSkillDialogAsCreate"
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
  <!--  Skills dialog -->
  <draggable-container>
    <v-dialog
        v-model="skill_dialog"
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
              <v-label class="mb-2 font-weight-medium">{{ t('Resumes.skills.category') }}</v-label>
              <v-select :items="resumeCategories" class="text-capitalize"
                        v-model="selected_category"
                        :menu-props="{ maxHeight:  300 }"
                        color="primary"></v-select>
            </v-col>
            <v-col cols="12" class="py-0" v-if="selected_category == t('other')">
              <v-label class="mb-2 font-weight-medium">{{ t('Resumes.skills.enterCategory') }}</v-label>
              <v-text-field variant="outlined" v-model="skill.category"
                            :placeholder="t('Resumes.skills.category')"
                            color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.skills.headers.skillName') }}</v-label>
              <v-text-field variant="outlined" v-model="skill.skill"
                            :placeholder="t('Resumes.skills.placeholders.skillName')"
                            color="primary"></v-text-field>
            </v-col>
            <!--            level section-->
            <v-col cols="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ t('Resumes.skills.headers.level') }}</v-label>
              <v-select :items="computedLevels" class="text-capitalize"
                        v-model="selected_level"
                        item-title="name"
                        item-value="name"
                        :menu-props="{ maxHeight:  300 }"
                        color="primary"></v-select>
            </v-col>
            <v-col cols="12" class="py-0" v-if="selected_level == t('other')">
              <v-label class="mb-2 font-weight-medium">{{ t("otherSubtitle") }}</v-label>
              <v-text-field variant="outlined" v-model="skill.level"
                            :placeholder="t('Resumes.skills.headers.level')"

                            color="primary"></v-text-field>
            </v-col>
            <!--            <v-col cols="12" class="py-0">-->
            <!--              <v-label class="mb-10 font-weight-medium">{{ $t('Resumes.skills.headers.level') }}</v-label>-->
            <!--              <v-slider-->
            <!--                  v-model="skill.level"-->
            <!--                  show-ticks="always"-->
            <!--                  thumb-label="always"-->
            <!--                  step="1"-->
            <!--                  :max="5"-->
            <!--                  :min="1"-->
            <!--                  color="primary"-->
            <!--                  tick-size="4"-->
            <!--              ></v-slider>-->
            <!--            </v-col>-->
          </v-row>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Close"
              variant="plain"
              @click="CloseSkillDialogHandle"
          > {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateSkillHandle"
            > {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditSkillHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopySkillHandle"
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