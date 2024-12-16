<script setup lang="ts">
import { useResumeStore } from '@/stores/resume';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CompanyLogo, Model } from '@/types/model';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const modelStore = useResumeStore();
const {layouts, model, selected} = storeToRefs(modelStore)
const tab = ref(1);

const draft = ref();
onMounted(async () => {
});
</script>
<template>


    <v-window v-model="tab">
        <v-window-item
            :value="1"
        >
            <v-container fluid>
                <!--public templates-->
                <v-row dense>
                    <v-col cols="12" class="d-flex justify-start align-center">
                        <v-icon>mdi-view-compact-outline</v-icon>
                        <h1 class="text-h2 font-weight-bold">{{ t('Models.creation.template.templateTitle') }}</h1>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" v-for="layout in layouts" :key="layout">
                        <v-card @click="()=> {
             modelStore.selectLayout(layout);
          model.templateData.template = layout;
        }" class=" template-image" rounded="rounded"
                                :class="[selected == layout ? 'template-image-selected' : '']"
                        >
                            <v-img
                                :aspect-ratio="1 / 1.4142"
                                class="bg-white cursor-pointer"
                                :src="`/assets/images/templates/${layout}.jpg`"
                                width="320"
                                cover
                                style="  border-radius: 5px;object-fit: fill;"
                            ></v-img>
                            <div class="title text-capitalize">{{ layout }} ({{selected == layout}})</div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-window-item>
        <v-window-item
            :value="2"
        >
            <v-container fluid>
                <!--private templates-->
                <div class="text-center">
                    {{ t('Models.creation.template.privateText') }}
                </div>
            </v-container>
        </v-window-item>
    </v-window>

</template>


<style scoped lang="scss">
.template-image {
    -webkit-transition: all 300ms 0ms ease-in-out;
    transition: all 300ms 0ms ease-in-out;
    border: none;

}


.title {
    //display: block;

    margin: auto;

    flex: 1;
    bottom: 0;
    display: grid;
    justify-content: center;
    align-content: center;
}

.template-image-selected {

    border: 2px solid darkcyan;
    -webkit-transform: scale(0.99);
    transform: scale(0.99);
}
</style>