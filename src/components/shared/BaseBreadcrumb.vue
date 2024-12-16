<script setup lang="ts">
import { ChevronRightIcon } from 'vue-tabler-icons';

const props = defineProps({
    title: String,
    subtitle: String,
    breadcrumbs: Array as any,
    icon: String,
    showArrow: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <div class="mt-3 mb-2">
        <div class="d-flex justify-space-between">
            <div class="d-flex py-0 align-center">
                <div>
                    <div class="d-flex align-center ">
                        <v-btn class="mr-1" variant="text" v-if="showArrow" @click="$router.go(-1)" icon="mdi-arrow-left">
                        </v-btn>
                        <h1 class=" ">{{ title }}</h1>
                    </div>
                        <h4>{{ subtitle }}</h4>
                    <v-breadcrumbs :items="breadcrumbs" class="text-h6 font-weight-regular pa-0 ml-n1">
                        <template v-slot:divider v-if="breadcrumbs">
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                        <template v-slot:title="{ item }">
                            <h6 class="text-medium-emphasis text-subtitle-1">{{ item.title }}</h6>
                        </template>
                    </v-breadcrumbs>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.page-breadcrumb {
    .v-toolbar {
        background: transparent;
    }
}
</style>
