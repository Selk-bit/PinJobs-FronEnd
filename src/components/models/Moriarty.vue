<script setup lang="ts">
import {useResumeStore} from "@/stores/resume";
import {computed} from "vue";
import {storeToRefs} from 'pinia';

const resumeStore = useResumeStore();


const model = resumeStore.model;
const {resume, } = storeToRefs(resumeStore);

const fontSize = computed(() => {
  return model.templateData.typography.size + 'px';
})
const lineHeight = computed(() => {
  return model.templateData.typography.lineHeight;
})

const primaryColor = computed(() => {
  return model.templateData.theme.primary;
})
// const backgroundColor = computed(() => {
//   return model.templateData.theme.background;
// })
const identity = computed(() => {
  return model.templateData.identity;
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
  <div class="page" data-size="A4" :class="model.templateData.typography.family">
    <div class="container">
      <div class="resume">
        <div class="header">
          <img :src="model.templateData.company_logo.url"
               :style="{width:model.templateData.company_logo.size + 'px',
                     }"
               v-if="!model.templateData.company_logo.hidden"
               class="company-logo"
          />
          <div>
            <h1 class="text-h1 font-weight-bold" v-if="isShowName">{{ resume.name }}</h1>
            <div v-else class="">
              <h1 class="mt-2 first-name " v-if="identity == 'alias'">
                {{ resume?.alias }}
              </h1>
            </div>
            <h3 v-if="isHeadline">{{ resume.headline }}</h3>
          </div>
          <div class="contact">
            <div class="mb-1 text-body-1 font-weight-semibold" v-if="isShowPhone">
              <v-icon class="icons">mdi-cellphone</v-icon>
              phone: {{ isShowPhone ? resume.phone : '' }}
            </div>
            <div class="mb-1 text-body-1 font-weight-semibold" v-if="isShowEmail">
              <v-icon class="icons">mdi-email-outline</v-icon>
              Email: <span class="email">{{ isShowEmail ? resume.email : '' }}</span>
            </div>
            <div class="mb-1 text-body-1 font-weight-semibold" v-if="isShowCity">
              <v-icon class="icons">mdi-map-marker</v-icon>
              {{ isShowCity ? resume.city : '' }}
            </div>
          </div>
        </div>
        <div class="summary" v-if="model.templateData.page.summary">
          <div class="desc" v-html="resume.summary"></div>
        </div>
        <div class="content mt-5">
          <!--          experience-->
          <div class="section" v-if="model.templateData.experience.visible && resume.work.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.experience.name }}</h3>
            </div>
            <div class="section-items">
              <div class="item" v-for="item in resume.work">
                <div class="font-weight-bold"> {{ item.job_title + '- ' + item.company_name }}</div>
                <div>{{ item.start_date + ' ' + item.end_date }} <br></div>
                <h5>{{ item.city }}</h5>
                <div class="desc" v-html="item.responsibilities"></div>
              </div>
            </div>
          </div>
          <!--          education-->
          <div class="section" v-if="model.templateData.education.visible && resume.educations.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.education.name }}</h3>
            </div>
            <div class="section-items ">
              <div class="item" v-for="item in resume.educations">

                <div class="degree font-weight-bold">
                  {{ item.degree }}
                </div>
                <div class="institution">
                  {{ item.institution }}
                </div>
                <div class="date">
                  {{ item.start_year + ' -' + item.end_year }}
                </div>
              </div>
            </div>
          </div>
          <!--          projects-->
          <div class="section" v-if="model.templateData.projects.visible && resume.projects.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.projects.name }}</h3>
            </div>
            <div class="section-items">
              <div class="item" v-for="item in resume.projects">
                <div class="font-weight-bold"> {{ item.project_name }}</div>
                <div>{{ item.start_date + ' ' + item.end_date }} <br></div>
                <div class="desc" v-html="item.description"></div>
              </div>
            </div>
          </div>
          <!--          References-->
          <div class="section" v-if="model.templateData.references.visible && resume.references.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.references.name }}</h3>
            </div>
            <div class="section-items">
              <div class="item" v-for="item in resume.references">
                <div class="font-weight-bold"> {{ item.name + '- ' + item.position }}</div>
                <h5>{{ item.company }}</h5>
                <div>{{ item.email }} <br></div>
                <div> {{ item.phone }}</div>
              </div>
            </div>
          </div>
          <!--          Volunteering-->
          <div class="section" v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.volunteering.name }}</h3>
            </div>
            <div class="section-items mt-3">
              <div class="item" v-for="item in resume.volunteering">
                <div class="font-weight-bold"> {{ item.position }}</div>
                <h5>{{ item.organization }}</h5>
                <div>{{ item.start_date + ' ' + item.end_date }} <br></div>
                <div class="desc" v-html="item.description"></div>
              </div>
            </div>
          </div>
          <!--          certifications-->
          <div class="section" v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.certifications.name }}</h3>
            </div>
            <div class="section-items">
              <div class="item" v-for="item in resume.certifications">
                <div class="font-weight-bold"> {{ item.certification }}</div>
                <h5>{{ item.institution }}</h5>
                <a :href="item.link" class="link" style="color: black;"> {{ item.link }}</a>
                <br>
                <div>
                  {{ item.date }}
                </div>
              </div>
            </div>
          </div>
          <!--          skills-->
          <div class="section" v-if="model.templateData.skills.visible && resume.skills.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.skills.name }}</h3>
            </div>
            <div class="section-items  ">
              <div class="skill" v-for="item in resume.skills" style="">
                {{ item.skill }}
              </div>
            </div>
          </div>

          <!--          socials-->
          <div class="section" v-if="model.templateData.social.visible && resume.social.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.social.name }}</h3>
            </div>
            <div class="section-items ">
              <div class="skill" v-for="item in resume.social" style="">
                {{ item.skill }}
              </div>
            </div>
          </div>
          <!--          Languages-->
          <div class="section" v-if="model.templateData.languages.visible && resume.languages.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.languages.name }}</h3>
            </div>
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
          <div class="section" v-if="model.templateData.interests.visible && resume.interests.length > 0">
            <div class="section-name">
              <h3>{{ model.templateData.interests.name }}</h3>
            </div>
            <div class="section-items mt-2">
              <span v-for="item in resume.interests">
                  {{ item.interest }},
                </span>
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
  background-color: white;
  display: block;
  margin: 0;
  position: relative;
  padding-top: 15px;
    padding: 30px;
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
  padding: 20px;
}

.company-logo {
  margin-left: 8px;
}

.icons {
  color: v-bind(primaryColor);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid v-bind(primaryColor);
  padding-bottom: 10px;
}

.header h1 {
  margin: 0;
}

.header img {
  position: relative;
  top: -28px;
  right: 10px;
  padding: 3px;
}

.contact {
  text-align: left;
  margin-top: 10px;
}

.summary {
  margin: 20px 0;
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.section {
  display: flex;
}

.section-name {
  min-width: 200px;
  width: 200px;
  display: flex;
  float: right;
  color: v-bind(textColor);
  border-right: 2px solid v-bind(primaryColor);
  margin-right: 10px;


}

.section-items {
  flex-grow: 1;

}

.link, .email {
  text-decoration: v-bind(setUnderlineLinks)
}

.section h2 {
  margin: 0;
}

.section p {
  margin: 5px 0;
}

.border {
  border: 1px solid black
}

.skill {
  border: 1px solid black;
  display: inline-flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  margin: 2px;
  height: 32px;
  font-size: 14px;
  color: #333;
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
