<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {useCustomizerStore} from '@/stores/customizer';
import {useSettingStore} from "@/stores/settings";
import {useDisplay} from "vuetify";
import {GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellIcon, ShoppingCartIcon} from 'vue-tabler-icons';
import LanguageDD from './LanguageDD.vue';
import NotificationDD from './NotificationDD.vue';
// import MessagesDD from './MessagesDD.vue';
import ProfileDD from './ProfileDD.vue';
import Searchbar from './Searchbar.vue';
import Logo from '../logo/Logo.vue';
// import LogoIcon from '../logo/LogoIcon.vue'
import RightMobileSidebar from './RightMobileSidebar.vue';
import Navigations from './Navigations.vue';
import CreditBalance from "@/components/app-bar/CreditBalance.vue";
import Theme from "@/components/model-settings/sections/Theme.vue";
import ThemeMenu from "@/components/shared/ThemeMenu.vue";

const {mobile} = useDisplay()
const settings = useSettingStore();
const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
const isDragModeActive = computed(() => {
  if (mobile) {
    return false
  } else if (settings.dragModel) {
    return true;
  }
})

function searchbox() {
  showSearch.value = !showSearch.value;
}

watch(priority, (newPriority) => {
  priority.value = newPriority;
});

</script>

<template>
  <!--
    height 64-->
  <v-app-bar elevation="0" :priority="priority" height="48" color="background" id="top">


    <!--      Top app bar-->
    <v-btn
        class="hidden-md-and-down"
        icon=""
        color="primary"
        variant="text"
        v-if="!mobile"
        @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <v-icon size="27">mdi-sort-variant</v-icon>
    </v-btn>
    <v-btn class="hidden-lg-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
      <v-icon size="27">mdi-sort-variant</v-icon>
    </v-btn>
    <v-tooltip text="Model settings" v-if="$route.name == 'create-model'">
      <template v-slot:activator="{ props }">
        <v-btn flat icon="mdi-text-box-edit-outline" @click="settings.toggleModelDrawer()"
               class="text-primary "
               v-bind="props"></v-btn>
      </template>
    </v-tooltip>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->        <!-- ---------------------------------------------- -->

    <!--    <Searchbar/>-->


    <!---/Search part -->

    <!-- ---------------------------------------------- -->
    <!-- Mega menu -->
    <!-- ---------------------------------------------- -->
    <!-- <div class="hidden-md-and-down">
        <Navigations />
    </div> -->
    <v-spacer/>

    <!--    <v-btn-->
    <!--        class="customizer-btn"-->
    <!--        size="large"-->
    <!--        icon-->
    <!--        variant="flat"-->
    <!--        color="primary"-->
    <!--        @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"-->
    <!--    >-->
    <!--      <SettingsIcon/>-->
    <!--    </v-btn>-->
    <!--    <v-btn icon variant="text" color="primary" @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">-->
    <!--      <v-icon>mdi-cog-outline</v-icon>-->
    <!--    </v-btn>-->

    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->

    <!--    <LanguageDD/>-->

    <!-- ---------------------------------------------- -->
    <!-- ShoppingCart -->
    <!-- ---------------------------------------------- -->
    <!--    <v-btn icon variant="text" color="primary" to="">-->
    <!--      <v-badge color="error" :content="0">-->
    <!--        <ShoppingCartIcon stroke-width="1.5" size="24"/>-->
    <!--      </v-badge>-->
    <!--    </v-btn>-->

    <!-- ---------------------------------------------- -->
    <!-- MessagesDD -->
    <!-- ---------------------------------------------- -->
    <!-- <MessagesDD /> -->
    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <CreditBalance/>
    <ThemeMenu/>
    <!-- ---------------------------------------------- -->
    <!--    <NotificationDD/>-->
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <div class="ml-2">
      <ProfileDD/>
    </div>
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <!--  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>-->
  <!--    <RightMobileSidebar/>-->
  <!--  </v-navigation-drawer>-->
</template>
