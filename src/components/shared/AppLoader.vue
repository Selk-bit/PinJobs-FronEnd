<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import LoadingFlash from '@/components/shared/LoadingFlash.vue';

const props = defineProps({
    loading: {
        type: Boolean,
        required: true // Ensures `loading` prop is explicitly provided.
    },
    text: {
        type: String,
        default: 'Loading, please wait...' // Default text for better UX.
    },
    isLogo: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['update:loading']);


</script>

<template>
    <v-dialog
        v-model="loading"
        max-width="400"
        persistent

        class="backdrop"
    >
        <v-list
            class="py-6 pa-5"
            color="primary"
            elevation="12"
            rounded="lg"
        >
            <v-list-item :title="text">
                <template v-slot:prepend v-if="isLogo">
                    <div class="pe-4 d-flex justify-center align-center">
                        <img
                            src="@/assets/images/logos/logo-app.svg"
                            alt="App Logo"
                            style="width: 100px"
                        />
                    </div>
                </template>

                <template v-slot:append>
                    <!--                    <v-progress-circular-->
                    <!--                        color="primary"-->
                    <!--                        indeterminate-->
                    <!--                        size="16"-->
                    <!--                        width="2"-->
                    <!--                    />-->
                    <LoadingFlash :size="40" />
                </template>
            </v-list-item>
        </v-list>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>
