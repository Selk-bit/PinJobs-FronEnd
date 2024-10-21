<script setup lang="ts">
import { ref } from "vue";
import {useI18n} from "vue-i18n";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import StatisticsLineChart from "@/components/dashboard/StatisticsLineChart.vue";
import Balance from "@/components/dashboard/Balance.vue";
import StatisticsBarChart from "@/components/dashboard/StatisticsBarChart.vue";


const {t} = useI18n()
const page = ref({ title: t("Dashboard.Analytical") });
const breadcrumbs = ref([
  {
    text: t('dashboard'),
    disabled: false,
    href: "#",
  },
  {
    text: t("Dashboard.Analytical"),
    disabled: true,
    href: "#",
  },
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <!---Welcome cards / Earnings / monthlyrevenue-->
    <v-col cols="12" sm="12" lg="6">
      <StatisticsBarChart  />
    </v-col>
    <!---Sales overview-->
    <v-col cols="12" sm="12" lg="6">
      <Balance />
    </v-col>
     <!---Total sales-->

     <!---Product month table-->
    <v-col cols="12" sm="12" lg="12">
      <StatisticsLineChart />
    </v-col>
     <!---Blog card-->



  </v-row>
</template>
