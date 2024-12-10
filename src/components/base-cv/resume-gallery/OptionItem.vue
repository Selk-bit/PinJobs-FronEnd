<script setup lang="ts">
interface IProps {
    title: string;
    icon: string;
}

const emits = defineEmits(['action']);
const props = defineProps<IProps>();

</script>

<template>
    <div class="resume-option" @click="emits('action')">
        <v-icon size="24" class="text-primary">{{ icon }}</v-icon>
        <span>{{ title }}</span>
    </div>
</template>

<style scoped lang="scss">
.resume-option {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    aspect-ratio: 6/1.9;
    height: 100%;
    gap: 20px;
    color: #ff6666;
    border-radius: 8px;
    font-weight: 500;
}

.resume-option:hover {
    //background-color: #ffe6e6;

    border: 1px solid #ff6666;
}


.resume-option span {
    font-size: 14px;
}
</style>