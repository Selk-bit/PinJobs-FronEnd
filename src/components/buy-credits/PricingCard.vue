<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Pack } from "@/types/pack";

const { t } = useI18n();

const props = defineProps<{
  pack: Pack,
  credits: number;
}>();

const computedPack = ref(props.pack);
const computedCredits = ref(props.credits);

watch(() => props.pack, (val) => {
  computedPack.value = val;
});
watch(() => props.credits, (val) => {
  computedCredits.value = val;
});

const computedPrice = computed(() => {
  const credits = computedCredits.value;
  const planId = computedPack.value.id;

  switch (planId) {
    case 1:
      return 'free';
    case 2:
      return credits * 7;
    case 3:
      return credits * 5;
    case 4:
      return credits * 3;
    default:
      return 'Invalid plan';
  }
});
</script>

<template>
  <v-container>
    <v-card
      v-if="computedPack"
      class="mx-2 rounded-3xl card-bg gradient elevation-6"
    >
      <div class="m-5">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <!-- Pack type and tag always visible -->
            <h3  class="text-h6 font-weight-medium text-white">
              {{ computedPack.type }}
            </h3>
            <v-chip
              class="bg-lightPrimary text-white mt-2"

              outlined
            >
              {{ computedPack.tag }}
            </v-chip>
          </div>

          <h3  class="text-center text-h3 font-weight-medium text-white mb-2">
            {{ t('pricing.totalPayment') }}:
          </h3>

          <!-- Make sure price is always visible -->
          <p  class="text-center text-white display-1 font-weight-bold mb-4">
            ${{ computedPrice === 'free' ? computedPrice : computedPrice.toLocaleString() }}    <span class="text-h5" v-if="computedPack.id !== 1">

            ( ${{ computedPack.price }}/{{ t('pricing.credits') }} )
            </span>
          </p>

          <!-- Pricing breakdown for paid tiers -->
          <div class="text-center text-h5 font-weight-medium mb-4" >

          </div>

          <v-divider :class="[computedPack.color == 'white' ? 'border-lightPrimary' : 'border-white']" class="my-4 text-surface"></v-divider>

          <ul class="text-white mb-4 mt-9">
            <li v-for="item in computedPack.features" :key="item.content" class="d-flex align-center">
              <v-icon :class="[computedPack.color == 'white' ? 'text-lightPrimary' : 'text-white']">mdi-check-circle</v-icon>
              <span class="ml-2 font-weight-bold">{{ item.content }}</span>
            </li>
          </ul>

          <div class="d-flex justify-center">
            <v-btn :class="[computedPack.color == 'white' ? 'bg-lightPrimary text-white' : 'bg-white text-lightPrimary']" class="font-weight-semibold mt-4 w-full" text>
              {{ t('pricing.claimNow') }}!
            </v-btn>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
.card-bg {
  background: linear-gradient(to bottom right, #20c997, #38a89d); /* Gradient color */
}
</style>
