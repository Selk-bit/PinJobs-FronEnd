<script setup lang="ts">

import { ref, watch } from 'vue';
import EditableInput from '@/components/shared/EditableInput.vue';
import { truncateString } from '@/utils/helpers/truncate-string';
const emits = defineEmits(['click', 'rename', 'update:name', 'delete', 'edit', 'download']);
interface IProps {
    image: string;
    title: string;
    isResume?: boolean;
    isTemplate?: boolean;
    usageCount?: string;
    isCount?: boolean;
    editMenu?: boolean;
    name?: string;
}
const props = withDefaults(defineProps<IProps>(), {
    isResume: false,
    isTemplate: false,
    isCount: false,
    editMenu: false,
    name: ''

});
const nameState = ref(props.name);
const isEditing = ref(false);
watch(() => props.name, (val) => nameState.value = val);
watch(nameState, (val) => emits('update:name', val));

// Methods
const startEditing = () => {
    isEditing.value = true;
};
const closeEdit = (val: boolean) => {
    isEditing.value = val;
};

const saveTitle = (val: string) => {
    emits('update:name', val);
    isEditing.value = false;
};
</script>

<template>
    <div
        class="bg-surface   resume-card  cursor-pointer "
    >
        <!-- Image Section -->
        <img v-if="image" :src="image" class="resume-image" @click="$emit('click')" alt="sa" />
        <!-- Card Content -->
        <div>
            <div class="mt-3 ml-3  " v-if="isTemplate">
            <v-divider />
                <h3 class="text-subtitle-1 font-weight-light mb-1">
                    {{ truncateString(title,39) }}
                </h3>
                <div class="text-body-2 text-grey" v-if="isCount">
                    Chosen by {{ usageCount }} users
                </div>
            </div>
            <v-divider />
            <div class="ma-3  align-center d-flex justify-space-between   " v-if="isResume">
                <!-- Input for editing when in editing mode -->
                <EditableInput
                    v-model:text="nameState"
                    @update-edits-tate="(val) => closeEdit(val)"
                    v-model:is-edit-enabled="isEditing"
                    @confirm-edit="(val) => saveTitle(val)"
                />

                <!-- Edit/Save button -->

                <div v-if="!isEditing" class="text-body-2  text-grey  mr-2 mb-2">
                    <v-btn size="30" icon variant="plain">
                        <v-avatar size="22">
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-avatar>
                        <v-menu activator="parent">
                            <v-list class="" rounded="lg" density="compact" variant="flat">
                                <v-list-item rounded="md" variant="flat" value="action" @click="startEditing">
                                    <v-list-item-title>
                                        Rename
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item rounded="md" variant="flat" value="action" @click="emits('download')">
                                    <v-list-item-title>
                                        Download
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item rounded="md" variant="flat" value="action" @click="emits('edit')">
                                    <v-list-item-title>
                                        Edit
                                    </v-list-item-title>
                                </v-list-item>
                                <v-divider />
                                <v-list-item rounded="md" variant="flat" value="action" @click="emits('delete')">
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
    max-width: 373px; /* Optional max width for larger screens */
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    margin: 5px;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.resume-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.resume-image {
    aspect-ratio: 3.2/4.1;
    max-height: 410px;
    min-width: 270px;
}

.create-resume-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.text-grey {
    color: #6c757d;
}

.no-border {
    font-size: 13px;
}
</style>