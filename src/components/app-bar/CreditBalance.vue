<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";

import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";

const {t} = useI18n()
const loading = ref(true)

const {user} = storeToRefs(useAuthStore());
const credit = computed(() => {
  if (!!user.value.credits) {
    return user.value.credits + ' ' + t('credit.label');
  } else {
    return 0
  }
})

const chipColor = computed(() => {
  if (user.value.credits) {
    return user.value.credits > 0 ? 'primary' : 'error'
  } else {
    return 'error'
  }
})
</script>

<template>
  <v-chip prepend-icon="mdi-database" class="font-weight-semibold" v-if="user" :color="chipColor" ripple variant="tonal">
    <div v-if="user">
      {{ credit }}
    </div>
  </v-chip>
</template>

<style scoped lang="scss">

</style>