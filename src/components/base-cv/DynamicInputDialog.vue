<script setup lang="ts">
import { ref, watch } from 'vue';

interface IProps {
    dialog?: boolean;
    dialogTitle?: string;
    dialogSubTitle?: string;
    cancelText?: string;
    importText?: string;
    placeholder?: string;
    prependIcon?: string;
    appendIcon?: string;
    error?: string;
    modelValue?: string; // Input value for v-model
}

const props = withDefaults(defineProps<IProps>(), {
    dialog: false,
    dialogTitle: 'Default Dialog Title',
    dialogSubTitle: 'Default subtitle for the dialog',
    cancelText: 'Cancel',
    importText: 'Generate',
    placeholder: 'Enter your input',
    prependIcon: 'mdi-linkedin',
    appendIcon: '',
    error: '',
    modelValue: '' // Default input value
});

const emits = defineEmits(['update:dialog', 'generate', 'update:error', 'update:modelValue']);

const dialogState = ref(props.dialog);
const inputValue = ref(props.modelValue); // Bind the input value to v-model
const inputErrors = ref(props.error);

watch(
    () => props.dialog,
    (newVal) => {
        dialogState.value = newVal;
    }
);

watch(dialogState, (newVal) => {
    emits('update:dialog', newVal);
});

watch(
    () => props.modelValue,
    (newVal) => {
        inputValue.value = newVal;
    }
);

watch(inputValue, (newVal) => {
    emits('update:modelValue', newVal);
});

watch(
    () => props.error,
    (newVal) => {
        inputErrors.value = newVal;
    }
);

const handleGenerate = () => {
    if (!inputValue.value) {
        inputErrors.value = 'Input is required';
        emits('update:error', inputErrors.value);
        return;
    }

    // Clear error if input is valid
    inputErrors.value = '';
    emits('update:error', inputErrors.value);

    emits('generate', inputValue.value);
};

const handleCloseDialog = () => {
    dialogState.value = false;
};
</script>

<template>
    <v-dialog v-model="dialogState" class="backdrop" width="700px" persistent>
        <v-card class="pa-2" rounded="lg">
            <v-card-title class="d-flex pa-3 text-wrap text-center align-center flex-column justify-space-between">
                <div class="text-h4">{{ dialogTitle }}</div>
                <div class="text-body-1">{{ dialogSubTitle }}</div>
            </v-card-title>
            <VTextField
                :prepend-inner-icon="prependIcon"
                :append-icon="appendIcon"
                v-model="inputValue"
                class="mb-6 px-2"
                required
                :error-messages="inputErrors"
                :placeholder="placeholder"
                hide-details="auto"
            ></VTextField>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn prepend-icon="mdi-arrow-left" color="primary" @click="handleCloseDialog">
                    {{ cancelText }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    prepend-icon="mdi-creation"
                    variant="outlined"
                    @click="handleGenerate"
                >
                    {{ importText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
</style>
