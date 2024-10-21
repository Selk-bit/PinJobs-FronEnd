<script setup lang="ts">
import candidateIllustration from "@/assets/images/svgs/illustration-candidate-send-data.svg";
import {useI18n} from "vue-i18n";
import type {Template} from "@/types/model";
import {ref} from "vue";
import CustomAlert from "@/components/shared/CustomAlert.vue";

const {t} = useI18n();
const emits = defineEmits(['send-link', 'close', 'update:template-id']);
const selectedTemplateId= ref('')
const props = defineProps<{
  dialog: boolean;
  items: Template[];
  // selectedTemplateId: string;
  loading: boolean;
  sendEmailText: string;
}>();

</script>

<template>
  <v-dialog v-model="dialog" class="backdrop" max-width="900" height="900">
    <v-card class="d-flex justify-center py-3 my-6" rounded="xl">
      <v-card-item class="d-flex justify-end">
        <v-btn variant="flat" @click="$emit('close')" icon="mdi-close"></v-btn>
      </v-card-item>

      <!-- Start -->
      <div style="height: auto; overflow-y: auto">
        <v-card-item class="d-flex justify-center">
          <div class="text-center">
            <div class="mb-3 justify-center d-flex" data-aos="fade-up">
              <v-img :src="candidateIllustration" height="220" width="200" />
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100">
              {{ t('Candidates.sendLink.title') }}
            </h2>
            <div data-aos="fade-up" data-aos-delay="200">
              {{ t('Candidates.sendLink.text') }}
            </div>
          </div>
        </v-card-item>

        <v-card-item>
          <v-row>
            <v-col cols="12" lg="12" md="12">
              <v-label class="mb-2 font-weight-medium">
                {{ $t('Resumes.editor.selectModel') }}
              </v-label>
              <v-select
                variant="outlined"
                density="compact"
                clearable
                v-model="selectedTemplateId"
                placeholder="Select model"
                item-title="name"
                :menu-props="{ maxHeight: 300 }"
                :no-data-text="t('Resumes.editor.noDataMessage')"
                item-value="id"
                :items="items"
                @update:modelValue="$emit('update:template-id', $event)"
              />
            </v-col>
          </v-row>
        </v-card-item>
      </div>
      <v-card-item>
        <v-row no-gutters class="mb-4">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              variant="text"
              @click="$emit('send-link', selectedTemplateId)"
              :loading="loading"
            >
              <v-icon class="mr-1">mdi-email-fast-outline</v-icon>
              {{ sendEmailText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    <v-card-item>
      <CustomAlert
        :title="t('alerts.send-link.title')"
        color="info"
        :message="t('alerts.send-link.text')" />
    </v-card-item>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
</style>
