<script setup lang="ts">

import type {Education} from "@/types/resume";

defineProps<{
  title:string;
  education?:Education[]
}>()
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <h4 class="text-h4 mb-3">{{title}}</h4>
                    <div class="d-flex flex-column gap-2 mb-5 border pa-2" style="border-radius: 23px" v-for="item in education">
                        <div class="text-h4">{{item.degree}}</div>
                        <div class="text-h5">{{item.institution}}</div>
                        <div class="text-h6">{{item.start_year + ' - ' + item.end_year}}</div>
                    </div>


                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
