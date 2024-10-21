<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Interest,
} from "@/types/resume";
import {toast} from "vue-sonner";
import {ref} from "vue";
import {storeToRefs} from 'pinia';
import {useI18n} from "vue-i18n";
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import _ from "lodash";

const {t} = useI18n()
const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();

const interest_dialog = ref(false);
const interest = ref<Interest>({
  interest: '',
});
const index = ref();


// interests section
const OpenInterestDialogAsCreate = () => {
  actionOption.value = 'create';
  interest.value = {} as Interest;
  interest_dialog.value = true
}

// Open dialog with the selected interest to edit
const OpenInterestDialogAsEdit = (item: Interest, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the interest to avoid auto-updates
  interest.value = JSON.parse(JSON.stringify(item)) as Interest;
  interest_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditInterestHandle = () => {
  // Update the interest array only when save is clicked
  resume.value.interests[index.value] = JSON.parse(JSON.stringify({...interest.value})) as Interest;
  interest_dialog.value = false;
}

const OpenInterestDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  interest.value = _.cloneDeep(item) as Interest;
  interest_dialog.value = true
}


const DeleteInterestHandle = (index: number) => {
  // let index = resume.value.interests.findIndex((obj: Interest) => item.interest == obj.interest);
  resume.value.interests.splice(index, 1);
  interest_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
}
// const CopyInterestHandle = () => {
//   resume.value.interests.push(interest.value);
//   interest_dialog.value = false;
// }
const CopyInterestHandle = () => {
  // Create a deep copy of the interest.value object
  const newInterest = JSON.parse(JSON.stringify(interest.value));

  // Push the copied object to the resume.value.interests array
  resume.value.interests.push(newInterest);

  interest_dialog.value = false;
};

function CreateInterestHandle() {
  if (interest.value.interest == '' || interest.value.interest == null) {
    toast.error(t('Resumes.interests.toasts.interestEmpty'));
  } else {
    resume.value.interests.push(interest.value);
    interest.value = {} as Interest;
    interest_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseInterestDialogHandle = () => {
  interest.value = {} as Interest;
  interest_dialog.value = false;
}

</script>

<template>
  <section>
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-gamepad-variant-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.interests.headers.interests') }}</h1>
      </v-col>
    </v-row>
    <!--      Interests section -->
    <v-row>
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)" :list="resume.interests"
                                ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.interests"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :title="item.interest"

              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1" style="cursor: move" class="handle">
                    <v-icon>mdi-drag</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn size="30" icon variant="plain" class="mt-1">
                    <v-avatar size="22">
                      <DotsVerticalIcon size="20"/>
                    </v-avatar>
                    <v-menu activator="parent">
                      <v-list>
                        <v-list-item value="action" hide-details
                                     @click="OpenInterestDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenInterestDialogAsEdit(item, index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteInterestHandle(index as number)"
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
               v-if="resume.interests?.length <= 0" class="py-6"
               @click="OpenInterestDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenInterestDialogAsCreate"
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
  <!--  interests dialog-->
  <draggable-container>
    <v-dialog
        v-model="interest_dialog"
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
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.interests.headers.interestName') }}</v-label>
              <v-text-field variant="outlined" v-model="interest.interest"
                            :placeholder="t('Resumes.interests.placeholders.interestName')"
                            color="primary"></v-text-field>
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
              @click="CloseInterestDialogHandle"
          > {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateInterestHandle"
            > {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditInterestHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyInterestHandle"
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