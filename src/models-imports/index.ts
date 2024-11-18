import { shallowRef, defineAsyncComponent } from 'vue';

export const modelComponents = shallowRef<{ [key: string]: any }>({
    sydney: defineAsyncComponent(() => import('@/components/models/Sydney.vue')),
    bronzor: defineAsyncComponent(() => import('@/components/models/Bronzor.vue')),
    moriarty: defineAsyncComponent(() => import('@/components/models/Moriarty.vue')),
    nosepass: defineAsyncComponent(() => import('@/components/models/Nosepass.vue')),
    blueprint: defineAsyncComponent(() => import('@/components/models/Dropteam.vue')),
    onyx: defineAsyncComponent(() => import('@/components/models/Onyx.vue')),
    siliconValley: defineAsyncComponent(() => import('@/components/models/TechResume.vue')),
    os: defineAsyncComponent(() => import('@/components/models/OsModel.vue')),
    chikorita: defineAsyncComponent(() => import('@/components/models/Chikorita.vue'))
});
