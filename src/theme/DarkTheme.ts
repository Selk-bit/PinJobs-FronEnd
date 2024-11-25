import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

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
        // background: '#121212', // Very dark background color
        background: '#191919', // Very dark background color
        dark: '#000000', // Black for true dark elements
        hoverColor: '#333842', // Darker gray for hover effects
        surface: '#222629', // Dark surface color for components
        'on-surface-variant': '#333842', // Variant for components like cards
        grey100: '#3d3d3d', // Dark gray for UI elements
        grey200: '#525252', // Slightly lighter gray for UI elements,

        lightWhite:"#432C51"

    }
};


export { DARK_GREEN_THEME };
