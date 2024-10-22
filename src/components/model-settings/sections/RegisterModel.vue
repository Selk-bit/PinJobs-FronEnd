<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import type {Model, Template} from "@/types/model";
import {toast} from "vue-sonner"
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const modelStore = useModelStore();
const authStore = useAuthStore();
const {t} = useI18n()
const {model} = storeToRefs(modelStore)
const router = useRouter();
const loading = ref(false);

const compReference = computed(() => {
  return model.value.reference;
})


const isShowName = computed(() => {
  return model.value.templateData.personnel.name;
})
const identity = computed(() => {
  return model.value.templateData.identity;
})
async function createModel() {
  if (model.value.language == null || model.value.language == '') {
    toast.error('Language empty');
  }
  else if (model.value.name == null || model.value.name == '') {
    toast.error('Name empty');
  } else if (!isShowName.value && (!compReference.value) && identity.value == 'reference' ) {
    toast.error('Reference  empty');
  } else {
    try {
      console.log(model.value.language);
      loading.value = true;
      await modelStore.CREATE_TEMPLATE({
        name: model.value.name,
        language: model.value.language,
        reference: model.value.reference,
        clientProfileId: authStore.user.clientProfileId,
        templateData: model.value.templateData
      });

      toast.success(t('Models.creation.register.modelCreated'));
      await router.push({name: "models-consultation"})
      loading.value = false;
    } catch (e: any) {
      console.log(e.response.data.message.toString());
      loading.value = false;
      toast.error(e.response.data.message.toString())
    }
  }

}


</script>

<template>
  <v-col cols="12" md="12" class="py-0">
    <v-label class="mb-2 font-weight-medium">{{ t('Models.creation.register.modelName') }}</v-label>
    <v-text-field variant="outlined" :placeholder="t('Models.creation.register.modelName')" v-model="model.name"
                  color="primary"></v-text-field>
  </v-col>
  <v-col cols="12" md="12" class="py-0 " v-if="useModelStore().showCreateBtn">
    <v-row>
      <v-col>
        <v-btn variant="elevated" color="primary" @click="$router.push({name:'home'})" :loading="loading" block>
          {{ t('Models.creation.register.createModel') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn variant="outlined" color="primary" @click="$router.push({name:'models-consultation'})"
               block>
          <!--      {{ $t('Models.creation.register.createModel') }}-->
        {{ t('Models.creation.register.backToModels') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<style scoped lang="scss">

</style>