<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {Work} from "@/types/resume";
import {useI18n} from "vue-i18n";
import {toast} from "vue-sonner";
import {ref} from "vue";
import _ from 'lodash';
import {storeToRefs} from 'pinia';
import TipTap from "@/components/tiptap/TipTap.vue";
import AiMenu from "@/components/resume-settings/AiMenu.vue";
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import PickDate from "@/components/shared/PickDate.vue";

const {t} = useI18n()
const resumeStore = useResumeStore();

const {resume} = storeToRefs(resumeStore);
const dev_mode = import.meta.env.VITE_DEV_MODE;
const index = ref()
const actionOption = ref<'create' | 'edit' | 'copy'>();

const work_dialog = ref(false);
const work = ref<Work>({} as Work);

// work functions
const OpenWorkDialogAsCreate = () => {
  actionOption.value = 'create';
  work.value = {} as Work;
  work_dialog.value = true
}

// Open dialog with the selected work experience to edit
const OpenWorkDialogAsEdit = (item: Work, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the work experience to avoid auto-updates
  work.value = JSON.parse(JSON.stringify(item)) as Work;
  work_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditWorkExperienceHandle = () => {
  if (work.value.job_title == '' || work.value.job_title == null) {
    toast.error(t('Resumes.experiences.jobTitleEmpty'));
  } else {
    // Update the work experience array only when save is clicked
    resume.value.work[index.value] = JSON.parse(JSON.stringify({...work.value})) as Work;
    work_dialog.value = false;
  }
}

const OpenWorkDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  work.value = _.cloneDeep(item) as Work;
  work_dialog.value = true
}


const DeleteWorkExperienceHandle = (index: number) => {
  // let index = resume.value.work.findIndex((obj: Work) => item.company_name == obj.company_name);
  resume.value.work.splice(index, 1);
  work_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
}
// const CopyWorkExperienceHandle = () => {
//   resume.value.work.push(work.value as Work);
//   work_dialog.value = false;
// }
const CopyWorkExperienceHandle = () => {
  // Create a deep copy of the work.value object
  const newWork = JSON.parse(JSON.stringify(work.value));

  // Push the copied object to the resume.value.work array
  resume.value.work.push(newWork as Work);

  work_dialog.value = false;
};

function CreateWorkExperienceHadle() {
  if (work.value.job_title == '' || work.value.job_title == null) {
    toast.error(t('Resumes.experiences.toasts.jobTitleEmpty'));
  } else if (work.value.company_name == '' || work.value.company_name == null) {
    toast.error(t('Resumes.experiences.toasts.companyNameEmpty'));

  } else {
    resume.value.work.push(work.value);
    console.log(resume.value.work)
    work.value = {} as Work;
    work_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseWorkDialogHandle = () => {
  work.value = {} as Work;
  work_dialog.value = false;
}

</script>

<template>
  <!--work-->
  <section>
    <!--       Work  title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-briefcase-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.experiences.headers.work') }}</h1>
      </v-col>
    </v-row>
    <!--        Work experiences-->
    <v-row>
      <v-col cols="12" v-if="resume">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list-item"
              group
          >
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)" :list="resume.work"
                                ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.work"
                  class="mb-2"
                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :subtitle="item.job_title"
                  :title="item.company_name"
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
                                     @click="OpenWorkDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenWorkDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteWorkExperienceHandle(index)"
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
               v-if="resume?.work?.length <= 0" class="py-6"
               @click="OpenWorkDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenWorkDialogAsCreate" class=" float-right border-primary px-7 " v-else
               style="border-style: dashed"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
      </v-col>
    </v-row>
  </section>

  <draggable-container>

    <v-dialog
        v-model="work_dialog"
        max-width="600"
        class="backdrop"
    >
      <!--      <div style="height: 20px;margin-top: 10px;;border-radius: 20px" class="bg-surface  ">-->

      <!--      </div>-->

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

            <!--          Job name-->
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.experiences.headers.jobTitle') }}</v-label>
              <v-text-field variant="outlined" v-model="work.job_title"
                            :placeholder="t('Resumes.experiences.headers.jobTitle')"
                            color="primary"></v-text-field>
            </v-col>
            <!--company name-->
            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.experiences.headers.companyName') }}</v-label>
              <v-text-field variant="outlined" :placeholder="t('Resumes.experiences.headers.companyName')"
                            v-model="work.company_name"
                            color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.experiences.headers.city') }}</v-label>
              <v-text-field variant="outlined" v-model="work.city" :placeholder="t('Resumes.experiences.headers.city')"
                            color="primary"></v-text-field>
            </v-col>


            <v-col cols="12" md="6" class="py-2">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.experiences.headers.date.start') }}</v-label>
              <PickDate
                  v-model.string="work.start_date"
                  :placeholder="t('Resumes.experiences.placeholders.startDate')"
                  mode="date"

              ></PickDate>
            </v-col>
            <v-col cols="12" md="6" class="py-2">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.experiences.headers.date.end') }}</v-label>
              <PickDate
                  v-model.string="work.end_date"
                  :placeholder="t('Resumes.experiences.placeholders.endDate')"
                  mode="date"

              ></PickDate>
            </v-col>
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.experiences.placeholders.responsibilities') }}
                <AiMenu v-if="dev_mode == 'true'"/>
              </v-label>

              <!--            <v-textarea variant="outlined" rows="4" auto-grow-->
              <!--                        shaped row-height="25" v-model="work.responsibilities" :placeholder="t('Resumes.experiences.placeholders.responsibilities')"-->
              <!--                        color="primary"></v-textarea>-->
              <tip-tap v-model="work.responsibilities"/>
            </v-col>
          </v-row>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Close"
              variant="plain"
              @click="CloseWorkDialogHandle"
          >
            {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateWorkExperienceHadle"
            >
              {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditWorkExperienceHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyWorkExperienceHandle"
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