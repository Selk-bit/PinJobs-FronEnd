<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Model, Template } from '@/types/model';
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useResumeStore } from '@/stores/resume';


const authStore = useAuthStore();
const resumeStore = useResumeStore();
const { model } = storeToRefs(resumeStore);
const { t } = useI18n();
const router = useRouter();
const loading = ref(false);



const compReference = computed(() => {
    return model.value.reference;
});


const isShowName = computed(() => {
    return model.value.templateData.personnel.name;
});
const identity = computed(() => {
    return model.value.templateData.identity;
});



async function editBAseCV() {
    const { resume } = storeToRefs(resumeStore);
    resumeStore.EDIT_BASE_CV(resume.value, model.value)
        .then(() => {
            toast.success('CV Modified successfully.');
            router.push({ name: 'resume-view' });
        })
        .catch((error:any) => {
            toast.error('Failed to modify CV.');
        });
}


</script>

<template>

    <v-col cols="12" md="12" class="py-0 " >
        <v-row>
            <v-col>
                <v-btn variant="elevated" color="primary"  :loading="loading" block>
                    Save
                </v-btn>
            </v-col>
            <v-col>
                <v-btn variant="outlined" color="primary" @click="$router.push({name:'resume-view'})"
                       block>
                    Return to home
                </v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<style scoped lang="scss">

</style>