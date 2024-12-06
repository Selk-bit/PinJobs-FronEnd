<script setup lang="ts">
import chatBot from "@/assets/images/illustrations/chat-bot.svg";
import {useAuthStore} from "@/stores/auth";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import CardSkeleton from "@/components/shared/CardSkeleton.vue";
import SummaryAnswerCard from "@/components/ai/SummaryAnswerCard.vue";
import type {Language} from "@/types/language";
import {sleep} from "@/utils/helpers/sleep";
import {storeToRefs} from "pinia";
import {toast} from "vue-sonner";
import type {Summary} from "@/types/candidate";

import {getPrimary} from "@/utils/UpdateColors";
import {validateEmail} from "@/utils/helpers/validate-email";

const active = ref<boolean>(false);
const generating = ref<boolean>(false);
const scrollableContent = ref<HTMLDivElement | null>(null);
const {t} = useI18n()





const scrollToTop = () => {
  if (scrollableContent.value) {
    scrollableContent.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const scrollToBottom = () => {
  if (scrollableContent.value) {
    scrollableContent.value.scrollTo({
      top: scrollableContent.value.scrollHeight,
      behavior: 'smooth'
    });
  }
};

</script>

<template>
  <div>

    <v-btn
        size="30"
        icon
        class="ml-1"
        @click="active = !active"
        variant="text"
    >
      <v-icon>
        mdi-creation
      </v-icon>
    </v-btn>
    <v-dialog v-model="active" max-width="980" class="backdrop">

      <v-card class=" d-flex justify-center   " rounded="xl">
        <div class="d-flex justify-end z-2 ">
          <v-btn variant="text" @click="active = false" icon="mdi-close"></v-btn>
        </div>
        <v-card-item class="d-flex justify-center mt-n10">
          <div class="text-center">
            <div class="mb-3 justify-center d-flex" data-aos="fade-up">
              <v-img :src="chatBot" height="90" width="90"/>
            </div>
            <div class="heading my-4">
              <h3 data-aos="fade-up" data-aos-delay="100" class="mb-4">
                {{ t('Resumes.editor.summary.title') }}
              </h3>
              <div class="text-h7 my-4" data-aos="fade-up" data-aos-delay="200">
                {{ t('Resumes.editor.summary.text') }}
              </div>
            </div>
            <div class="float-end">
              <v-btn size="small" icon="mdi-arrow-down" variant="text" @click="scrollToBottom"></v-btn>
              <v-btn size="small" icon="mdi-arrow-up" variant="text" @click="scrollToTop"></v-btn>
            </div>
          </div>
        </v-card-item>
        <div class="scrollable-content  overflow-y-auto " ref="scrollableContent"
             :style="{minHeight: 'auto',border:`2px solid ${getPrimary}`,borderRadius: '15px'}">
          <v-row no-gutters>
            <v-col cols="12" lg="12" md="12" data-aos="fade-up" >
              <div class="text-h4 text-center my-7">
                <v-icon color="primary">mdi-creation</v-icon>
                <div class="text-body-1">
                  {{ t('Resumes.editor.summary.noSummary') }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="12" md="12">


<!--              <SummaryAnswerCard :key="index"-->
<!--                                 :index="index"-->
<!--                                 @delete-summary="deleteSummary"-->
<!--                                 @pick-summary="PickSummary"-->
<!--                                 v-for="(summary,index) in summaryList"-->
<!--                                 :summary="summary"-->
<!--                                 :opening="t('Resumes.editor.summary.opening')"/>-->
            </v-col>
            <v-col cols="12" v-if="generating">
              <CardSkeleton

              />
            </v-col>
          </v-row>
        </div>
        <v-card-item>
          <v-row>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn variant="text"  :loading="generating">
                <v-icon class="mr-1">mdi-creation</v-icon>
                {{ t('Resumes.editor.summary.generate') }}
              </v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-center  text-body-1 text-center">
              <i>{{ t('Resumes.editor.summary.note') }}</i>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.text-h6 {
  //color: #424242;
}

.text-subtitle-2 {
  //color: #757575;
  margin-top: 10px;
}

.v-card {
  //background-color: #f5f5f5;
  padding: 16px;
}
</style>