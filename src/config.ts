export type ConfigProps = {
    Sidebar_drawer: any;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    setHorizontalLayout: boolean;
    actTheme: string;
    inputBg:string;
    boxed: boolean;

    setBorderCard: boolean;
};

const config: ConfigProps = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    mini_sidebar: false,
    setHorizontalLayout: false, // Horizontal layout
    actTheme: 'GREEN_THEME',
    inputBg: 'GREEN_THEME',
    boxed: false,
    setBorderCard: false
};

export default config;
