<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import type {
  Reference,
} from "@/types/resume";
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {storeToRefs} from 'pinia';
import {VueDraggableNext} from "vue-draggable-next";
import DraggableContainer from "@/components/shared/DraggableContainer.vue";
import _ from "lodash";
import {validateEmail} from "@/utils/helpers/validate-email";


const {t} = useI18n();
const resumeStore = useResumeStore();
const {resume} = storeToRefs(resumeStore);
const actionOption = ref<'create' | 'edit' | 'copy'>();

const reference_dialog = ref(false);
const reference = ref<Reference>({
  name: '',
  position: '',
  company: '',
  email: '',
  phone: '',
});
const index = ref();


// reference section
const OpenReferenceDialogAsCreate = () => {
  actionOption.value = 'create';
  reference.value = {} as Reference;
  reference_dialog.value = true
}

// Open dialog with the selected reference to edit
const OpenReferenceDialogAsEdit = (item: Reference, itemIndex: number) => {
  actionOption.value = 'edit';
  index.value = itemIndex;

  // Create a deep copy of the reference to avoid auto-updates
  reference.value = JSON.parse(JSON.stringify(item)) as Reference;
  reference_dialog.value = true;
}

// Handle the actual update when save button is clicked
const EditReferenceHandle = () => {
  // Update the reference array only when save is clicked
  if (reference.value.email == '' || reference.value.email == null || !validateEmail(reference.value.email)) {
    toast.warning(t('Resumes.editor.toasts.invalidEmail'));
  } else {
    resume.value.references[index.value] = JSON.parse(JSON.stringify({...reference.value})) as Reference;
    reference_dialog.value = false;

  }
}

const OpenReferenceDialogAsCopy = (item: any) => {
  actionOption.value = 'copy';
  reference.value = _.cloneDeep(item) as Reference;
  reference_dialog.value = true
}


const DeleteReferenceHandle = (index: number) => {
  // let index = resume.value.references.findIndex((obj: Reference) => item.name == obj.name);
  resume.value.references.splice(index, 1);
  reference_dialog.value = false;
  // toast.success(t('Resumes.toasts.itemDeleted'));
  t('')
}
// const CopyReferenceHandle = () => {
//   resume.value.references.push(reference.value);
//   reference_dialog.value = false;
// }

const CopyReferenceHandle = () => {
  // Create a deep copy of the reference.value object
  const newReference = JSON.parse(JSON.stringify(reference.value));

  // Push the copied object to the resume.value.references array
  resume.value.references.push(newReference);

  reference_dialog.value = false;
};

function CreateReferenceHandle() {
  if (reference.value.name == '' || reference.value.name == null) {
    toast.error(t('Resumes.references.toasts.nameEmpty'));
  } else if (reference.value.position == '' || reference.value.position == null) {
    toast.error(t('Resumes.references.toasts.positionEmpty'));
  } else if (reference.value.email == '' || reference.value.email == null || !validateEmail(reference.value.email)) {
    toast.warning(t('Resumes.editor.toasts.invalidEmail'));
  } else {

    resume.value.references.push(reference.value);
    reference.value = {} as Reference;
    reference_dialog.value = false;
    // toast.success(t('Resumes.toasts.itemCreated'));
  }

}

const CloseReferenceDialogHandle = () => {
  reference.value = {} as Reference;
  reference_dialog.value = false;
}

</script>

<template>
  <section>
    <!--        reference title-->
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-icon>mdi-account-group-outline</v-icon>
        <h1 class="text-h2 font-weight-bold">{{ $t('Resumes.references.headers.reference') }}</h1>
      </v-col>
    </v-row>
    <!--      Reference section -->
    <v-row>
      <v-col cols="12">
        <v-list lines="two">
          <v-slide-y-transition
              class="py-0"
              tag="v-list"
              group
          >
            <!--                    @contextmenu.prevent.stop="ShowContextMenu($event,{item:{id:i,name:'dsda'}, arr:[1,2,3]})"-->
            <vue-draggable-next handle=".handle" :key="Math.random().toString(36).substr(2, 9)"
                                :list="resume?.references" ghost-class="ghost">
              <v-list-item
                  v-for="(item,index) in resume.references"
                  class="mb-2"

                  variant="outlined"
                  rounded="lg"
                  :key="Math.random().toString(36).substr(2, 9)+ '_' + index"
                  :title="item.name"
                  :subtitle="item.position"
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
                                     @click="OpenReferenceDialogAsCopy(item)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-content-copy</v-icon>
                            {{ $t('Resumes.actions.copy') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="OpenReferenceDialogAsEdit(item,index as number)"
                                     min-height="38">
                          <v-list-item-title class="mr-2">
                            <v-icon>mdi-pencil-outline</v-icon>
                            {{ $t('Resumes.actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item value="action" hide-details
                                     @click="DeleteReferenceHandle(index as number)"
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
               v-if="resume.references?.length <= 0" class="py-6"
               @click="OpenReferenceDialogAsCreate"
               style="border: 1px Dashed green"
               color="primary">
          <v-icon>mdi-plus</v-icon>
          {{ $t('Resumes.actions.addItem') }}
        </v-btn>
        <v-btn variant="outlined" @click="OpenReferenceDialogAsCreate"
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
  <!--  reference dialog-->
  <draggable-container>
    <v-dialog
        v-model="reference_dialog"
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
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.references.headers.name') }}</v-label>
              <v-text-field variant="outlined" v-model="reference.name"
                            :placeholder="t('Resumes.references.placeholders.name')" color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.references.headers.phone') }}</v-label>
              <v-text-field variant="outlined" v-model="reference.phone"
                            :placeholder="t('Resumes.references.placeholders.phone')"
                            color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.references.headers.company') }}</v-label>
              <v-text-field variant="outlined" v-model="reference.company"
                            :placeholder="t('Resumes.references.placeholders.company')"
                            color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.references.headers.position') }}</v-label>
              <v-text-field variant="outlined" v-model="reference.position"
                            :placeholder="t('Resumes.references.placeholders.position')"
                            color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-label class="mb-2 font-weight-medium">{{ $t('Resumes.references.headers.email') }}</v-label>
              <v-text-field variant="outlined" v-model="reference.email"
                            :placeholder="t('Resumes.references.placeholders.email')"
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
              @click="CloseReferenceDialogHandle"
          >
            {{ $t('Resumes.actions.close') }}
          </v-btn>

          <div>
            <v-btn
                v-if="actionOption == 'create'"
                color="primary"
                variant="tonal"
                @click="CreateReferenceHandle"
            > {{ $t('Resumes.actions.create') }}
            </v-btn>
            <v-btn
                v-else-if="actionOption == 'edit'"
                color="primary"
                variant="tonal"
                @click="EditReferenceHandle"
            > {{ $t('Resumes.actions.edit') }}
            </v-btn>
            <v-btn
                v-else
                color="primary"
                variant="tonal"
                @click="CopyReferenceHandle"
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