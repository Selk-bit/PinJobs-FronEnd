<script setup lang="ts">
import Seperator from "@/components/Seperator.vue";
import Basics from "@/components/resume-settings/sections/Basics.vue";
import Work from "@/components/resume-settings/sections/Work.vue";
import Education from "@/components/resume-settings/sections/Education.vue";
import Projects from "@/components/resume-settings/sections/Projects.vue";
import References from "@/components/resume-settings/sections/References.vue";
import Interests from "@/components/resume-settings/sections/Interests.vue";
import Languages from "@/components/resume-settings/sections/Languages.vue";
import Skills from "@/components/resume-settings/sections/Skills.vue";
import Socials from "@/components/resume-settings/sections/Socials.vue";
import Certifications from "@/components/resume-settings/sections/Certifications.vue";
import Volunteering from "@/components/resume-settings/sections/Volunteering.vue";


</script>

<template>
  <div class="bg-surface elevation-0 pa-3  mb-4" >
    <Basics/>
    <Seperator/>
    <Work/>
    <Seperator/>
    <Education/>
    <Seperator/>
    <Projects/>
    <Seperator/>
    <Certifications/>
    <Seperator/>
    <References/>
    <Seperator/>
    <Volunteering/>
    <Seperator/>
    <Interests/>
    <Seperator/>
    <Languages/>
    <Seperator/>
    <Skills/>
    <Seperator/>
    <Socials/>
  </div>


</template>

<style scoped lang="scss">


</style>

