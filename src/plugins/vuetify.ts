import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { GREEN_THEME } from '@/theme/LightTheme';
import {
    DARK_GREEN_THEME
} from '@/theme/DarkTheme';

export default createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'GREEN_THEME',
        themes: {
            GREEN_THEME,
            DARK_GREEN_THEME
        }
    },
    defaults: {
        VToolbar: {
            'rounded-top': 'lg'
        },
        VCard: {
            rounded: 'lg'
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VBtn: {
            rounded: 'xl'
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VListItem: {
            minHeight: '45px'
        },
        VTooltip: {
            location: 'top'
        }
    }
});
