<script setup lang="ts">

const props = defineProps({
    title: String,
    subtitle: String

});
</script>

<template>
    <div>
        <!-- Top section with button and title -->
        <v-row
            class="d-flex  justify-space-between align-center"
            align="center"
            no-gutters
        >
            <!-- Back Button (visible only on small screens) -->
<!--            <v-btn-->
<!--                v-if="$vuetify.display.mobile"-->
<!--                @click="$router.go(-1)"-->
<!--                icon="mdi-arrow-left"-->
<!--                class="mr-2"-->
<!--            ></v-btn>-->

            <!-- Title and Subtitle -->
            <v-col cols="12" lg="8" md="auto" class="d-flex flex-column ml-2">
                <div class="text-h2 font-weight-medium">{{ title }}</div>
                <div class="text-h6 ml-1 mb-2 text-grey100">{{ subtitle }}</div>
            </v-col>

            <!-- Right-aligned Button -->
            <v-col cols="12" lg="3"  class=" d-flex justify-end">
                <slot name="actions" ></slot>
            </v-col>
        </v-row>
        <v-divider thickness="3" color="primary" class="mt-6" />
        <!-- Slot for additional content -->
    </div>
</template>


<style scoped lang="scss">

</style>