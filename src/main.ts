import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import {router} from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import '@/scss/fonts.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import VCalendar, {DatePicker} from 'v-calendar';
import 'v-calendar/style.css';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import VueDragZoom from 'vue3-drag-zoom'
import 'vue3-carousel/dist/carousel.css';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { createVResizeDrawer } from '@wdns/vuetify-resize-drawer';
// @ts-ignore
import panZoom from 'vue-panzoom'
// @ts-ignore
import vue3ToPdf from 'vue3-to-pdf'


// editor


// @ts-ignore
import VueSimpleContextMenu from 'vue-simple-context-menu';
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';


import VueRecaptcha from 'vue3-recaptcha-v2';
import Maska from 'maska';
// print
// import print from 'vue3-print-nb';
// Table
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
//i18
import {createI18n} from 'vue-i18n';
import messages from '@/utils/locales/messages';
//ScrollTop
import VueScrollTo from 'vue-scrollto';




const i18n = createI18n({
  locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
      warnHtmlInMessage: "off",
    globalInjection: true,
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    legacy: false
});

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99,

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations

});
const drawerOptions = {}

const app = createApp(App);
// app.component('VResizeDrawer', VResizeDrawer);
// @ts-ignore
app.use(VueDragZoom);
// @ts-ignore
app.use(createVResizeDrawer(drawerOptions));

app.use(vue3ToPdf)
app.use(panZoom)
app.use(router);
app.component('vue-simple-context-menu', VueSimpleContextMenu);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(PerfectScrollbar);
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia);
app.use(VCalendar, {})
// app.component('VCalendar', VCalendar)
app.component('VDatePicker', DatePicker)
app.use(VueTablerIcons);
// app.use(print);
app.use(VueRecaptcha, {
    siteKey: '6LdzqbcaAAAAALrGEZWQHIHUhzJZc8O-KSTdTTh_',
    alterDomain: false // default: false
});
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);
app.use(vuetify).mount('#app');
//ScrollTop Use
// app.use(VueScrollTo);
app.use(VueScrollTo, {
    duration: 1000,
    easing: "ease"
})