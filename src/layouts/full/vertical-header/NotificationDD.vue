<script setup lang="ts">
import {notifications} from '@/_mockApis/headerData';
import {storeToRefs} from "pinia";
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";


const {t} = useI18n();



</script>
<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn icon class="" flat v-bind="props">
        <v-badge  :dot="notifications.length == 0" :content="notifications.length"  color="primary">
          <BellIcon stroke-width="1.5" size="24"/>
        </v-badge>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="360" elevation="10">
      <div class="px-8 pb-4 pt-6">
        <div class="d-flex align-center justify-space-between">
          <h6 class="text-h5">{{ $t('notifications.title') }}</h6>
          <v-chip color="primary" variant="flat" size="small" class="text-white">
            {{ notifications.length > 0 ? notifications.length + ' ' + t('notifications.new') : '0' }}
          </v-chip>
        </div>
      </div>
      <perfect-scrollbar style="height: 400px">
        <v-list class="py-0 theme-list" lines="two" v-if="notifications.length > 0">
          <v-list-item  v-for="item in notifications" :key="item.title" :value="item"
                       active-color="primary" class="py-4 px-8">
            <template v-slot:prepend>
              <v-avatar size="48" color="primary" class="mr-3">
                <!--                                <v-img :src="item.avatar" width="48" :alt="item.avatar" />-->
                <v-icon color="surface">mdi-check</v-icon>
                <!--                              <v-icon color="error" >mdi-close-circle-outline</v-icon>-->
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-semibold ">{{ item.title }}</h6>
            </div>
            <!--                        <p class="text-subtitle-1 font-weight-regular text-medium-emphasis">{{ item.desc }}</p>-->
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
        <div class="flex-column text-center justify-center" v-else>
          <!--              <v-img :src="nodata" height="100"/>-->
          <v-icon>mdi-bell</v-icon>
          <div>
            {{ $t('notifications.noNotifications') }}
          </div>
        </div>
      </perfect-scrollbar>
      <div class="py-4 px-6 text-center">
        <v-btn color="primary" variant="outlined" block>{{
            $t('notifications.clear')
          }}
        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
