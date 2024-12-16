<template>
    <div
        class="resume-container"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <!-- Display Title -->
        <div v-if="!isEditing" @click="startEditing" class="resume-title">
            {{ truncateString(title,30) }}
        </div>

        <!-- Editing Input -->
        <div v-else class="edit-container">
            <input
                type="text"
                v-model="editableTitle"
                class="edit-input"
                @keydown.enter="saveTitle"
            />
            <button class="icon-button done-btn" @click="saveTitle">✔️</button>
            <button class="icon-button done-btn" @click="closeEditing">❌</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { truncateString } from '@/utils/helpers/truncate-string';

interface IProps {
    text: string;
    isEditEnabled: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:text',  'confirm-edit', 'update-edits-tate']);

const title = ref(props.text);
const editableTitle = ref(title.value);


const isEditing = ref(props.isEditEnabled);
const isHovered = ref(false);

// Watch props to keep local state synchronized
watch(
    () => props.text,
    (newVal) => {
        title.value = newVal;
    }
);

watch(
    () => props.isEditEnabled,
    (newVal) => {
        isEditing.value = newVal;
    }
);

// Emit updates to parent component
watch(title, (newVal) => emits('update:text', newVal));
watch(isEditing, (newVal) => emits('update-edits-tate', newVal));

// Functions
const startEditing = () => {
    isEditing.value = true;
    emits('update-edits-tate', isEditing.value);
    editableTitle.value = title.value;
};

const saveTitle = () => {
    title.value = editableTitle.value;
    emits('confirm-edit', editableTitle.value);
    closeEditing();
};


const closeEditing = () => {
    isEditing.value = false;
    emits('update-edits-tate', isEditing.value);

};
</script>

<style scoped lang="scss">
.resume-container {
    border-radius: 8px;
    display: flex;
     flex: 1;
    margin: 6px;
    font-size: 13px;
    transition: border 0.3s ease;
}

.resume-title {
    margin: 0;
    cursor: pointer;
}

.edit-container {
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
}

.edit-input {
    flex: 1;
    margin: 2px;

    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.icon-button {
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
