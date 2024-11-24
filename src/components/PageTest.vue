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
        <div>
            <v-btn color="primary" flat @click="dialog = !dialog">Create base resume</v-btn>
        </div>

        <ImportOptionsView v-model="dialog" />
    </v-container>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue';
import { ref } from 'vue';
import ImportOptionsView from '@/views/base-cv/ImportOptionsView.vue';

const loading = ref(false);
const dialog = ref(false)
</script>

<style scoped>
/* Add any necessary custom styling here */
</style>
