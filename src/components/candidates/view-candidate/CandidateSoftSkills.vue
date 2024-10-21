<script setup lang="ts">
import type {Interest, Skill} from "@/types/resume";

defineProps<{
  title?:string;
  skills?:Skill[];
}>()
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <h4 class="text-h4 mb-3">{{ title }}</h4>
                    <div  v-for="item in skills" class="d-inline-flex      lh-md">
                      <v-chip color="primary" class="text-wrap text-subtitle-2 my-1 ma-1 " >{{item.skill}}
                      <span class=""></span></v-chip>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
