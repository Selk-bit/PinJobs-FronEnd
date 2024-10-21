<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Volunteering,
} from "@/types/resume";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {toast} from "vue-sonner";
import {storeToRefs} from 'pinia';
import TipTap from "@/components/tiptap/TipTap.vue";
import AiMenu from "@/components/resume-settings/AiMenu.vue";
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import {useDisplay} from "vuetify";
import PickDate from "@/components/shared/PickDate.vue";
import _ from "lodash";


const {mdAndUp} = useDisplay();
const {t} = useI18n();
const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();
const dev_mode = import.meta.env.VITE_DEV_MODE;
const volunteering_dialog = ref(false);
const volunteering = ref<Volunteering>({
  organization: '',
  position: '',
  description: '',
  start_date: '',
  end_date: '',
});

const index = ref();

// volunteering section
const OpenVolunteeringDialogAsCreate = () => {
  actionOption.value = 'create';
  volunteering.value = {} as Volunteering;
  volunteering_dialog.value = true
}

// Open dialog with the selected volunteering experience to edit
const OpenVolunteeringDialogAsEdit = (item: Volunteering, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the volunteering experience to avoid auto-updates
  volunteering.value = JSON.parse(JSON.stringify(item)) as Volunteering;
  volunteering_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditVolunteeringHandle = () => {
  // Update the volunteering array only when save is clicked
  resume.value.volunteering[index.value] = JSON.parse(JSON.stringify({...volunteering.value})) as Volunteering;
  volunteering_dialog.value = false;
}


const OpenVolunteeringDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  volunteering.value = _.cloneDeep(item) as Volunteering;
  volunteering_dialog.value = true
}




const DeleteVolunteeringHandle = (index:number) => {
  // let index = resume.value.volunteering.findIndex((obj: Volunteering) => item.position == obj.position);
  resume.value.volunteering.splice(index, 1);
  volunteering_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
}
// const CopyVolunteeringHandle = () => {
//   resume.value.volunteering.push(volunteering.value);
//   volunteering_dialog.value = false;
// }
const CopyVolunteeringHandle = () => {
  // Create a deep copy of the volunteering.value object
  const newVolunteering = JSON.parse(JSON.stringify(volunteering.value));

  // Push the copied object to the resume.value.volunteering array
  resume.value.volunteering.push(newVolunteering);

  volunteering_dialog.value = false;
};

function CreateVolunteeringHandle() {
  if (volunteering.value.position == '' || volunteering.value.position == null) {
    toast.error(t('Resumes.volunteering.toasts.positionEmpty'));
  } else if (volunteering.value.organization == '' || volunteering.value.organization == null) {
    toast.error(t('Resumes.volunteering.toasts.organizationEmpty'));
  } else {

    resume.value.volunteering.push(volunteering.value);
    volunteering.value = {} as Volunteering;
    volunteering_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseVolunteeringDialogHandle = () => {
  volunteering.value = {} as Volunteering;
  volunteering_dialog.value = false;
}

</script>

<template>
  <section>
    <!--        volunteering title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-hand-heart-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.volunteering.headers.volunteering') }}</h1>
      </v-col>
    </v-row>
    <!--      volunteering section -->
    <v-row>
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :list="resume.volunteering"
                                :key="Math.random().toString(36).substr(2, 9)" ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.volunteering"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9) + '_' + index"
                  :title="item.position"
                  :subtitle="item.organization"
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
                                     @click="OpenVolunteeringDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenVolunteeringDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteVolunteeringHandle(index as number)"
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
               v-if="resume.volunteering?.length <= 0" class="py-6"
               @click="OpenVolunteeringDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenVolunteeringDialogAsCreate"
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
  <!--  volounteering dialog-->
  <DraggableContainer>
    <v-dialog
        v-model="volunteering_dialog"
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
              <v-label class="mb-2 font-weight-medium ">{{
                  $t('Resumes.volunteering.headers.volunteering')
                }}
              </v-label>
              <v-text-field variant="outlined" v-model="volunteering.organization"
                            :placeholder="t('Resumes.volunteering.headers.organizationName')"
                            color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="12" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.volunteering.headers.position') }}</v-label>
              <v-text-field variant="outlined" v-model="volunteering.position"
                            :placeholder="t('Resumes.volunteering.headers.position')"
                            color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.volunteering.headers.startDate') }}</v-label>
              <PickDate
                  v-model.string="volunteering.start_date"
                  :placeholder="t('Resumes.volunteering.headers.startDate')"
                  mode="date"

              ></PickDate>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.volunteering.headers.endDate') }}</v-label>
               <PickDate
                 v-model.string="volunteering.end_date"
                   :placeholder="t('Resumes.volunteering.headers.endDate')"
                  mode="date"

              ></PickDate>
            </v-col>
            <v-col cols="12" md="12">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.volunteering.headers.description') }}
                <AiMenu v-if="dev_mode == 'true'"/>
              </v-label>
              <!--            <v-textarea variant="outlined" rows="4" auto-grow-->
              <!--                        shaped row-height="25" v-model="volunteering.description"-->
              <!--                        :placeholder="t('Resumes.volunteering.headers.description')"-->
              <!--                        color="primary"></v-textarea>-->
              <tip-tap v-model="volunteering.description"/>

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
              @click="CloseVolunteeringDialogHandle"
          > {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateVolunteeringHandle"
            > {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditVolunteeringHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyVolunteeringHandle"
            > {{ $t('Resumes.actions.duplicate') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </DraggableContainer>
</template>

<style scoped lang="scss">

</style>