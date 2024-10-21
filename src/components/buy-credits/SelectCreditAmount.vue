<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {useCreditsStore} from "@/stores/purchase-credit";
import {storeToRefs} from "pinia";
import {getPrimary,} from "@/utils/UpdateColors";
import {useI18n} from "vue-i18n";
import {useRouter, useRoute} from "vue-router";
import type {Pack} from "@/types/pack";
import PaypalButton from "@/components/paypal/PaypalButton.vue";
import PurshaseCreditsHeading from "@/components/buy-credits/PurshaseCreditsHeading.vue";
import {enArray, frArray} from "@/utils/helpers/pack-features";

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const router = useRouter()
const route = useRoute()

const creditsAmount = Number.parseInt(Array.isArray(route.params.credits) ? route.params.credits[0] : route.params.credits);
const {t, locale} = useI18n()
const {packEn, packFr, credits} = storeToRefs(useCreditsStore())
const creditStore = useCreditsStore()
const packs = computed(() => {
  return locale.value == 'en' ? packEn.value : packFr.value
})

interface Tier {
  id: number;
  name: string;
}


const tier_selected = ref(1);
const tiers = ref<Tier[]>([
  {id: 1, name: "Normal"},
  {id: 2, name: "Premium"},
  {id: 3, name: "Gold"}
])
const computedRange = computed(() => {
  switch (tier_selected.value) {
    case 1:
      return {
        min: 20,
        max: 100,
        steps: 20,
        val: 20,
      };
    case 2:
      return {
        min: 200,
        max: 1000,
        steps: 200,
        val: 200,
      };
    case 3:
      return {
        val: 2000,
        min: 2000,
        max: 10000,
        steps: 2000
      };


  }
})
const currentFeatures = computed(() => {
  return locale.value === 'fr' ? frArray : enArray;
});


const successDialog = ref(false); // Control visibility of the dialog

function handlePaymentSuccess(orderData: any) {
  console.log('Payment was successful!', orderData);
  successDialog.value = true; // Show the success dialog
}

const selectedPack = computed(() => {
  if (tier_selected.value == 1) {
    return packs.value?.find((pack: Pack) => pack.id === 2);
  } else if (tier_selected.value == 2) {
    return packs.value?.find((pack: Pack) => pack.id === 3);
  } else if (tier_selected.value == 3) {
    return packs.value?.find((pack: Pack) => pack.id === 4);
  } else {
    return packs.value?.find((pack: Pack) => pack.id === 1);
  }
});


const computedPrice = computed(() => {

  const planId = selectedPack.value?.id;

  switch (planId) {
    case 1:
      return 'free';
    case 2:
      return credits.value * 3;
    case 3:
      return credits.value * 1.99;
    case 4:
      return credits.value * 0.99;
    default:
      return 'Invalid plan';
  }
});
watch(tier_selected, (val) => {
  credits.value = computedRange.value?.min as number;
})

function cancelPurchase() {
  router.go(-1);
}

onMounted(() => {
  if (creditsAmount) {

    credits.value = creditsAmount
  } else {
    credits.value = computedRange.value?.min as number;
  }
})
</script>

<template>
  <div>
    <v-row class="mx-10">
      <v-col cols="12">
        <PurshaseCreditsHeading/>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-10">
      <v-col cols="12" lg="6">
        <!--        slider-card-->
        <v-card elevation="1" class="py-10 px-4    max-width-600">
          <div class="text-center ">
            <h2 class="text-h3 mb-4">
              {{ t('pricing.selectCredits') }}
            </h2>
<!--            <div class="my-3 text-start text-body-1 font-weight-bold">-->
<!--              <i>{{ t('pricing.tip') }}</i>-->
<!--            </div>-->
              <v-card
              v-if="selectedPack"
              class=" rounded-3xl card-bg gradient elevation-4"
          >
            <div class="m-5 mx-auto">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <!-- Pack type and tag always visible -->
                  <h3 class="text-h6 font-weight-medium ">
                    {{ selectedPack.type }}
                  </h3>
                  <v-chip
                      class="bg-primary font-weight-bold  mt-2"
                      variant="tonal"
                  >
                    {{ selectedPack.tag }}
                  </v-chip>
                </div>
                <!--select tier-->
                <v-select variant="outlined" class="  border-2 border-surface my-2" :items="tiers" v-model="tier_selected" item-value="id"
                          item-title="name"></v-select>
                <h3 class="text-center text-h3 font-weight-medium  mb-2">
                  {{ t('pricing.totalPayment') }}:
                </h3>

                <!-- Make sure price is always visible -->
                <p class="text-center  display-1 font-weight-bold mb-4">
                  ${{ computedPrice === 'free' ? computedPrice : computedPrice.toLocaleString() }} <span
                    class="text-h5" v-if="selectedPack.id !== 1">

                ( ${{ selectedPack.price }}/{{ t('pricing.credits') }} )
                </span>
                </p>

                <v-divider class="my-4 text-surface"></v-divider>


                <v-expand-transition>

                  <div v-if="selectedPack.id != 1">
                    <PaypalButton
                        :credits="credits"
                        @payment-success="handlePaymentSuccess"
                        :paypal-id="paypalClientId"
                        :price="computedPrice as number"/>


                  </div>
                  <div v-else class="text-h4 text-center  ">
                    {{ t('pricing.freeText') }}
                  </div>
                </v-expand-transition>

              </v-card-text>
            </div>
          </v-card>

            <div class="d-flex flex-column justify-start mb-4">
              <div class="text-center font-weight-bold text-primary" style="font-size: 69px">
                {{credits}}
              </div>
              <div class="text-h3 font-weight-bold text-black">
                {{ t('pricing.credits') }}
              </div>
            </div>
          </div>
          <v-slider
              v-model="credits"
              :max="computedRange?.max"
              color="primary"
              :step="computedRange?.steps"
              :min="computedRange?.min"
              show-ticks="always"
              tick-size="4"

              class="mt-6"
          ></v-slider>

          <v-row class=" pb-7 mt-9 pa-7 ">
            <v-col md="4" lg="4" v-for="item in currentFeatures" :key="item" class="d-flex align-start">
              <v-icon class="text-primary  text-h2">
                mdi-check-circle
              </v-icon>
              <span class="ml-2  font-weight-bold">{{ item }}</span>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="my-2 bg-lightsecondary mx-auto pa-5 rounded-lg pa-5 overflow-hidden position-relative">
            <div class="text-h1 mb-3   font-weight-bold " style="z-index: 10;">
              <i> {{ t('pricing.discount.title', {discount: '50%'}) }}</i>
            </div>
            <p class="text-h6 mb-1" style="z-index: 10">
              <i> {{ t('pricing.discount.text') }}<br>{{ t('pricing.discount.rest') }}</i>
            </p>
            <img src="@/assets/images/illustrations/discount.svg" alt="bg-img" style="z-index: -10"
                 class="right-pos-img "/>
          </v-card>
      </v-col>
<!--      <v-col cols="12" lg="12">-->
<!--        <div>-->
<!--&lt;!&ndash;        &ndash;&gt;-->
<!--&lt;!&ndash;card pricing plce was here&ndash;&gt;-->
<!--          -->
<!--        </div>-->
<!--      </v-col>-->
    </v-row>
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" class="pa-6 backdrop"  max-width="400">
      <v-card class="pt-4">
        <div class="d-flex justify-center">
          <v-icon size="90" color="primary">mdi-check-decagram</v-icon>
        </div>
        <v-card-title class="text-h5 text-center">{{ t('pricing.successModal.title') }}</v-card-title>
        <v-card-text class="text-center">
          {{ t('pricing.successModal.text') }}
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" class="float-right" @click="successDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.selected {
  border: 1px solid darkcyan;
  //background-color: v-bind(getPrimary);
  background: rgb(2, 0, 36);
  background: linear-gradient(170deg, v-bind(getPrimary) 0%, v-bind(getPrimary) 43%, rgba(0, 212, 100, 1) 100%);

  color: white;
}

/* Hide increment/decrement buttons in Chrome, Safari, Edge, and Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide increment/decrement buttons in Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.card-bg {
  background: linear-gradient(to bottom right, #6ea199, #07ffde); /* Gradient color */
  //  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 50%, rgba(232,232,232,1) 100%);
  //border-radius: 10px;
  //box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  color: #EEF7FF;
}

.slider-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(245, 245, 245, 1) 50%, rgba(232, 232, 232, 1) 100%);
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>