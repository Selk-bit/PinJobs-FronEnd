<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import {ref} from "vue";
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";
const  {t} = useI18n()
const textToCopy = ref('');
const { copy, copied } = useClipboard(); // using VueUse's useClipboard

const copyToClipboard = (val:string) => {
textToCopy.value = val
    copy(textToCopy.value);
    toast.info('Copied to clipboard')// Copy the value to the clipboard

};
defineProps<{
  name?: string;
  phone?: string;
  city?: string;
  age?: string;
  email?: string;
  headline?: string;
  summary?: string;
  reference?: string;
  yoe:string;
  alias:string;
}>()

</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="outlined" class="bg-surface">
        <v-card-item>
          <div class="text-h6 ">#ID <v-chip density="compact" class="cursor-pointer"  @click="copyToClipboard(reference as string)" variant="tonal">{{ reference }}</v-chip></div>
          <h4 class="text-h3 mb-1">{{ name || '' }}</h4>
          <h4 class="text-h3 my-1">Alias : {{ alias || '' }}</h4>
          <h4 class="text-h4">{{ headline || '' }}</h4>
          <p class="my-5 text-subtitle-1 lh-md" v-html="summary || ''">

          </p>
          <div class="d-flex gap-3 mb-5">

            <v-icon>mdi-cake-variant-outline</v-icon>
            <span class="text-h6">{{ age || '' }}</span>
          </div>
          <div class="d-flex gap-3 mb-5">
            <MailIcon size="21"/>
            <span class="text-h6">{{ email || '' }}</span>
          </div>
          <div class="d-flex gap-3 mb-5">
            <v-icon>mdi-cellphone</v-icon>
            <span class="text-h6">{{ phone || '' }}</span>
          </div>
          <div class="d-flex gap-3 mb-5">

            <v-icon>mdi-city-variant-outline</v-icon>
            <span class="text-h6">{{ city || '' }}</span>
          </div>
          <div class="d-flex gap-3 mb-5" >

            <span class="text-h6">{{ t('Candidates.filter.exp') }} : {{yoe != '' ? yoe + ' ' + t('common.timeAgo.year') + '(s)' : '--' }}</span>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
