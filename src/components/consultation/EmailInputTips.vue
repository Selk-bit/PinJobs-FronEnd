<template>
 <v-container>
    <!-- Trigger button for opening the dialog -->
    <v-icon icon="mdi-help-circle-outline" class="text-primary" @click="showDialog = true"></v-icon>
<!--$t('showTips')-->
    <!-- Dialog (modal) -->
    <v-dialog v-model="showDialog" max-width="500" class="backdrop">
      <v-card>
        <v-card-title class="my-2 text-h4">{{ t('Models.consultation.emailInputTip.emailGuidelinesTitle') }} :</v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item class="mb-2">
              <div>{{ t('Models.consultation.emailInputTip.emailComma') }}</div>
            </v-list-item>
            <v-list-item class="mb-2">
              <div>{{ t('Models.consultation.emailInputTip.duplicateEmail') }}</div>
            </v-list-item>
            <v-list-item class="mb-2">
              <div>{{ t('Models.consultation.emailInputTip.invalidEmail') }}</div>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="showDialog = false">{{ t('Models.consultation.emailInputTip.closeButton') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import {useI18n} from "vue-i18n";
// Manage dialog visibility
const showDialog = ref(false);
const {t} = useI18n()
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
