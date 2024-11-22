import type { ThemeTypes } from '@/types/themeTypes/ThemeType';
//
// const DARK_BLUE_THEME: ThemeTypes = {
//     name: 'DARK_BLUE_THEME',
//     dark: true,
//     variables: {
//         'border-color': '#333F55',
//     },
//     colors: {
//         primary: '#1e4db7',
//         secondary: '#1a97f5',
//         info: '#539BFF',
//         success: '#13DEB9',
//         accent: '#FA896B',
//         warning: '#FFAE1F',
//         error: '#FA896B',
//         lightprimary: '#253662',
//         lightsecondary: '#1C455D',
//         lightsuccess: '#1B3C48',
//         lighterror: '#4B313D',
//         lightwarning: '#4D3A2A',
//         textPrimary: '#EAEFF4',
//         textSecondary: '#7C8FAC',
//         borderColor: '#333F55',
//         inputBorder: '#465670',
//         containerBg: '#2a3447',
//         background: '#2a3447',
//         hoverColor: '#333f55',
//         surface: '#2a3447',
//         'on-surface-variant': '#2a3447',
//         grey100: '#333F55',
//         grey200: '#465670'
//     }
// };
//
// const DARK_RED_THEME: ThemeTypes = {
//     name: 'DARK_RED_THEME',
//     dark: true,
//     variables: {
//         'border-color': '#333F55',
//     },
//     colors: {
//         primary: '#5e244d',
//         secondary: '#ff5c8e',
//         info: '#539BFF',
//         success: '#13DEB9',
//         accent: '#FA896B',
//         warning: '#FFAE1F',
//         error: '#FA896B',
//         lightprimary: '#fce6ed',
//         lightsecondary: '#0C4339',
//         lightsuccess: '#1B3C48',
//         lighterror: '#4B313D',
//         lightwarning: '#4D3A2A',
//         textPrimary: '#EAEFF4',
//         textSecondary: '#7C8FAC',
//         borderColor: '#333F55',
//         inputBorder: '#465670',
//         containerBg: '#171c23',
//         background: '#171c23',
//         hoverColor: '#333f55',
//         surface: '#171c23',
//         'on-surface-variant': '#171c23',
//         grey100: '#333F55',
//         grey200: '#465670'
//     }
// };
//
// const DARK_PURPLE_THEME: ThemeTypes = {
//     name: 'DARK_PURPLE_THEME',
//     dark: true,
//     variables: {
//         'border-color': '#333F55',
//     },
//     colors: {
//         primary: '#402e8d',
//         secondary: '#7352ff',
//         info: '#539BFF',
//         success: '#13DEB9',
//         accent: '#FA896B',
//         warning: '#FFAE1F',
//         error: '#FA896B',
//         lightprimary: '#26153C',
//         lightsecondary: '#09454B',
//         lightsuccess: '#1B3C48',
//         lighterror: '#4B313D',
//         lightwarning: '#4D3A2A',
//         textPrimary: '#EAEFF4',
//         textSecondary: '#7C8FAC',
//         borderColor: '#333F55',
//         inputBorder: '#465670',
//         containerBg: '#171c23',
//         background: '#171c23',
//         hoverColor: '#333f55',
//         surface: '#171c23',
//         'on-surface-variant': '#171c23',
//         grey100: '#333F55',
//         grey200: '#465670'
//     }
// };

const DARK_GREEN_THEME: ThemeTypes = {
    name: 'GREEN_THEME_DARK',
    dark: true,
    variables: {
        'border-color': '#2a2e35'
    },
    colors: {
        // primary: '#1ABC9C', // Keep the primary color to maintain brand consistency
        // secondary: '#FF914D',
        primary: '#744aff',
        // primary: '#1ABC9C',
        secondary: '#605EA1',
        // secondary: '#FF914D',
        info: '#6699ff', // Slightly lighter info color for better contrast in dark mode
        success: '#28a745', // Bright green for success to stand out
        accent: '#FF6F61', // Adjusted accent to a more vibrant coral for dark mode
        warning: '#FFAE1F',
        error: '#FF6B6B', // More vibrant red for error
        lightprimary: '#2a2e35', // Darker base color for light primary
        lightsecondary: '#3a3e44', // Darker base color for light secondary
        lightsuccess: '#2c4d46', // Dark green for success backgrounds
        lighterror: '#5b1b1b', // Deep red for error backgrounds
        lightwarning: '#5b4a1b', // Mustard yellow for warning backgrounds
        textPrimary: '#e0e0e0', // Light text color for readability
        textSecondary: '#b0b0b0', // Slightly darker secondary text
        borderColor: '#2a2e35', // Darker border color
        inputBorder: '#444b54', // Muted gray for input borders
        containerBg: '#1e1e1e', // Darker container background
        background: '#121212', // Very dark background color
        dark: '#000000', // Black for true dark elements
        hoverColor: '#333842', // Darker gray for hover effects
        surface: '#222629', // Dark surface color for components
        'on-surface-variant': '#333842', // Variant for components like cards
        grey100: '#3d3d3d', // Dark gray for UI elements
        grey200: '#525252' // Slightly lighter gray for UI elements
    }
};

//     {
//     name: 'DARK_GREEN_THEME',
//     dark: true,
//     variables: {
//         'border-color': '#333F55',
//     },
//     colors: {
//         primary: '#066a73',
//         secondary: '#00cec3',
//         info: '#539BFF',
//         success: '#13DEB9',
//         accent: '#FA896B',
//         warning: '#FFAE1F',
//         error: '#FA896B',
//         lightprimary: '#05313F',
//         lightsecondary: '#282917',
//         lightsuccess: '#1B3C48',
//         lighterror: '#4B313D',
//         lightwarning: '#4D3A2A',
//         textPrimary: '#EAEFF4',
//         textSecondary: '#7C8FAC',
//         borderColor: '#333F55',
//         inputBorder: '#465670',
//         containerBg: '#171c23',
//         background: '#171c23',
//         hoverColor: '#333f55',
//         surface: '#171c23',
//         'on-surface-variant': '#171c23',
//         grey100: '#333F55',
//         grey200: '#465670'
//     }
// };
//
// const DARK_INDIGO_THEME: ThemeTypes = {
//     name: 'DARK_INDIGO_THEME',
//     dark: true,
//     variables: {
//         'border-color': '#333F55',
//     },
//     colors: {
//         primary: '#11397b',
//         secondary: '#1e4db7',
//         info: '#539BFF',
//         success: '#13DEB9',
//         accent: '#FA896B',
//         warning: '#FFAE1F',
//         error: '#FA896B',
//         lightprimary: '#003638',
//         lightsecondary: '#40241C',
//         lightsuccess: '#1B3C48',
//         lighterror: '#4B313D',
//         lightwarning: '#4D3A2A',
//         textPrimary: '#EAEFF4',
//         textSecondary: '#7C8FAC',
//         borderColor: '#333F55',
//         inputBorder: '#465670',
//         containerBg: '#171c23',
//         background: '#171c23',
//         hoverColor: '#333f55',
//         surface: '#171c23',
//         'on-surface-variant': '#171c23',
//         grey100: '#333F55',
//         grey200: '#465670'
//     }
// };
//
// const DARK_ORANGE_THEME: ThemeTypes = {
//     name: 'DARK_ORANGE_THEME',
//     dark: true,
//     variables: {
//         'border-color': '#333F55',
//     },
//     colors: {
//         primary: '#fb9678',
//         secondary: '#03c9d7',
//         info: '#539BFF',
//         success: '#13DEB9',
//         accent: '#FA896B',
//         warning: '#FFAE1F',
//         error: '#FA896B',
//         lightprimary: '#e5fafb',
//         lightsecondary: '#082E45',
//         lightsuccess: '#1B3C48',
//         lighterror: '#4B313D',
//         lightwarning: '#4D3A2A',
//         textPrimary: '#EAEFF4',
//         textSecondary: '#7C8FAC',
//         borderColor: '#333F55',
//         inputBorder: '#465670',
//         containerBg: '#171c23',
//         background: '#171c23',
//         hoverColor: '#333f55',
//         surface: '#171c23',
//         'on-surface-variant': '#171c23',
//         grey100: '#333F55',
//         grey200: '#465670'
//     }
// };

export { DARK_GREEN_THEME };
