<script setup lang="ts">
import {ref, watch} from 'vue';
import {useDisplay} from 'vuetify';
import nodata from "@/assets/images/illustrations/no-data.svg";

const props = defineProps<{
  link: string;
  isAvailable?: boolean;
  name?: string;
}>();

// vuetify display screen sizes

const {mdAndDown, smAndDown} = useDisplay();

//menu prop
const menu = ref(false);

// modal props
const show = ref(false);
const add_overlay = ref(false);
const toggle_fullScreen = ref<boolean>(false);


function fullscreenHandler() {
  toggle_fullScreen.value = !toggle_fullScreen.value;
}
</script>

<template>

  <v-btn variant="text" :disabled="!isAvailable"  icon="mdi-eye" color="error" @click.stop="show = !show"></v-btn>
  <v-dialog
       class="backdrop"
      v-model="show"
      :fullscreen="toggle_fullScreen"
      :scrim="add_overlay"
      height="100%"
      transition="dialog-bottom-transition"
      :width="toggle_fullScreen ? '100%' : 1200"
  >
    <v-card>
      <v-toolbar dark density="compact" color="primary">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-h6">{{ props.name ?? null}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div class="d-flex" v-if="!mdAndDown">
            <v-divider vertical></v-divider>


            <v-btn class="" color="white" @click="add_overlay = !add_overlay">
              <v-icon color="white cursor-pointer ">mdi-{{ add_overlay ? 'lightbulb-on' : 'lightbulb-off' }}</v-icon>
              <v-tooltip activator="parent" location="top">Toggle dim light</v-tooltip>
            </v-btn>
            <v-btn variant="text" @click="fullscreenHandler">
              <v-icon>mdi-fullscreen</v-icon>
              <v-tooltip activator="parent" location="top">Toggle Fullscreen mode</v-tooltip>
            </v-btn>
            <!--                        <v-btn variant="text" @click="show = false"> Save</v-btn>-->
            <v-divider vertical></v-divider>


            <v-divider vertical></v-divider>
          </div>
          <div v-else class="d-flex">
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
              <template v-slot:activator="{ props }">
                <v-btn variant="plain" icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-card class="pl-3 d-flex justify-center" max-width="400">
                <v-list lines="two">
                  <v-divider></v-divider>
                  <v-list-item class="px-4">
                    <v-switch
                        inset
                        v-model="toggle_fullScreen"
                        label="Toggle fullscreen"
                        color="primary"
                        hide-details
                    ></v-switch>
                  </v-list-item>
                  <v-divider></v-divider>
                </v-list>
              </v-card>
            </v-menu>
          </div>
        </v-toolbar-items>
      </v-toolbar>
      <iframe id="fred" type="application/pdf" title="PDF in an i-Frame" :src="link" v-if="isAvailable"
              width="100%" height="1200"></iframe>
      <div  class="flex-column h-100vh text-center align-center my-8 justify-center" v-else>
        <v-img :src="nodata" height="300"/>
        <div class="mt-4">
          {{ $t('Resumes.editor.fileNotFound') }}
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
