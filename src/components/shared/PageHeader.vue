<script setup lang="ts">

const props = defineProps({
    title: String,
    subtitle: String

});
</script>

<template>
    <div class="header-container mx-auto">
        <!-- Top section with button and title -->
        <v-row
            class="d-flex  justify-space-between align-center"
            align="center"
            no-gutters
        >
            <!-- Title and Subtitle -->
            <v-col cols="12" lg="8" md="auto" class="d-flex flex-column ml-2">
                <div class="text-h4 font-weight-bold mb-1">{{ title }}</div>
                <div class="text-h6 ml-1 mb-2 text-grey">{{ subtitle }}</div>
            </v-col>

            <!-- Right-aligned Button -->
            <v-col cols="12" lg="3" class=" d-flex justify-end">
                <slot name="actions"></slot>
            </v-col>
            <v-col cols="12" lg="12" class=" d-flex justify-start">
                <slot name="tabs"></slot>
            </v-col>

        </v-row>
<!--        <v-divider thickness="3" color="primary" class="mt-3" />-->
        <!-- Slot for additional content -->
    </div>
</template>


<style scoped lang="scss">
.header-container {
    max-width: 1300px;
    margin-top: 20px;
}
</style>