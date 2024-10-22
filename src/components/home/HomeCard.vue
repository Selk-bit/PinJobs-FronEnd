<script setup lang="ts">
import { useParallax } from '@vueuse/core';
import { computed, type CSSProperties, reactive, ref } from 'vue';

const card = ref(null);
const hover = ref(false);
const parallax = reactive(useParallax(card));
const SCALE = -20;
interface IProps {
    icon: string;
    title: string;
    subtitle: string;
}

const emit = defineEmits(['open']);
const props = withDefaults(defineProps<IProps>(), {
    icon: 'mdi-plus',
    title: 'Create a new resume',
    subtitle: 'Start building from scratch'
});
const layerBase: CSSProperties = {
    transition: '.3s ease-out all'
};
const layer0 = computed(() => ({
    ...layerBase,
    transform: `rotateX(${parallax.tilt * SCALE}deg) rotateY(${
        parallax.roll * SCALE
    }deg) scale(1)`
}));


</script>

<template>
    <div class="container">
        <v-card
            :style="hover ? layer0 : {}"
            ref="card"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            @click="$emit('open')"
            class="relative card-item cursor-pointer text-primary flex flex-column align-center justify-center "
        >
            <v-icon size="64" class="mb-3" :weight="'thin'">{{ icon }}</v-icon>
            <div
                class="absolute inset-x-0 bottom-0 z-10
                 flex flex-col text-center justify-end space-y-0.5 p-4 pt-12 bg-gradient-to-t from-background/80 to-transparent"
            >
                <h4 class="font-medium mb-3 ">
                    {{ title }}
                </h4>
                <p class="text-xs px-2 opacity-75">{{ subtitle }}</p>
            </div>
        </v-card>

    </div>
</template>

<style scoped lang="scss">
.card-item {
    position: relative;
    display: flex;
    aspect-ratio: 1 / 1.4142;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    //background-color: rgba(0, 0, 0, 0.5); /* This is the bg-secondary/50 part, assuming secondary color is black */
    padding: 0;
    transition: transform 0.1s ease;
}

.container:hover {
    transform: scale(103%);
    transition: transform 0.1s ease; /* Scale up the div on hover */
}
</style>