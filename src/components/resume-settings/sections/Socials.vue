<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Skill,
} from "@/types/resume";
import {toast} from "vue-sonner";
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from 'pinia';
import {useI18n} from "vue-i18n";
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import _ from "lodash";


const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();
const {t} = useI18n()
const social_dialog = ref(false);


const social = ref<Skill>({
  skill: '',
  level: '',
});
const index = ref();


watch(social, (val) => {
  if (val.level == '') {
    val.level = '1';
  }
})


// Social section

const OpenSocialDialogAsCreate = () => {
  actionOption.value = 'create';
  social.value = {} as Skill;
  social_dialog.value = true
}

const OpenSocialDialogAsEdit = (item: any, itemIndex: number) => {
  index.value = itemIndex;
  actionOption.value = 'edit';
  social.value = item as Skill;
  social_dialog.value = true
}

const OpenSocialDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  social.value = _.cloneDeep(item) as Skill;
  social_dialog.value = true
}

const EditSocialHandle = () => {
  // let index = resume.value.social.findIndex((obj: Skill) => item.skill == obj.skill);
  resume.value.social[index.value] = JSON.parse(JSON.stringify({...social.value}))
  social_dialog.value = false;
}

const DeleteSocialHandle = (index: number) => {
  // let index = resume.value.social.findIndex((obj: Skill) => item.skill == obj.skill);
  resume.value.social.splice(index, 1);
  social_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
}
// const CopySocialHandle = () => {
//   resume.value.social.push(social.value);
//   social_dialog.value = false;
// }
const CopySocialHandle = () => {
  // Create a deep copy of the social.value object
  const newSocial = JSON.parse(JSON.stringify(social.value));

  // Push the copied object to the resume.value.social array
  resume.value.social.push(newSocial);

  social_dialog.value = false;
};

function CreateSocialHandle() {
  if (social.value.skill == '' || social.value.skill == null) {
    toast.error('social should not be empty');
  } else {
    resume.value.social.push(social.value);
    social.value = {} as Skill;
    social_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseSocialDialogHandle = () => {
  social.value = {} as Skill;
  social_dialog.value = false;
}

</script>

<template>
  <section>
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-account-voice</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.socials.headers.socials') }}</h1>
      </v-col>
    </v-row>
    <!--      socials section -->
    <v-row>
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :list="resume.social" :key="Math.random().toString(36).substr(2, 9)"
                                ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.social"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :title="item.skill"
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
                                     @click="OpenSocialDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenSocialDialogAsEdit(item, index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteSocialHandle(index as number)"
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
               v-if="resume.social?.length <= 0" class="py-6"
               @click="OpenSocialDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenSocialDialogAsCreate"
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

  <!--  Social dialog -->

  <draggable-container>
    <v-dialog
        v-model="social_dialog"
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
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.socials.headers.socialName') }}</v-label>
              <v-text-field variant="outlined" v-model="social.skill"
                            :placeholder="t('Resumes.socials.placeholders.socialName')"
                            color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-label class="mb-10 font-weight-medium">{{ $t('Resumes.skills.headers.level') }}</v-label>
              <v-slider
                  v-model="social.level"
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

          <!--        <small class="text-caption text-medium-emphasis">*indicates required field</small>-->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Close"
              variant="plain"
              @click="CloseSocialDialogHandle"
          > {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateSocialHandle"
            > {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditSocialHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopySocialHandle"
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