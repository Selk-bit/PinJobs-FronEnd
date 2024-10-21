<script setup lang="ts">
import {useI18n} from "vue-i18n";
import payment from '@/assets/images/illustrations/payment.svg'

const {t} = useI18n()
</script>

<template>
  <div class="">
    <v-row>
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <div class="mb-3 justify-center d-flex" data-aos="fade-up">
          <v-img :src="payment" height="320" width="300"/>
        </div>
        <div class="text-h1 align-left font-weight-bold" data-aos="fade-up" data-aos-delay="100">
          {{ t('credit.purchaseCredits') }}
        </div>
        <div class="text-h6 text-grey100 mt-4 font-weight-semibold" data-aos="fade-up" data-aos-delay="200">
          <h1 class="text-h4  text-start  font-weight-bold text-primary">
              <span>
                {{ t('pricing.title') }}
              </span>
            {{ t('pricing.rest') }}
          </h1>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">

</style>