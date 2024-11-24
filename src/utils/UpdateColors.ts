import { computed } from 'vue';
import * as themeColors from '@/theme/LightTheme';
import * as DarkThemeColors from '@/theme/DarkTheme';
import * as LightThemeColors from '@/theme/LightTheme';
import { useCustomizerStore } from '@/stores/customizer';

const custmizer = useCustomizerStore();

const getPrimary = computed(() => {
    if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.primary;
    } else {

        return LightThemeColors.GREEN_THEME.colors.primary;

    }
});

const getLightPrimary = computed(() => {
    if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.lightprimary;
    } else {

        return LightThemeColors.GREEN_THEME.colors.lightprimary;

    }
});

const getSecondary = computed(() => {
    if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.secondary;
    } else {

        return LightThemeColors.GREEN_THEME.colors.secondary;

    }
});

const getLightSecondary = computed(() => {
    if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.lightsecondary;
    }
});


export { getPrimary, getSecondary, getLightPrimary, getLightSecondary };
