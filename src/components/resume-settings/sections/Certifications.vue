<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import {useI18n} from "vue-i18n";
import type {
  Certification,
  Education,
  Interest,
  Language, Project,
  Reference,
  Resume,
  Skill,
  Volunteering,
  Work
} from "@/types/resume";
import {toast} from "vue-sonner";
import {ref} from "vue";
import {storeToRefs} from 'pinia';
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import PickDate from "@/components/shared/PickDate.vue";
import _ from "lodash";


const {t} = useI18n()

const resumeStore = useResumeStore();

const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();

const certification_dialog = ref(false);
const certification = ref<Certification>({
  certification: '',
  institution: '',
  date: '',
  link: '',
});
const index = ref()

// certifications section
const OpenCertificationDialogAsCreate = () => {
  actionOption.value = 'create';
  certification.value = {} as Certification;
  certification_dialog.value = true
}

const OpenCertificationDialogAsEdit = (item: Certification, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the certification to avoid auto-updates
  certification.value = JSON.parse(JSON.stringify(item)) as Certification;
  certification_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditCertificationHandle = () => {
  // Update the certification array only when save is clicked
  resume.value.certifications[index.value] = JSON.parse(JSON.stringify({...certification.value})) as Certification;
  certification_dialog.value = false;
}

const OpenCertificationDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  certification.value = _.cloneDeep(item) as Certification;
  certification_dialog.value = true
}


const DeleteCertificationHandle = (index: number) => {
  // let index = resume.value.certifications.findIndex((obj: Certification) => item.certification == obj.certification);
  resume.value.certifications.splice(index, 1);
  certification_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
}
// const CopyCertificationHandle = () => {
//   resume.value.certifications.push(certification.value);
//   certification_dialog.value = false;
// }

const CopyCertificationHandle = () => {
  // Create a deep copy of the certification.value object
  const newCertification = JSON.parse(JSON.stringify(certification.value));

  // Push the copied object to the resume.value.certifications array
  resume.value.certifications.push(newCertification);

  certification_dialog.value = false;
};

function CreateCertificationHandle() {
  if (certification.value.certification == '' || certification.value.certification == null) {
    toast.error(t('Resumes.certifications.toasts.nameEmpty'));
  } else if (certification.value.institution == '' || certification.value.institution == null) {
    toast.error(t('Resumes.certifications.toasts.institutionEmpty'));
  } else {

    resume.value.certifications.push(certification.value);
    certification.value = {} as Certification;
    certification_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseCertificationDialogHandle = () => {
  certification.value = {} as Certification;
  certification_dialog.value = false;
}

</script>

<template>

  <!--certification-->
  <section>
    <!--        Certification title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-certificate-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.certifications.headers.certifications') }}</h1>
      </v-col>
    </v-row>
    <!--      Certification section -->
    <v-row v-if="resume">
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)"
                                :list="resume.certifications" ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.certifications"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9)+ '_' + index"
                  :title="item.certification"
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
                                     @click="OpenCertificationDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenCertificationDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteCertificationHandle(index as number)"
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
               v-if="resume?.certifications?.length <= 0" class="py-6"
               @click="OpenCertificationDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenCertificationDialogAsCreate"
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

  <!--  certification dialog-->
  <draggable-container>
    <v-dialog
        v-model="certification_dialog"
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
              <v-label class="mb-2 font-weight-medium">{{
                  $t('Resumes.certifications.headers.certificationName')
                }}
              </v-label>
              <v-text-field variant="outlined" v-model="certification.certification"
                            :placeholder="t('Resumes.certifications.placeholders.certificationName')"
                            color="primary"></v-text-field>
            </v-col>
            <!--company name-->
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{
                  $t('Resumes.certifications.headers.institutionName')
                }}
              </v-label>
              <v-text-field variant="outlined" :placeholder="t('Resumes.certifications.placeholders.institutionName')"
                            v-model="certification.institution"
                            color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.certifications.headers.date') }}</v-label>
              <PickDate
                  v-model.string="certification.date"
                  :placeholder="t('Resumes.certifications.placeholders.date')"
                  mode="date"

              ></PickDate>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.certifications.headers.link') }}</v-label>
              <v-text-field variant="outlined" v-model="certification.link"
                            :placeholder="t('Resumes.certifications.placeholders.link')"
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
              @click="CloseCertificationDialogHandle"
          >
            {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateCertificationHandle"
            >
              {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditCertificationHandle"
            >
              {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyCertificationHandle"
            >
              {{ $t('Resumes.actions.duplicate') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </draggable-container>
</template>

<style scoped lang="scss">

</style>