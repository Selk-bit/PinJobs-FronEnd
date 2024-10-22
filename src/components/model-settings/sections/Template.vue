<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import type {CompanyLogo, Model,} from "@/types/model";
import {useAuthStore} from "@/stores/auth";

const {t} = useI18n()
const modelStore = useModelStore();
const model = ref<Model>({} as Model);
const tab = ref(1);

const draft = ref();
onMounted(async () => {
  model.value = modelStore.model.templateData;
  // draft.value = await modelStore.GET_TEMPLATE_DRAFT_BY_CLIENT_ID(useAuthStore().user.clientProfile?.id);
})
</script>
<template>


<!--  <v-tabs-->
<!--      v-model="tab"-->
<!--      align-tabs="center"-->
<!--  >-->
<!--&lt;!&ndash;    <v-tab :value="1">{{ t('Models.creation.template.public') }}</v-tab>&ndash;&gt;-->
<!--&lt;!&ndash;    <v-tab :value="2">{{ t('Models.creation.template.private') }}</v-tab>&ndash;&gt;-->
<!--  </v-tabs>-->

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
          <v-col cols="12" md="6" lg="4" v-for="item in modelStore.templates" :key="item">
            <v-card @click="()=> {
          modelStore.SetTemplate(item);
          model.template = item;
        }" class=" template-image" rounded="rounded"
                    :class="[modelStore.selected == item ? 'template-image-selected' : '']"
            >
              <v-img
                  :aspect-ratio="1 / 1.4142"
                  class="bg-white cursor-pointer"
                  :src="`/assets/images/templates/${item}.jpg`"
                  width="320"
                  cover
                  style="  border-radius: 5px;object-fit: fill;"
              ></v-img>
              <div class="title text-capitalize">{{ item }}</div>
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