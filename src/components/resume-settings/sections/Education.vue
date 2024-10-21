<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Education,
} from "@/types/resume";
import {useI18n} from "vue-i18n";
import {toast} from "vue-sonner";
import {ref} from "vue";
import {storeToRefs} from 'pinia';
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import PickDate from "@/components/shared/PickDate.vue";

const resumeStore = useResumeStore();
const {t} = useI18n()
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();
const education_dialog = ref(false);
const education = ref<Education>({
  degree: '',
  institution: '',
  start_year: '',
  end_year: '',
});
const index = ref()

// education section
const OpenEducationDialogAsCreate = () => {
  actionOption.value = 'create';
  education.value = {} as Education;
  education_dialog.value = true
}

// Open dialog with the selected education experience to edit
const OpenEducationDialogAsEdit = (item: Education, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the education experience to avoid auto-updates
  education.value = JSON.parse(JSON.stringify(item)) as Education;
  education_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditEducationHandle = () => {
  // Update the education array only when save is clicked
  resume.value.educations[index.value] = JSON.parse(JSON.stringify({...education.value})) as Education;
  education_dialog.value = false;
}

const OpenEducationDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  education.value = item as Education;
  education_dialog.value = true
}


const DeleteEducationHandle = (index: number) => {
  // let index = resume.value.educations.findIndex((obj: Education) => item.degree == obj.degree);
  resume.value.educations.splice(index, 1);
  education_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
}
// const CopyEducationExperienceHandle = () => {
//   resume.value.educations.push(education.value);
//   education_dialog.value = false;
// }
const CopyEducationExperienceHandle = () => {
  // Create a deep copy of the education.value object
  const newEducation = JSON.parse(JSON.stringify(education.value));

  // Push the copied object to the resume.value.educations array
  resume.value.educations.push(newEducation);

  education_dialog.value = false;
};

function CreateEducationHandle() {
  if (education.value.institution == '' || education.value.institution == null) {
    toast.error(t('Resumes.educations.toasts.institutionEmpty'));
  } else if (education.value.degree == '' || education.value.degree == null) {
    toast.error(t('Resumes.educations.toasts.degreeEmpty'));

  } else {

    resume.value.educations.push(education.value);
    education.value = {} as Education;
    education_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseEducationDialogHandle = () => {
  education.value = {} as Education;
  education_dialog.value = false;
}


</script>

<template>
  <!--education-->
  <section>
    <!--       education title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-school-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.educations.headers.education') }}</h1>
      </v-col>
    </v-row>
    <!--        Education section-->
    <v-row>
      <v-col cols="12" v-if="resume">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)"
                                :list="resume.educations" ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.educations"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :title="item.degree"
                  :subtitle="item.institution"
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
                                     @click="OpenEducationDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenEducationDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteEducationHandle(index as number)"
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
               v-if="resume?.educations?.length <= 0" class="py-6"
               @click="OpenEducationDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenEducationDialogAsCreate" class=" float-right border-primary px-7 " v-else
               style="border-style: dashed"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}

        </v-btn>
      </v-col>
    </v-row>
  </section>

  <!--  education dialog-->
  <draggable-container>
    <v-dialog
        v-model="education_dialog"
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

            <!--          Degree name-->
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.educations.headers.degreeName') }}</v-label>
              <v-text-field variant="outlined" v-model="education.degree"
                            :placeholder="t('Resumes.educations.placeholders.degreeName')"
                            color="primary"></v-text-field>
            </v-col>
            <!--company name-->
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.educations.headers.institutionName') }}</v-label>
              <v-text-field variant="outlined" :placeholder="t('Resumes.educations.placeholders.institutionName')"
                            v-model="education.institution"
                            color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.educations.headers.startYear') }}</v-label>

              <PickDate
                  v-model.string="education.start_year"
                  :placeholder="t('Resumes.educations.placeholders.startYear')"
                  mode="date"

              ></PickDate>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.educations.headers.endYear') }}</v-label>
              <PickDate
                  v-model.string="education.end_year"
                  :placeholder="t('Resumes.educations.placeholders.startYear')"
                  mode="date"

              ></PickDate>
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
              @click="CloseEducationDialogHandle"
          >
            {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateEducationHandle"
            >Create
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditEducationHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyEducationExperienceHandle"
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