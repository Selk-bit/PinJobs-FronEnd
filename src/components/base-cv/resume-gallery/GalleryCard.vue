<script setup lang="ts">

const emit = defineEmits(['select-model']);

const props = defineProps<{
    image: string;
    title: string;
    usageCount: string;
}>();
</script>

<template>
    <v-card
        color="lightWhite"
        @click="$emit('select-model')"
        outlined
        class="ma-3 resume-card cursor-pointer mx-2"
        elevation="0"
    >
        <!-- Image Section -->
        <v-img :src="image" cover class="resume-image" />

        <!-- Card Content -->
        <div class="pa-3">
            <h3 class="text-subtitle-1 font-weight-bold mb-1">
                {{ title }}
            </h3>
            <div class="text-body-2 text-grey">
                Chosen by {{ usageCount }} users
            </div>
        </div>
    </v-card>
</template>

<style scoped lang="scss">
.resume-card {
    height: 400px;
    width: 290px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s, box-shadow 0.3s;
}

.resume-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.resume-image {
    height: 310px;
    width: auto;
    border-bottom: 1px solid #e0e0e0;
    margin: 1px;
    border-radius: 19px;
}

.create-resume-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.text-grey {
    color: #6c757d;
}
</style>