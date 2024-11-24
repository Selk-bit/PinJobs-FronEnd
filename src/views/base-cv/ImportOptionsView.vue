<template>
    <v-dialog v-model="dialog" max-width="700px" persistent>
        <!-- Dialog Content -->
        <v-card>
            <!-- Title Section -->
            <v-card-title class="d-flex pa-3 text-wrap text-center align-center flex-column justify-space-between">
                <div class="text-h4">Import Your Data to get started</div>
                <div class="text-body-1">
                    Select the most current and comprehensive source to automatically populate your information.
                </div>
            </v-card-title>

            <!-- Main Content -->
            <v-card-text>
                <!-- Options -->
                <div class="d-flex justify-space-around align-center my-4">
                    <!-- Upload Resume Option -->
                    <v-card
                        @mouseover="option.isHovered = true"
                        @mouseleave="option.isHovered = false"
                        v-for="option in options"
                        @click="chooseOption(option.key)"
                        :key="option.key"

                        :style="{backgroundColor: option.isHovered ? getPrimary : ''}"
                        elevation="0"
                        class="cursor-pointer pa-6 option-card ma-2 d-flex flex-column justify-center align-center"
                        rounded="lg">
                        <v-icon class="mb-2" :color="option.isHovered? 'surface' : 'black'" size="48">{{ option.icon }}
                        </v-icon>
                        <span class="caption" :style="{color:option.isHovered? 'white':'black'}">{{ option.text
                            }}</span>
                    </v-card>

                </div>
            </v-card-text>

            <v-divider></v-divider>

            <!-- Actions Section -->
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false" :disabled="!canGoBack">
                    <v-icon left>mdi-arrow-left</v-icon>
                    Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="proceed" :disabled="!canProceed">
                    Continue
                    <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getPrimary } from '@/utils/UpdateColors';

interface IOption {
    icon: string;
    text: string;
    key: string;
    isHovered: boolean;
}

const chooseOption = (key: string) => {
    switch (key) {
        case 'file':
            // code block
            alert('File');
            break;
        case 'linkedin':
            // code block
            break;
        default:
            // code block
            alert('scratch');
    }

};

const options = ref<IOption[]>([
    {
        icon: 'mdi-file-document',
        text: 'Upload Resume',
        key: 'file',
        isHovered: false
    },
    {
        icon: 'mdi-linkedin',
        text: 'Connect LinkedIn',
        key: 'linkedIn',
        isHovered: false
    },
    {
        icon: 'mdi-file-edit-outline',
        text: 'Create from scratch',
        key: 'scratch',
        isHovered: false
    }

]);

// Props and Emits
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

// State for dialog
const dialog = ref(false);

// Sync dialog state with v-model
watch(
    () => dialog.value,
    (newValue) => emit('update:modelValue', newValue)
);

watch(
    () => props.modelValue,
    (newValue) => {
        dialog.value = newValue;
    }
);

// Router setup
const router = useRouter();
const route = useRoute();


// Navigation logic
const canGoBack = computed(() => route.name !== 'ImportOptions');
const canProceed = computed(() => true); // Add validation logic if needed

const goBack = () => {
    if (canGoBack.value) {
        router.back();
    }
};

const proceed = () => {
    console.log('Continue to the next step');
};

const isHovered = ref(false);
const style = {
    backgroundColor: getPrimary
};

// Close dialog
const closeDialog = () => {
    dialog.value = false;
};
</script>

<style scoped lang="scss">


.option-card {
    transition: background-color 0.3s ease; /* Optional: for smooth hover effect */
}
</style>
