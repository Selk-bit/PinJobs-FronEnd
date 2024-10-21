<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {useCreditsStore} from "@/stores/purchase-credit";
import {storeToRefs} from "pinia";

const {credits,min,max} = storeToRefs(useCreditsStore());
const isCustom = ref(false);


function decrement() {
  if(credits.value <= min.value) {
    return
  }
  credits.value--
}

function increment() {
    if(credits.value >= max.value) {
    return
  }
  credits.value++
}

watch(isCustom, (val) => {
  if(val)
    credits.value = min.value;
})

</script>

<template>
  <v-card
      elevation="0"
      class="mx-auto"
      max-width="auto"
  >
    <v-toolbar
        dense
        flat
    >
<!--      <v-toolbar-title>-->
<!--        <span class="text-subheading">Select credit amount</span>-->
<!--      </v-toolbar-title>-->
      <v-spacer></v-spacer>
          <v-btn variant="plain" @click="isCustom = !isCustom">
        select a custom amount of credits ?
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-row
          class="mb-4"
          justify="space-between"
      >
        <v-col class="text-left">
          <span
              class="text-h2 font-weight-light"
              v-text="credits"
          ></span>
          <span class="subheading font-weight-light me-1">Credit</span>

        </v-col>

      </v-row>

      <v-slider
          v-model="credits"
          :step="1"
          :max="max"
          :min="min"
          v-if="!isCustom"

          track-color="grey"
      >
        <template v-slot:prepend>
          <v-btn
              icon="mdi-minus"
              size="small"
              variant="text"
              @click="decrement"
          ></v-btn>
        </template>

        <template v-slot:append>
          <v-btn
              icon="mdi-plus"
              size="small"
              variant="text"
              @click="increment"
          ></v-btn>
        </template>
      </v-slider>


    <v-text-field  v-if="isCustom" type="number" variant="outlined" v-model="credits" suffix="Credits"></v-text-field>
    </v-card-text>
  </v-card>

</template>

<style scoped lang="scss">

</style>