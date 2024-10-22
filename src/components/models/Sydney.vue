<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import {computed, ref} from "vue";
import {storeToRefs} from 'pinia';
import type {Skill} from "@/types/resume";


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
// const backgroundColor = computed(() => {
//   return model.templateData.theme.background;
// })

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

const identity = computed(() => {
  return model.templateData.identity;
})

const isShowCity = computed(() => {
  return model.templateData.personnel.city;
})
const setModelReference = computed(() => {
  return model.reference;
})
const groupedSkills = computed(() => {
  return resume.value.skills.reduce((acc: { [key: string]: string[] }, item: Skill) => {
    if (!acc[item?.category as string]) {
      acc[item?.category as string] = [];
    }
    acc[item?.category as string].push(item.skill);
    return acc;
  }, {});
})

</script>

<template>
  <div class="page" data-size="A4" :class="model.templateData.typography.family">
    <div class="container">
      <div class="resume">

        <img :src="model.templateData.company_logo.url"
             v-if="!model.templateData.company_logo.hidden"
             class="company-logo"
             :style="{width:model.templateData.company_logo.size + 'px',
             }"
        />
        <div class="header  px-3 ">
          <div class="full-name  position-relative">
            <span class="first-name " v-if="isShowName">{{ resume.name }}</span>
            <div v-else class="">
              <div class="mt-2 first-name text-h3" v-if="identity == 'reference'">
                {{ setModelReference }}{{ candidateSelected.reference ? '-' + candidateSelected.reference : '' }}
              </div>
              <div class="mt-2 first-name " v-if="identity == 'alias'">
                {{ resume?.alias}}
              </div>
            </div>
          </div>
          <div class="contact-info">
            <div class="position" v-if="isHeadline">{{ resume?.headline }}</div>
            <br>
            <span class="email mr-1" v-if="isShowEmail"> Email: </span>
            <span class="email-val mr-2">{{ isShowEmail ? resume.email : '' }}</span>
            <!--            <span class="separator"></span>-->
            <span class="phone mr-1" v-if="isShowPhone">Phone: </span>
            <span class="phone-val mr-2">{{ isShowPhone ? resume.phone : '' }}</span>
            <!--            <span class="separator" v-if="isShowCity"></span>-->
            <span class="phone mr-1" v-if="isShowCity">City: </span>
            <span class="phone-val mr-2">{{ isShowCity ? resume.city : '' }}</span>

          </div>


          <br>
          <div v-html="resume.summary" class="summary desc" v-if="model.templateData.page.summary">

          </div>
        </div>
        <div class="details">
          <div class="section Experience" v-if="model.templateData.experience.visible && resume.work.length > 0">
            <div class="section__title ">{{ model.templateData.experience.name }}</div>
            <div class="section__list" v-for="item in resume.work">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.company_name }}</div>
                  <div class="name">{{ item.job_title }}</div>
                  <div class="desc" v-html="item.responsibilities"></div>
                </div>
                <div class="right">
                  <div class="duration">{{ item.start_date + ' ' + item.end_date }}</div>
                  <div class="addr">{{ item.city }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="section Education" v-if="model.templateData.education.visible && resume.educations.length > 0">
            <div class="section__title">{{ model.templateData.education.name }}</div>
            <div class="section__list" v-for="item in resume.educations">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.institution }}</div>
                  <div class="addr">{{ item.degree }}</div>
                </div>
                <div class="right">
                  <div class="duration"> {{ item.start_year ? item.start_year : '' }} -
                    {{ item.end_year ? item.end_year : '' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Projects" v-if="model.templateData.projects.visible && resume.projects.length > 0">
            <div class="section__title">{{ model.templateData.projects.name }}</div>
            <div class="section__list" v-for="item in resume.projects">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.project_name }}</div>
                  <div class="desc" v-html="item.description"></div>
                </div>
                <div class="right">
                  <div class="duration">{{ item.start_date + ' ' + item.end_date }}</div>
                  <!--                  <div class="name">{{ item.position }}</div>-->
                </div>
              </div>
            </div>
          </div>
          <div class="section Certification"
               v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
            <div class="section__title">{{ model.templateData.certifications.name }}</div>
            <div class="section__list" v-for="item in resume.certifications">
              <div class="section__list-item">
                <div class="left">
                  <div class="addr">{{ item.institution }}</div>
                  <div class="duration">{{ item.date }}</div>
                  <div class="name">{{ item.certification }}</div>
                  <div class="link">{{ item.link }}</div>
                </div>
                <div class="right">
                </div>
              </div>
            </div>

          </div>

          <div class="section References" v-if="model.templateData.references.visible && resume.references.length > 0">
            <div class="section__title">{{ model.templateData.references.name }}</div>
            <div class="section__list" v-for="item in resume.references">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.company }}</div>
                  <div class="name" style="font-weight: 600">{{ item.position }}</div>
                  <div class="desc">{{ item.name }}</div>
                </div>
                <div class="right">
                  <div class="duration">{{ item.email }}</div>
                  <div class="addr">{{ item.phone }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Volunteering"
               v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">
            <div class="section__title">{{ model.templateData.volunteering.name }}</div>
            <div class="section__list" v-for="item in resume.volunteering">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.organization }}</div>
                  <div class="desc" v-html="item.description"></div>
                </div>
                <div class="right">
                  <div class="name">{{ item.position }}</div>
                  <div class="duration">{{ item.start_date + ' ' + item.end_date }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Skills" v-if="model.templateData.skills.visible && resume.skills.length > 0">
            <div class="section__title">{{ model.templateData.skills.name }}</div>
            <div class="section-items">
            <div class="technical-skills">
              <div class="pro-skill" v-for="(skills, category) in groupedSkills" :key="category">
                <div class="category">{{ category }}:</div>
                <div class="skills">
                  {{ skills.join(', ') }}
                </div>
              </div>
            </div>
            </div>
          </div>
          <div class="section Social" v-if="model.templateData.social.visible && resume.social.length > 0">
            <div class="section__title">{{ model.templateData.social.name }}</div>
            <div class="skills">
              <div class="skills__item" style="display: flex; flex-wrap: wrap">
                <div v-for="item in resume.social" style="padding: 3px;">
                  {{ item.skill }},
                </div>
              </div>
            </div>
          </div>

          <div class="section" v-if="model.templateData.languages.visible && resume.languages.length > 0">
            <div class="section__title">{{ model.templateData.languages.name }}</div>
            <div class="socials">
              <div class="skills__item" v-for="item in resume.languages">
                <div class="left">
                  <div class="name">
                    {{ item.language }}
                  </div>
                </div>
                <div class="right">
                  <div class="skill">
                    <div class="skill-bar">
                      <div
                          v-for="(level, index) in 5"
                          :key="index"
                          :class="['skill-level', { 'dash-filled': +index < +item.level }]"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section" v-if="model.templateData.interests.visible && resume.interests.length > 0">
            <div class="section__title">
              {{ model.templateData.interests.name }}
            </div>
            <div class="section__list">
              <div class="section__list-item">
                <span v-for="item in resume.interests" class="pa-1">
                  {{ item.interest }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">


div.page {
  //background: white;
  background-color: white;
  display: block;
  margin: 0;
  position: relative;
  color: black;
  font-size: v-bind(fontSize);
  //box-shadow: 1px 1px 2px #DAD7D7;


}

/*@page { size: A4 portrait !important; margin: 0 !important;}


div.page[data-size="A4"] {
  width: 21cm;
  height: auto;

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
  padding: 30px;
  height: 100%;
  background-color: white;

}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

.company-logo {
  position: relative;
  float: right;
  top: 6px;
  right: 30px;
  height: auto;
  //max-width: 15%;
  margin-top: 10px;
}


* {
  :deep(ul), :deep(ol) {
    padding: 0 1.25rem;
    margin: 10px;
  }

}

.section-items .technical-skills {
  .pro-skill {
    margin: 5px;
    display: flex;
    justify-content: start;
  }

  .category {
    min-width: 200px;
    flex-wrap: nowrap;
    padding: 3px;
    margin-right: 50px;
    font-weight: bold;
  }

  .skills {
    float: left;
    margin-left: 20px;
    font-weight: lighter;
  }
}

.header {
  margin-left: 10px;

  margin-bottom: 0px;

  .full-name {
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .first-name {
    font-weight: 700;
  }


  .last-name {
    font-weight: 300;
  }

  .contact-info {
    margin-bottom: 0px;
  }

  .email,
  .phone {
    font-weight: bold;
    color: v-bind(textColor);
    //font-weight: 300;
  }

  .separator {
    height: 9px;
    display: inline-block;
    border-left: 2px solid v-bind(primaryColor);
    margin: 0px 10px;
  }

  .position {
    font-weight: bold;
    display: inline-block;
    margin-right: 10px;
    text-decoration: underline;
    text-decoration: v-bind(setUnderlineLinks);
  }
}


.details {
  line-height: 1.6;
  margin-left: 10px;

  .section {
    margin-top: 30px;
    margin-bottom: 40px;
  }

  .section:last-of-type {
    margin-bottom: 0px;
  }

  .section__title {
    letter-spacing: 1.5px;
    font-weight: bold;
    margin-bottom: 20px;
    width: 100%;
    border-bottom: 3px solid v-bind(primaryColor);
    text-transform: uppercase;
    color: v-bind(textColor);
  }

  .section__list-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 35px;
  }

  .section__list-item:last-of-type {
    margin-bottom: 0px;
  }

  .left,
  .right {
    vertical-align: top;
    margin-top: 10px;
    //display: inline-block;
  }

  .left {
    width: 89%;
  }

  .right {
    text-align: right;
    padding-right: 30px;
    width: 30%;
  }

  .name {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 5px;
    //color: #d9534f;
  }

  .job-title {
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 8px;
    color: #555;
  }

  .desc {
    //font-size: 0.95em;
    //line-height: 1.5;
    color: #333;
  }

  .duration, .addr {
    font-size: 0.9em;

    font-weight: 700;
    margin-bottom: 2px;
    color: #555;
  }
}

</style>