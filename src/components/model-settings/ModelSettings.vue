<script setup lang="ts">
// import VueResizable from 'vue-resizable'
import Logo from "@/components/model-settings/sections/Logo.vue";
import Sections from "@/components/model-settings/sections/Sections.vue";
import Seperator from "@/components/Seperator.vue";
import Template from "@/components/model-settings/sections/Template.vue";
import Typography from "@/components/model-settings/sections/Typography.vue";
import Theme from "@/components/model-settings/sections/Theme.vue";
import Page from "@/components/model-settings/sections/Page.vue";
import RegisterModel from "@/components/model-settings/sections/RegisterModel.vue";
import {useResumeStore} from "@/stores/resume";
import Personnel from "@/components/model-settings/sections/Personnel.vue";
import ModelLanguage from "@/components/model-settings/sections/ModelLanguage.vue";


</script>

<template>
  <div class=" bg-surface elevation-0  pa-3 mr-2 overflow-y-auto">
<!--    <div v-if="useResumeStore().showTemplateSection">-->
<!--      <Template/>-->
<!--      <Seperator/>-->
<!--    </div>-->
    <Logo/>
    <Typography/>
    <Seperator/>
    <Theme/>
    <Seperator/>
    <ModelLanguage />
    <Seperator/>
    <Sections/>
    <Seperator/>
    <Personnel />
    <Seperator/>
    <Page/>
    <Seperator/>

  </div>

</template>

<style scoped lang="scss">

.editor {


}
</style>

