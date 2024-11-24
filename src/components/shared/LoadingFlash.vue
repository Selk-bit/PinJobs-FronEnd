<script setup lang="ts">
import { getPrimary } from '@/utils/UpdateColors';
import { computed } from 'vue';

const props = defineProps<{
    text?: string;
    size?: number;
}>();
const getSize = computed(() => {
    return props.size+ 'px';
});


</script>

<template>
    <div class=" d-flex justify-center align-center flex-column">
        <div :style="{height:getSize,width:getSize}" class="loader border-primary"></div>
        <div v-if="text" class=" mt-3 poppins">
            {{ text }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.loader {

    border-color: v-bind(getPrimary);
    border-width: 5px;
    border-style: solid;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    animation: pulse 1s linear infinite;
}

.loader:after {
    content: '';
    position: absolute;
    width: v-bind(getSize);
    height: v-bind(getSize);
    border-color: v-bind(getPrimary);
    border-width: 5px;
    border-style: solid;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
    0% {
        transform: translate(-50%, -50%) scale(0)
    }
    60%, 100% {
        transform: translate(-50%, -50%) scale(1)
    }
}

@keyframes pulse {
    0%, 60%, 100% {
        transform: scale(1)
    }
    80% {
        transform: scale(1.2)
    }
}
</style>