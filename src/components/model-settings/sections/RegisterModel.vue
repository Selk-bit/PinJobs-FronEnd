<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Model, Template } from '@/types/model';
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useResumeStore } from '@/stores/resume';
import { useBaseCvStore } from '@/stores/base-cv';
import { useModelStore } from '@/stores/model';


const modelStore = useModelStore();
const authStore = useAuthStore();
const { model } = storeToRefs(modelStore);
const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const resumeStore = useResumeStore();
const homeStore = useBaseCvStore();


const compReference = computed(() => {
    return model.value.reference;
});


const isShowName = computed(() => {
    return model.value.templateData.personnel.name;
});
const identity = computed(() => {
    return model.value.templateData.identity;
});



async function editCV() {
    const { resume } = storeToRefs(resumeStore);
    homeStore.editCV(resume.value, model.value)
        .then(() => {
            toast.success('CV Modified successfully.');
            router.push({ name: 'resume-view' });
        })
        .catch((error) => {
            toast.error('Failed to modify CV.');
        });
}


</script>

<template>
    <!--  <v-col cols="12" md="12" class="py-0">-->
    <!--    <v-label class="mb-2 font-weight-medium">{{ t('Models.creation.register.modelName') }}</v-label>-->
    <!--    <v-text-field variant="outlined" :placeholder="t('Models.creation.register.modelName')" v-model="model.name"-->
    <!--                  color="primary"></v-text-field>-->
    <!--  </v-col>-->
    <v-col cols="12" md="12" class="py-0 " v-if="useModelStore().showCreateBtn">
        <v-row>
            <v-col>
                <v-btn variant="elevated" color="primary" @click="editCV()" :loading="loading" block>
                    Save
                </v-btn>
            </v-col>
            <v-col>
                <v-btn variant="outlined" color="primary" @click="$router.push({name:'resume-view'})"
                       block>
                    <!--      {{ $t('Models.creation.register.createModel') }}-->
                    Return to home
                </v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<style scoped lang="scss">

</style>