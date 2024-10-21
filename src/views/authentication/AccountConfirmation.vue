<template>
  <v-app :theme="useCustomizerStore().actTheme">
    <v-container>
      <div class="d-flex justify-center align-center text-center mt-6 h-100">
        <div>
          <img src="@/assets/images/illustrations/confirmation.svg" width="300" alt="404"/>
          <h1 class="text-h1 pt-3">{{ initState.title }}</h1>
          <h4 class="text-h4 my-5">{{ initState.text }}</h4>
          <v-btn flat color="primary" :variant="variant" :disabled="disable" :loading="loading" class="mb-4"
                 @click="verify">
            {{ initState.buttonText }}
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app>
</template>


<script setup lang="ts">
import {useCustomizerStore} from "@/stores/customizer";
import {reactive, ref} from "vue";
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import {useRoute, useRouter} from "vue-router";


const route = useRoute();
const router = useRouter();
const auth = useAuthStore()
const loading = ref<boolean>(false)
const disable = ref<boolean>(false)
const variant = ref<"text" | "outlined" | "plain" | "flat" | "elevated" | "tonal" | undefined>('elevated')
const {t} = useI18n()
const initState = reactive({
  buttonText: t('auth.account-confirmation.verify'),
  title: t('auth.account-confirmation.title-initial'),
  text: t('auth.account-confirmation.text-initial'),

})


async function verify() {
  loading.value = true;
  try {
    await auth.VERIFY_ACCOUNT(route.query.token as string,route.params.id as string);
    initState.buttonText = t('auth.account-confirmation.verified');
    initState.title = t('auth.account-confirmation.title-verification-success');
    initState.text = t('auth.account-confirmation.text-verification-success');
    toast.success(t('auth.account-confirmation.verification-success'))
    setTimeout(() => {
      router.push({name: 'login'})
    }, 2000)
    disable.value = true;
    variant.value = 'tonal'
    loading.value = false;
  } catch (err: any) {
    toast.error(t('error'))
  } finally {
    disable.value = false;
    variant.value = 'elevated'
    loading.value = false;
  }
}

</script>