<script setup lang="ts">
import { shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';
import { useDisplay } from 'vuetify';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';
import { DEFAULT_MODEL } from '@/utils/Constants';
import type { Template } from '@/types/model';
import { useModelStore } from '@/stores/model';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const loading = shallowRef(false);
const authStore = useAuthStore();

const { mobile } = useDisplay();

async function logOut() {
    loading.value = true;
    useModelStore().assignModel(DEFAULT_MODEL as Template);
    toast.success(t('auth.leave'));
    toast.dismiss();
    await authStore.LOGOUT();
    loading.value = false;

}

const toggleTheme = () => {
    customizer.actTheme = customizer.actTheme === 'GREEN_THEME' ? 'DARK_GREEN_THEME' : 'GREEN_THEME';
};
</script>

<template>
    <v-navigation-drawer left v-model="customizer.Sidebar_drawer" elevation="0" mobile-breakpoint="960"
                         app class="leftSidebar" expand-on-hover width="256">
        <div class="d-flex justify-space-between align-center ma-2 ">
            <Logo />
            <div>
                <v-btn size="small" v-if="$vuetify.display.mobile"
                       @click="customizer.Sidebar_drawer = !customizer.Sidebar_drawer" flat icon="mdi-close"></v-btn>
            </div>
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar ">
            <v-list class="py-6 px-4">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>

        <!--        Settings + theme switcher-->
        <template v-slot:append>
            <div class=" d-flex ">
                <v-btn prepend-icon="mdi-cog" variant="plain" @click="$router.push('user-settings')">
                    {{ $t('settings') }}
                </v-btn>
                <v-spacer />
                <v-btn
                    color="error"
                    @click="logOut"
                    variant="plain"
                    size="small"
                    :loading="loading"
                    icon="mdi-logout">

                </v-btn>
                <v-btn
                    size="small"
                    icon
                    variant="plain"
                    @click="toggleTheme"
                >
                    <v-icon :color="(customizer.actTheme === 'GREEN_THEME') ? 'primary' : 'secondary'">
                        {{ (customizer.actTheme === 'DARK_GREEN_THEME') ? 'mdi-weather-night' : 'mdi-weather-sunny'
                        }}
                    </v-icon>
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>
