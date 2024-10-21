<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";

const {t} = useI18n()
const route = useRoute();
const projectId = Number.parseInt(Array.isArray(route.params.projectId) ? route.params.projectId[0] : route.params.projectId);


// snackbar
const snackbar = ref(false);
const snackMessage = ref('');
const snackColor = ref('info');

function triggerSnackbar(text: string, color: string) {
  snackMessage.value = text;
  snackColor.value = color;
  snackbar.value = true;
}


// options

const options = ref({
  chart: {
    id: "vuechart-example",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
      borderRadiusApplication: 'end',
      dataLabels: {
        position: 'top',

      },
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },

  colors: ['#8c9dde',
  ],
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',

    ],
  }
});


const series = ref([{
  data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
}
])


</script>

<template>


  <v-card elevation="10" class="pb-0">
    <v-card-text >
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="text-h4">{{ $t('Dashboard.latestStatistics') }}</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div class="d-flex align-center">
            <div class="d-flex align-center px-2">
              <span class="text-primary">
                <span class="text-overline">
                  <i class="mdi mdi-brightness-1 mx-1"></i>
                </span>
                <span class="text-subtitle-1">Ample</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span class="text-secondary">
                <span class="text-overline">
                  <i class="mdi mdi-brightness-1 mx-1"></i>
                </span>
                <span class="text-subtitle-1">Pixel Admin</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
       <apexchart
          width="100%"
          type="bar"
          height="auto"

          :options="options"
          :series="series"
      ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">

</style>