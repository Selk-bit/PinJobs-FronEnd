<template>
    <EditableInput
        v-model:is-edit-enabled="isEdit"
        v-model:text="resumeTitle"
        @update="updateResumeTitle"
    />
    {{ resumeTitle }}
    <v-btn @click="isEdit =!isEdit ">is edit</v-btn>
</template>

<script setup>
import EditableInput from '@/components/shared/EditableInput.vue';
import { ref } from 'vue';

const resumeTitle = ref('Oussama Reghay Resume');
const isEdit = ref(false);

const updateResumeTitle = (newTitle) => {
    resumeTitle.value = newTitle;
};
</script>
