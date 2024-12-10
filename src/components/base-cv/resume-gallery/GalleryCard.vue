<script setup lang="ts">

const emits = defineEmits(['select-model', 'rename', 'delete', 'edit', 'download']);


interface IProps {
    image: string;
    title: string;
    isResume?: boolean;
    isTemplate?: boolean;
    usageCount: string;
    isCount: boolean;

}

const props = withDefaults(defineProps<IProps>(), {
    isResume: false,
    isTemplate: false,
    isCount: false
});
</script>

<template>
    <div
        @click="$emit('select-model')"
        class="bg-surface   resume-card  cursor-pointer "
    >
        <!-- Image Section -->
        <img :src="image" class="resume-image" />

        <!-- Card Content -->
        <div class="">
            <div class="mt-3 ml-3  " v-if="isTemplate">
                <h3 class="text-subtitle-1 font-weight-light mb-1">
                    {{ title }}
                </h3>
                <div class="text-body-2 text-grey" v-if="isCount">
                    Chosen by {{ usageCount }} users
                </div>
            </div>
            <div class="mt-3 ml-3 d-flex justify-space-between    " v-if="isResume">
                <h3 class="text-subtitle-1 font-weight-light mb-1">
                    {{ title }}
                </h3>
                <div class="text-body-2 text-grey">
                    <v-btn size="30" icon variant="plain">
                        <v-avatar size="22">
                            <v-icon class="text-primary">mdi-dots-horizontal</v-icon>
                        </v-avatar>
                        <v-menu activator="parent" eager>
                            <v-list class="" rounded="lg" density="compact">
                                <v-list-item rounded="md" value="action" @click="emits('rename')">
                                    <v-list-item-title>
                                        Rename
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item rounded="md" value="action" @click="emits('download')">
                                    <v-list-item-title>
                                        Download
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item rounded="md" value="action" @click="emits('edit')">
                                    <v-list-item-title>
                                        Edit
                                    </v-list-item-title>
                                </v-list-item>
                                <v-divider />
                                <v-list-item rounded="md" value="action" @click="emits('delete')">
                                    <v-list-item-title class="text-error">
                                        Delete
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.resume-card {
    //width: 90%; /* Or a fixed width like 300px */
    max-width: 373px; /* Optional max width for larger screens */
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    margin: 5px;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s, box-shadow 0.3s;
    //box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.resume-card:hover {
    //transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.resume-image {
    aspect-ratio: 3/4.1;
    max-height: 410px;
    min-width: 120px;
    border-radius: 10px;
}

.create-resume-card:hover {
    //transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.text-grey {
    color: #6c757d;
}
</style>