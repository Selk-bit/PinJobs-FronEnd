<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const emits = defineEmits(['delete'])
const props = defineProps<{
  firstName: string;
  lastName: string;
  email: string;
  show: boolean;
}>();

const {firstName, lastName, email} = props;

</script>

<template>

  <v-card elevation="1" variant="elevated" class="ma-1 pa-2 my-2 border border-primary">
    <v-row>
      <v-col class="my-1 d-flex flex-column justify-space-around ">
        <div class="text-subtitle-2 text-primary">{{ t('auth.register.first') }}</div>
        <div class="text-h6 ml-1 text-capitalize">{{ firstName ?? '----' }}</div>
      </v-col>
      <v-col class="my-1 d-flex flex-column justify-space-around">
        <div class="text-subtitle-2 text-primary">{{ t('auth.register.last') }}</div>
        <div class="text-h6 ml-1 text-capitalize">{{ lastName ?? '----' }}</div>
      </v-col>
      <v-col class="my-1 d-flex flex-column justify-space-around">
        <div class="text-subtitle-2 text-primary">{{ t('auth.register.email') }}</div>
        <div class="text-h6 ml-1 ">{{ email ?? '----' }}</div>
      </v-col>

      <v-col class="my-1 d-flex flex-column align-center justify-center " >
        <div class="text-subtitle-2 text-primary" v-if="show">Actions</div>
        <div class="text-h6 ml-1">
          <v-btn flat variant="text" v-if="show"  color="secondary" @click="$emit('delete')"
                 icon="mdi-delete"></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>

</template>

<style scoped lang="scss">

</style>