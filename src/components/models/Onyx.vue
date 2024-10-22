<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import {computed} from "vue";
import {storeToRefs} from 'pinia';
import noise from "@/assets/images/backgrounds/noise.jpg"

const modelStore = useModelStore();
const resumeStore = useResumeStore();


const model = modelStore.model;
const {resume, candidateSelected} = storeToRefs(resumeStore);

const fontSize = computed(() => {
  return model.templateData.typography.size + 'px';
})
const lineHeight = computed(() => {
  return model.templateData.typography.lineHeight;
})

const primaryColor = computed(() => {
  return model.templateData.theme.primary;
})
const backgroundColor = computed(() => {
  return model.templateData.theme.background;
})

const textColor = computed(() => {
  return model.templateData.theme.text;
})
const setFormat = computed(() => {
  if (model.templateData.page.format == 'a4') {
    return {width: 8.5 + 'in', height: 11 + 'in'};
  } else {
    return {width: 8.27 + 'in', height: 11.69 + 'in'};

  }
})
const identity = computed(() => {
  return model.templateData.identity;
})
const setUnderlineLinks = computed(() => {
  return model.templateData.typography.underlineLinks ? 'underline' : 'none';
})
const setBorderRadius = computed(() => {
  return model.templateData.company_logo.borderRadius + 'px';
})


const isShowName = computed(() => {
  return model.templateData.personnel.name;
})

const isShowAge = computed(() => {
  return model.templateData.personnel.age;
})


const isShowPhone = computed(() => {
  return model.templateData.personnel.phone;
})

const isHeadline = computed(() => {
  return model.templateData.page.headline;
})


const isShowEmail = computed(() => {
  return model.templateData.personnel.email;
})


const isShowCity = computed(() => {
  return model.templateData.personnel.city;
})
const setModelReference = computed(() => {
  return model.reference;
})
</script>

<template>
  <div data-size="A4" class="page" :class="model.templateData.typography.family">
    <div class="container">
      <div class="resume">
        <div class="header ">
          <img v-if="!model.templateData.company_logo.hidden" :src="model.templateData.company_logo.url" :style="{width:model.templateData.company_logo.size + 'px',
 }" alt="Profile Picture" class="company-logo ml-3"/>
          <div class="ml">
            <h1 class="margin-bottom-none ml" v-if="isShowName">{{ resume.name }}</h1>
            <div v-else class="">
              <h2 class="mt-2 first-name text-h2" v-if="identity == 'reference'">
                {{ setModelReference }}{{ candidateSelected.reference ? '-' + candidateSelected.reference : '' }}
              </h2>
              <h2 class="mt-2 first-name text-h2 " v-if="identity == 'alias'">
                {{ resume?.alias }}
              </h2>
            </div>
            <p class="font-weight-bold text-h4" v-if="isHeadline">
              {{ resume.headline }}
            </p>
            <div class="contact ml" v-if="resume">
              <p class="mr-3 text-body-1 font-weight-medium" v-if="isShowPhone"><b>Phone</b>:
                {{ isShowPhone ? resume.phone : '' }}</p>
              <p class="mr-3 text-body-1 font-weight-medium" v-if="isShowCity"><b>City</b>:
                {{ isShowCity ? resume.city : '' }}</p>
              <p class="mr-3 text-body-1 font-weight-medium" v-if="isShowEmail"><b>Email</b>:
                {{ isShowEmail ? resume.email : '' }}</p>
              <p class="mr-3 text-body-1 font-weight-medium" v-if="isShowAge"><b>Age</b>: {{
                  isShowAge ? resume.age : ''
                }}</p>
            </div>
          </div>
        </div>

        <div class="summary" v-if="model.templateData.page.summary">
          <h1 :style="{color:textColor}">Summary</h1>
          <p v-html="resume.summary">

          </p>
        </div>

        <div class="section" v-if="model.templateData.experience.visible && resume.work.length > 0">
          <div class="section-name">
            <h2 class="">{{ model.templateData.experience.name }}</h2>
          </div>
          <div class="section-items margin-top-none">
            <div class="item" v-for="item in resume.work">
              <div class="flex ml">
                <div>
                  <h3 class="margin-bottom-none margin-top-none">
                    {{ item.company_name }}
                  </h3>
                  <p class="margin-top-none margin-bottom-none">
                    {{ item.job_title }}
                  </p>
                </div>
                <div>
                  <h4 class="margin-bottom-none margin-top-none">
                    {{ item.city }}
                  </h4>
                  <p class="margin-top-none margin-bottom-none">
                    {{ item.start_date + ' - ' + item.end_date }}
                  </p>
                </div>
              </div>
              <!--                <a class="margin-top-none ml">https://creativesolutions.inc/</a>-->
              <div class="desc" v-html="item.responsibilities"></div>
            </div>

          </div>
        </div>
        <!--          education-->
        <div v-if="model.templateData.education.visible && resume.educations.length > 0" class="section">
          <div class="section-name">
            <h2 class=" ">{{ model.templateData.education.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item">
              <div class="flex mb-2" v-for="item in resume.educations">
                <div>
                  <h4 class=" margin-top-none">
                    {{ item.institution }}
                  </h4>
                  <p class="margin-top-none ">
                    {{ item.degree }}
                  </p>
                </div>
                <div>
                  <h4 class=" margin-top-none">
                    {{ item.start_year + ' -' + item.end_year }}
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!--          projects-->
        <div class="section" v-if="model.templateData.projects.visible && resume.projects.length > 0">
          <div class="section-name">
            <h2 class=" ">{{ model.templateData.projects.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item" v-for="item in resume.projects">
              <h3 class=" margin-top-none ">
                {{ item.project_name }}
              </h3>
              <p class=" margin-top-none">{{ item.start_date + ' ' + item.end_date }}</p>
              <div class="desc" v-html="item.description"></div>
            </div>

          </div>
        </div>
        <!--          certifications-->
        <div class="section" v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
          <div class="section-name">
            <h2 class=" ">{{ model.templateData.certifications.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item">
              <div class="flex ">
                <div class="flex" v-for="item in resume.certifications">
                  <div>
                    <h4 class="margin-bottom-none ">
                      {{ item.certification }}
                    </h4>
                    <p class=" margin-bottom-none">
                      {{ item.institution }}
                    </p>
                    <p class=" margin-bottom-none">
                      {{ item.link }}
                    </p>
                  </div>
                  <p class="date"><strong> {{ item.date }}</strong></p>
                </div>


              </div>
            </div>
          </div>
        </div>
        <!--          Skills-->
        <div class="section" v-if="model.templateData.skills.visible && resume.skills.length > 0">
          <div class="section-name">
            <h2 class=" ">Skills</h2>
          </div>
          <div class="section-items">
            <div class="item">
              <div class="d-flex flex-wrap">
                <div class="skill ma-1" v-for="item in resume.skills" style="">
                  <v-chip> {{ item.skill }}</v-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        references-->
        <div class="section" v-if="model.templateData.references.visible && resume.references.length > 0">
          <div class="section-name">
            <h2>{{ model.templateData.references.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item">

              <div class="item" v-for="item in resume.references">
                <div class="font-weight-bold"> {{ item.name + '- ' + item.position }}</div>
                <h5>{{ item.company }}</h5>
                <div>{{ item.email }} <br></div>
                <div> {{ item.phone }}</div>
              </div>
            </div>
          </div>
        </div>
        <!--        volunteering-->
        <div class="section" v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">
          <div class="section-name">
            <h2>{{ model.templateData.volunteering.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item">

              <div class="item" v-for="item in resume.volunteering">
                <h3 class="font-weight-bold"> {{ item.position }}</h3>
                <h4>{{ item.organization }}</h4>
                <div>{{ item.start_date + ' ' + item.end_date }} <br></div>
                <div class="desc" v-html="item.description"></div>
              </div>
            </div>
          </div>
        </div>
        <!--        languages-->
        <div class="section" v-if="model.templateData.languages.visible && resume.languages.length > 0">
          <div class="section-name">
            <h2>{{ model.templateData.languages.name }}</h2>
          </div>
          <div class="section-items item">
            <div class="languages section-items">
              <div v-for="item in resume.languages" class=" language d-flex align-center">
                <div class="left" style="min-width: 200px;padding: 3px">
                  <div class="name">
                    {{ item.language }}
                  </div>
                </div>
                <div class="right">
                  <div class="language">
                    <div class="language-bar align-center d-flex">
                      <div
                          v-for="(level, index) in 5"
                          :key="index"
                          :class="['language-level', { 'dash-filled': +index < +item.level }]"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--interest-->
        <div class="section" v-if="model.templateData.interests.visible && resume.interests.length > 0">
          <div class="section-name">
            <h2>{{ model.templateData.interests.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item">
              <div class="d-flex flex-wrap">
                <div class="skill ma-1" v-for="item in resume.interests">
                  <v-chip>{{ item.interest }}</v-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        social-->
        <!--interest-->
        <div class="section" v-if="model.templateData.social.visible && resume.social.length > 0">
          <div class="section-name">
            <h2>{{ model.templateData.social.name }}</h2>
          </div>
          <div class="section-items">
            <div class="item">
              <div class="d-flex flex-wrap">
                <div class="skill ma-1" v-for="item in resume.social">
                  <v-chip> {{ item.skill }}</v-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

* {
  :deep(ul), :deep(ol) {
    padding: 0 1rem;
    margin: 10px;
  }

}


div.page {
  background-color: v-bind(backgroundColor);
  display: block;
  margin: 0;
  position: relative;
  font-size: v-bind(fontSize);
  //box-shadow: 1px 1px 2px #DAD7D7;
}

/*@page { size: A4 portrait !important; margin: 0 !important;}


div.page[data-size="A4"] {
  width: 21cm;
  height: auto;
  color: black;

  min-height: 29.7cm;
}


@page {
  size: 21cm 29.7cm;
  margin: 0mm;
}*/


.container {
  display: flex;
  flex-direction: row;
  width: 100%;

  height: 100%;
}

.resume {
  padding: 30px;
}

.header {


  border-bottom: 2px solid var(--);
  padding-bottom: 15px;
}

.contact {
  display: flex;

}


.width {
  width: 10%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.company-logo {
  position: relative;
  top: 2px;
  height: auto;
  left: -20px;
}

.flex-around {
  display: flex;
  justify-content: space-evenly;
}

.date {
  padding-left: 80px;
}


.section {
  .section-name {
    font-size: 22px;
    color: v-bind(textColor);
    margin-bottom: 20px;
  }
}

.languages {

  .language-bar {


    .language-name {
      font-size: 18px;
      padding-bottom: 5px;
    }

    .language-bar {
      //display: flex;
      gap: 5px; /* Space between dashes */
      display: inline-flex;
    }

    .language-level {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background-color: #e0e0e0; /* Default color for empty dash */
    }

    .dash-filled {
      background-color: v-bind(primaryColor);
    }
  }
}
</style>