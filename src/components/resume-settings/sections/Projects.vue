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
import {onMounted, ref} from "vue";
import {storeToRefs} from 'pinia';
import TipTap from "@/components/tiptap/TipTap.vue";
import AiMenu from "@/components/resume-settings/AiMenu.vue";
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import PickDate from "@/components/shared/PickDate.vue";

const resumeStore = useResumeStore();
const {t} = useI18n();
const actionOption = ref<'create' | 'edit' | 'copy'>();
const project_dialog = ref(false);
const dev_mode = import.meta.env.VITE_DEV_MODE;
const {resume} = storeToRefs(resumeStore);
const project = ref<Project>({
  project_name: '',
  description: '',
  start_date: '',
  end_date: '',
});
const index = ref();

// project section
const OpenProjectDialogAsCreate = () => {
  actionOption.value = 'create';
  project.value = {} as Project;
  project_dialog.value = true
}

// Open dialog with the selected project to edit
const OpenProjectDialogAsEdit = (item: Project, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the project to avoid auto-updates
  project.value = JSON.parse(JSON.stringify(item)) as Project;
  project_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditProjectHandle = () => {
  // Update the project array only when save is clicked
  resume.value.projects[index.value] = JSON.parse(JSON.stringify({...project.value})) as Project;
  toast.success(t('Resumes.toasts.itemCreated'));
  project_dialog.value = false;
}
const OpenProjectDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  project.value = item as Project;
  project_dialog.value = true
}


const DeleteProjectHandle = (index: number) => {
  // let index = resume.value.projects.findIndex((obj: Project) => item.project_name == obj.project_name);
  resume.value.projects.splice(index, 1);
  project_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'))
}
// const CopyProjectHandle = () => {
//   resume.value.projects.push(project.value);
//   project_dialog.value = false;
// }

const CopyProjectHandle = () => {
  // Create a deep copy of the project.value object
  const newProject = JSON.parse(JSON.stringify(project.value));

  // Push the copied object to the resume.value.projects array
  resume.value.projects.push(newProject);

  project_dialog.value = false;
};

function CreateProjectHandle() {
  if (project.value.project_name == '' || project.value.project_name == null) {
    toast.error(t('Resumes.projects.toasts.nameEmpty'));
  } else {

    resume.value.projects.push(project.value);
    project.value = {} as Project;
    project_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseProjectDialogHandle = () => {
  project.value = {} as Project;
  project_dialog.value = false;
}

</script>

<template>
  <!--project-->
  <section>
    <!--       projects title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-puzzle-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.projects.headers.project') }}</h1>
      </v-col>
    </v-row>
    <!--        Projects section -->
    <v-row v-if="resume">
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)" :list="resume.projects"
                                ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.projects"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :title="item.project_name"

              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1" style="cursor: move" class="handle">
                    <v-icon>mdi-drag</v-icon>
                  </v-avatar>
                </template>
                <template v-slot:subtitle>
                  <div v-html="item.description"></div>
                </template>
                <template v-slot:append>
                  <v-btn size="30" icon variant="plain" class="mt-1">
                    <v-avatar size="22">
                      <DotsVerticalIcon size="20"/>
                    </v-avatar>
                    <v-menu activator="parent">
                      <v-list>
                        <v-list-item value="action" hide-details
                                     @click="OpenProjectDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenProjectDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteProjectHandle(index as number)"
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
               v-if="resume?.projects?.length <= 0" class="py-6"
               @click="OpenProjectDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenProjectDialogAsCreate" class=" border-primary float-right px-7 " v-else
               style="border-style: dashed"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
      </v-col>
    </v-row>
  </section>
  <!--  project dialog-->
  <draggable-container>
    <v-dialog
        v-model="project_dialog"
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
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.projects.headers.projectName') }}</v-label>
              <v-text-field variant="outlined" v-model="project.project_name"
                            :placeholder="t('Resumes.projects.placeholders.projectName')"
                            color="primary"></v-text-field>
            </v-col>


            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.projects.headers.startDate') }}</v-label>

              <PickDate
                  v-model.string="project.start_date"
                  :placeholder="t('Resumes.projects.placeholders.startDate')"
                  mode="date"

              ></PickDate>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.projects.headers.endDate') }}</v-label>

              <PickDate
                  v-model.string="project.end_date"
                  :placeholder="t('Resumes.projects.placeholders.endDate')"
                  mode="date"

              ></PickDate>
            </v-col>

            <!--company name-->
            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.projects.headers.description') }}
                <AiMenu v-if="dev_mode == 'true'"/>
              </v-label>
              <!--            <v-textarea variant="outlined" rows="4" auto-grow-->
              <!--                        shaped row-height="25" v-model="project.description"-->
              <!--                        :placeholder="t('Resumes.projects.placeholders.description')"-->
              <!--                        color="primary"></v-textarea>-->
              <tip-tap v-model="project.description"/>
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
              @click="CloseProjectDialogHandle"
          >{{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateProjectHandle"
            >Create
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditProjectHandle"
            >{{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyProjectHandle"
            >{{ $t('Resumes.actions.duplicate') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </draggable-container>
</template>

<style scoped lang="scss">

</style>