<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import UserCard from "@/components/settings/UserCard.vue";
import {toast} from "vue-sonner";
import type {AddUserDTO, User} from "@/types/user";
import CustomConfirmationDialog from "@/components/shared/CustomConfirmationDialog.vue";
import UILoader from "@/components/shared/UILoader.vue";

const auth = useAuthStore();
const userStore = useUserStore()
const show_password = ref(false);
const loading = ref(false);
const btn_loading = ref(false);
const userId = ref()
const {t} = useI18n()
const user = ref<AddUserDTO>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})
const ownerId = computed(() => {
  return auth.user.clientProfile?.ownerId;
})
const loggedInUser = computed(() => {
  return useAuthStore().user;
})
const delete_single_item_custom_message = reactive({
  dialog: false,
  id: '',
  title: t('modals.deleteModal.confirmTitle'),
  text: t('modals.deleteModal.confirmText'),
  yes: t('modals.deleteModal.confirm'),
  cancel: t('modals.deleteModal.cancel')
})

const create_user_email_confirmation = reactive({
  dialog: false,
  id: '',
  title: t('Settings.add.modal-confirmation.title'),
  text: t('Settings.add.modal-confirmation.text'),
  yes: t('Settings.add.modal-confirmation.confirm'),
})

async function _delete(userId: string) {
  delete_single_item_custom_message.dialog = false;
  try {
    loading.value = true;
    await userStore.DELETE_USER(userId);
    await userStore.GET_CLIENT_USERS(useAuthStore().user.clientProfileId);
    loading.value = false;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

function openDeleteDialog(id: string) {
  userId.value = id;
  delete_single_item_custom_message.dialog = true;
}

const createUserForClient = async () => {
  if (!user.value.firstName) {
    toast.error(t('Settings.add.messages.firstNameRequired'));
    return false;
  }
  if (!user.value.lastName) {
    toast.error(t('Settings.add.messages.lastNameRequired'));
    return false;
  }
  if (!user.value.email) {
    toast.error(t('Settings.add.messages.emailRequired'));
    return false;
  }
  if (!user.value.password) {
    toast.error(t('Settings.add.messages.passwordRequired'));
    return false;
  }
  try {
    btn_loading.value = true
    await userStore.ADD_USER(user.value);
    toast.success(t('Settings.add.messages.createSuccess'));
    btn_loading.value = false
    user.value = {} as AddUserDTO
    await userStore.GET_CLIENT_USERS(useAuthStore().user.clientProfileId);
    create_user_email_confirmation.dialog = true;
  } catch (err: any) {
    btn_loading.value = false
    const errData = err.response.data;
    if (errData.message == 'Credentials taken !') {
      toast.error(t('auth.register.validation.credentialsTaken'));
    }else if (errData.message == 'Email already in use !') {
      toast.error(t('auth.register.validation.credentialsTaken'));
    } else {
      toast.error(t('Settings.add.messages.errorOccurred'));
    }

  }
}
const usersList = computed(() => {
  return userStore.client_users;
})

onMounted(async () => {
  try {
    loading.value = true;
    await auth.GET_CURRENT_USER();
    await userStore.GET_CLIENT_USERS(useAuthStore().user.clientProfileId);
  } catch (error) {
    console.error("Error fetching client users:", error);
    toast.error(t('error'));
  } finally {
    loading.value = false;
  }
})

onUnmounted(() => {
  userStore.client_users = [] as User[]
})

</script>

<template>
  <div>

    <!--    <v-card rounded="lg" elevation="0" data-aos="fade-right" class="my-4" data-aos-delay="200">-->
    <v-card rounded="lg" elevation="0" class="my-2">
      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="12">
            <v-row class=" mb-10">
              <v-col>
                <h3 class=" text-h3 font-weight-bold mb-1">{{ t('Settings.add.addUsers') }}</h3>
                <div class="text-h5">{{ t('Settings.add.text') }}</div>
              </v-col>
            </v-row>

            <!--form-->
            <v-row class="mb-2">
              <v-col cols="12" md="6" class="py-0">
                <v-label class="mb-2 font-weight-medium">{{ t('auth.register.first') }}</v-label>
                <v-text-field variant="outlined" v-model="user.firstName" :placeholder="t('auth.register.first')"
                              color="primary"></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-label class="mb-2 font-weight-medium">{{ t('auth.register.last') }}</v-label>
                <v-text-field variant="outlined" :placeholder="t('auth.register.last')" v-model="user.lastName"
                              color="primary"></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-label class="mb-2 font-weight-medium">{{ t('auth.register.email') }}</v-label>
                <v-text-field variant="outlined" v-model="user.email" :placeholder="t('auth.register.email')"
                              color="primary"></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-label class="mb-2 font-weight-medium">{{ t('auth.register.password') }}</v-label>
                <VTextField
                    v-model="user.password"
                    required
                    density="compact"
                    class="mb-1"
                    :placeholder="t('auth.register.password')"
                    :type="show_password ? 'text' : 'password'"
                    :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="show_password = !show_password"
                    hide-details="auto"

                ></VTextField>
              </v-col>
              <v-col cols="12" md="6" class="py-0 my-3">
                <v-btn variant="outlined" color="primary" @click="createUserForClient" :loading="btn_loading">
                  <v-icon class="mr-1">mdi-account-plus</v-icon>
                  {{ t('Settings.add.create') }}
                </v-btn>
              </v-col>
            </v-row>

            <div class="text-h5 mt-10">{{ t('Settings.add.list') }}</div>
            <v-row class="mb-10 mt-5 overflow-y-auto" style="max-height: 400px">
              <v-col cols="12" v-if="loading">
                <div class="text-capitalize text-center text-h5">
                  <v-overlay v-model="loading" v-if="loading" class="d-flex justify-center align-center">
                    <UILoader/>
                  </v-overlay>
                </div>
              </v-col>
              <v-col cols="12" v-if="usersList?.length < 0">
                <div class="text-capitalize text-center text-h5">
                  No users found
                </div>
              </v-col>
              <v-col cols="12" v-else>
                <UserCard v-for="user in usersList"
                          :show="ownerId != user.id"
                          :first-name="user.firstName"
                          :last-name="user.lastName"
                          @delete="openDeleteDialog(user.id)"
                          :email="user.email"/>
              </v-col>

            </v-row>

          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CustomConfirmationDialog
        :cancel-text-button="delete_single_item_custom_message.cancel"
        :confirm-text-button="delete_single_item_custom_message.yes"
        :dialog="delete_single_item_custom_message.dialog"
        :text="delete_single_item_custom_message.text"
        @reject="delete_single_item_custom_message.dialog = false"
        @accept="_delete(userId)"
        :title="delete_single_item_custom_message.title"/>
  </div>
  <CustomConfirmationDialog :title="create_user_email_confirmation.title"
                             :dialog="create_user_email_confirmation.dialog"
                            :confirm-text-button="create_user_email_confirmation.yes"
                            :text="create_user_email_confirmation.text"
                            @accept="create_user_email_confirmation.dialog = false"/>
</template>

<style scoped lang="scss">

</style>