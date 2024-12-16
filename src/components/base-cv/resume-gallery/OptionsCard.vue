<script setup>

</script>

<template>
    <v-card
        class="resume-card  d-flex flex-column justify-space-between"
        elevation="10"
    >
        <slot></slot>
    </v-card>
</template>


<style scoped lang="scss">

.resume-card {
    max-width: 373px;
    aspect-ratio: 3/3.7;
    padding: 16px;
    margin: 4px;
    border-radius: 24px!important;
    border-color: #ff6666; /* Highlight border color */
    border-style: dashed;
    border-width: 1px;
    transition: all 0.3s ease;
    cursor: pointer;
}


.resume-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}


</style>
