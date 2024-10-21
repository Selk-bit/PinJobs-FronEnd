<template>
    <!-- Button to show the dialog -->
    <v-btn variant="text" icon="mdi-eye" :disabled="disabled"  color="info" @click.stop="show = !show"></v-btn>

    <!-- Dialog to display DOCX content -->
    <v-dialog
      class="backdrop"
      v-model="show"
      height="100%"
      :fullscreen="toggle_fullScreen"
      :scrim="add_overlay"
      transition="dialog-bottom-transition"
      :width="toggle_fullScreen ? '100%' : 1200"
    >
      <v-card>
        <v-toolbar dark density="compact" color="primary">
          <!-- Close button -->
          <v-btn icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <div class="d-flex" v-if="!mdAndDown">
              <v-divider vertical></v-divider>
              <!-- Toggle overlay button -->
              <v-btn color="white" @click="add_overlay = !add_overlay">
                <v-icon color="white">mdi-{{ add_overlay ? 'lightbulb-on' : 'lightbulb-off' }}</v-icon>
                <v-tooltip activator="parent" location="top">Toggle dim light</v-tooltip>
              </v-btn>
              <!-- Toggle fullscreen button -->
              <v-btn variant="text" @click="fullscreenHandler">
                <v-icon>mdi-fullscreen</v-icon>
                <v-tooltip activator="parent" location="top">Toggle Fullscreen mode</v-tooltip>
              </v-btn>
              <v-divider vertical></v-divider>
            </div>
            <div v-else class="d-flex">
              <!-- Menu for small screens -->
              <v-menu v-model="menu" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-btn variant="plain" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
                <v-card class="pl-3 d-flex justify-center" max-width="400">
                  <v-list lines="two">
                    <v-divider></v-divider>
                    <v-list-item class="px-4">
                      <!-- Fullscreen toggle switch -->
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
        <!-- Container for the rendered DOCX content -->
        <v-card>
          <!-- Embed Google Docs Viewer in iframe -->
          <iframe
            class="doc"

            :src="`https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`"
            frameborder="0"
            width="100%"
            height="900px"
          ></iframe>

        </v-card>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

// Vuetify display breakpoints
const { mdAndDown } = useDisplay();

// Reactive states
const menu = ref(false);
const show = ref(false);
const add_overlay = ref(false);
const toggle_fullScreen = ref<boolean>(false);

// Function to handle fullscreen toggle
function fullscreenHandler() {
  toggle_fullScreen.value = !toggle_fullScreen.value;
}

// Define props to accept fileUrl
const props = defineProps<{
  fileUrl: string;
  disabled:boolean;
}>();

// Computed iframe URL for Google Docs Viewer
const iframeUrl = ref<string>('');

// Watch for changes in the fileUrl prop and update the iframe URL
watch(() => props.fileUrl, (newUrl) => {
  if (newUrl) {
    iframeUrl.value = `https://view.officeapps.live.com/op/embed.aspx?src=${newUrl}`;
  } else {
    iframeUrl.value = ''; // Clear iframe URL if no fileUrl is provided
  }
});
</script>

<style scoped>
/* Add any styles if needed */
.doc {
  width: 100%;
  max-height: 800px;
  height: 800px;
}
</style>