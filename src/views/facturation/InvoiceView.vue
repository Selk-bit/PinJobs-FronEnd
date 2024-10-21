<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import type {Header} from 'vue3-easy-data-table';
import {ref, computed, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import Invoice from "@/components/invoice/Invoice.vue";
import {useCustomizerStore} from "@/stores/customizer";

const {t} = useI18n();

const page = computed(() => ({title: t("Invoices.invoice")}));
const breadcrumbs = computed(() => [
  {text: t("Invoices.billing"), disabled: false, href: "#"},
  {text: t("Invoices.invoice"), disabled: true, href: "#"},
]);

const searchValue = ref('');
const headers = computed(() => [
  {text: t("Invoices.headers.ID"), value: "id"},
  {text: t("Invoices.headers.subscription"), value: "subscription", sortable: true},
  {text: t("Invoices.headers.createdAt"), value: "createdAt", sortable: true},
  {text: t("Invoices.headers.amount"), value: "amount", sortable: true},
  {text: t("Invoices.headers.updatedAt"), value: "updatedAt", sortable: true},
  {text: t("Invoices.headers.actions"), value: "actions"}
]);

const rows: any = ref([
  {"id": 1, "subscription": "Premium", "amount": "XX.XX", "createdAt": "2004-05-28", "updatedAt": "2004-05-28"},
  {"id": 2, "subscription": "Standard", "amount": "XX.XX", "createdAt": "2004-05-28", "updatedAt": "2004-05-28"}
]);

const table_loading = ref(false);

onMounted(() => {
  table_loading.value = true;
  setTimeout(() => {
    table_loading.value = false;
  }, 1000);
});

const filteredList = computed(() => {
  return rows.value;
});

const showInvoiceDialog = ref(false);

const openInvoiceDialog = () => {
  showInvoiceDialog.value = true;
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div>
        <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

        <v-row justify="space-between" class="align-center mb-3">
          <v-col cols="12" md="3">
            <v-text-field type="text" variant="solo" :placeholder="t('Invoices.searchBySubscription')"
                          v-model="searchValue"
                          density="comfortable" hide-details prepend-inner-icon="mdi-magnify"/>
          </v-col>
        </v-row>

        <EasyDataTable
            :headers="headers"
            :items="filteredList"
            :class="{ 'customize-table-dark': useCustomizerStore().actTheme == 'DARK_GREEN_THEME',  }"
            class="customize-table"
            :loading="table_loading">
          <template #empty-message>
            <v-icon size="30">mdi-folder-search-outline</v-icon>
            <div>{{ $t("Invoices.noRecordsFound") }}</div>
          </template>
          <template #loading>
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </template>
          <template #item-actions="{ item }">
            <v-btn size="30" icon variant="plain">
              <v-avatar size="22">
                <v-icon class="text-primary">mdi-dots-vertical</v-icon>
              </v-avatar>
              <v-menu activator="parent">
                <v-list>
                  <v-list-item value="action" hide-details min-height="38">
                    <v-list-item-title @click="openInvoiceDialog">
                      <v-avatar size="20" class="mr-2">
                        <v-icon>mdi-view-carousel-outline</v-icon>
                      </v-avatar>
                      {{ $t("Invoices.visualize") }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>
        </EasyDataTable>
      </div>
    </v-col>
  </v-row>

  <v-dialog v-model="showInvoiceDialog" class="backdrop" max-width="900">
    <Invoice/>
  </v-dialog>
</template>

<style scoped>

</style>
