<script setup lang="ts">
import type {Language, Skill} from "@/types/resume";
import {getPrimary} from "@/utils/UpdateColors";

defineProps<{
  languages?: Language[];
  title?:string;
}>()

</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="outlined" class="bg-surface">
        <v-card-item>
           <h4 class="text-h4 mb-3">{{ title  }}</h4>
          <v-row v-for="item in languages" no-gutters>
            <v-col cols="12" class="mb-2">

                    {{ item.language }}
            </v-col>
            <v-col cols="12">
                  <div class="skill-bar">
                    <div
                        v-for="(level, index) in 5"
                        :key="index"
                        :class="['skill-level', { 'dash-filled': +index < +item.level }]"
                    ></div>
                  </div>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>


<style scoped lang="scss">






    .skill-bar {
      //display: flex;
      gap: 5px; /* Space between dashes */
      display: inline-flex;
    }

    .skill-level {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background-color: #a19d9d; /* Default color for empty dash */
    }

    .dash-filled {
      background-color: v-bind(getPrimary);
    }

</style>