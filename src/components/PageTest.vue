<template>
    <v-container>
        <div>
            <PageHeader title="Job Hub"
                        subtitle="Your job hub is where you can manage all your application kits and track job applications.">

<!--                <template v-slot:actions>-->
<!--                        <v-btn-->
<!--                            class="ml-auto mr-1"-->
<!--                            color="primary"-->
<!--                            large-->
<!--                            :block="$vuetify.display.mobile"-->
<!--                            size="small"-->
<!--                            outlined-->
<!--                        >-->
<!--                            update resume-->
<!--                        </v-btn>-->
<!--                </template>-->
            </PageHeader>
        </div>

    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import PickDate from '@/components/shared/PickDate.vue';
import PageHeader from '@/components/shared/PageHeader.vue';

// State variables using ref
const formCheckbox = ref(false);  // Form checkbox value
const dialogCheckbox = ref(false);  // Dialog checkbox value
const dialog = ref(false);  // Dialog visibility
const date = ref('03-10-2024');
// Method to save changes
const saveChanges = () => {
    if (dialogCheckbox.value) {
        formCheckbox.value = true;  // Set form checkbox to true if dialog checkbox is checked
    }
    dialog.value = false;  // Close the dialog after saving changes
};
</script>

<style scoped>
/* Add any necessary custom styling here */
</style>
