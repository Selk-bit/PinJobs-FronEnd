<script setup lang="ts">
import type {Interest} from "@/types/resume";

defineProps<{
  title?:string;
  interests?:Interest[];
}>()
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <h4 class="text-h4 mb-3">{{ title }}</h4>
                    <div  v-for="item in interests" class="d-inline-flex ma-1 text-subtitle-1 lh-md">
                      <v-chip color="primary" >{{item.interest}}</v-chip>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
