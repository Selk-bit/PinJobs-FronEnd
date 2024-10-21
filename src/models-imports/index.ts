import {shallowRef} from "vue";
import Bronzor from "@/components/models/Bronzor.vue";
import Nosepass from "@/components/models/Nosepass.vue";
import Sydney from "@/components/models/Sydney.vue";
import Moriarty from "@/components/models/Moriarty.vue";
import Dropteam from "@/components/models/Dropteam.vue";
import Onyx from "@/components/models/Onyx.vue";
import TechResume from "@/components/models/TechResume.vue";


export const modelComponents = shallowRef<{ [key: string]: any }>({
    sydney: Sydney,
    bronzor: Bronzor,
    moriarty:Moriarty,
    nosepass: Nosepass,
    blueprint:Dropteam,
    onyx:Onyx,
    siliconValley:TechResume,
});