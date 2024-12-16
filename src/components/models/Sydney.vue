<script setup lang="ts">

import {useResumeStore} from "@/stores/resume";
import {computed,} from "vue";
import {storeToRefs} from 'pinia';
import type {Resume, Skill} from "@/types/resume";


const resumeStore = useResumeStore();

const model = resumeStore.model;
const {resume } = storeToRefs(resumeStore);

const fontSize = computed(() => {
  return model.templateData?.typography.size + 'px';
})
const lineHeight = computed(() => {
  return model.templateData?.typography.lineHeight;
})

const primaryColor = computed(() => {
  return model.templateData?.theme.primary;
})


const textColor = computed(() => {
  return model.templateData?.theme.text;
})
const setFormat = computed(() => {
  if (model.templateData?.page.format == 'a4') {
    return {width: 8.5 + 'in', height: 11 + 'in'};
  } else {
    return {width: 8.27 + 'in', height: 11.69 + 'in'};

  }
})

const setUnderlineLinks = computed(() => {
  return model.templateData?.typography.underlineLinks ? 'underline' : 'none';
})


const isShowName = computed(() => {
  return model.templateData?.personnel.name;
})


const isShowPhone = computed(() => {
  return model.templateData?.personnel.phone;
})

const isHeadline = computed(() => {
  return model.templateData?.page.headline;
})


const isShowEmail = computed(() => {
  return model.templateData?.personnel.email;
})

const yearsOfExperienceText = computed(() => {
  return model.language === 'en' ? "Years of Experience" : " Années d'expérience";
});
const technicalEnvironmentText = computed(() => {
  return model.language === 'en' ? "Technical Environment" : "Environnement Technique";
});
const identity = computed(() => {
  return model.templateData?.identity;
})

const setModelReference = computed(() => {
  return model.reference;
})
const groupedSkills = computed(() => {
  return resume.value.skills.reduce((acc: { [key: string]: string[] }, item: Skill) => {
    const category = item?.category as string;

    // Initialize the category if it doesn't exist
    if (!acc[category]) {
      acc[category] = [];
    }

    // Clone the array to prevent reactivity from reordering items
    acc[category] = [...acc[category], item.skill];
    return acc;
  }, {});
});
</script>

<template>
  <div class="page" data-size="A4" :class="model.templateData?.typography.family">
    <div class="container">
      <div class="resume" v-if="resume">

        <img :src="model.templateData.company_logo.url"
             v-if="!model.templateData.company_logo.hidden"
             class="company-logo"
             draggable="false"
             :style="{width:model.templateData.company_logo.size + 'px',
             }"
        />
        <div class="header px-3">
          <div class="full-name">
            <div v-if="isShowName">{{ resume.name }}</div>
            <div v-else>
              <div class="mt-2 first-name" v-if="identity === 'alias'">
                {{ resume?.alias }}
              </div>
            </div>
          </div>

          <div class="contact-info">
            <div class="position" v-if="isHeadline">{{ resume?.headline }}</div>
            <div v-if="resume.yoe" class="years-experience">{{ resume.yoe ?? '' }} {{ yearsOfExperienceText }}</div>
            <span class="contact-detail">
      <div class="email-val">{{ isShowEmail ? resume.email : '' }}</div>
    </span>
            <div class="contact-detail">
              <div class="phone-val">{{ isShowPhone ? resume.phone : '' }}</div>
            </div>
          </div>

          <div v-html="resume.summary" class="summary desc" v-if="model.templateData.page.summary"></div>
        </div>
        <div class="details">
          <div class="section Experience" v-if="model.templateData.experience.visible && resume.work.length > 0">
            <div class="section__title ">{{ model.templateData.experience.name }}</div>
            <div class="section__list" :key="index" v-for="(item,index) in resume.work">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.company_name }}</div>
                  <div class="name">{{ item.job_title }}</div>
                  <div class="desc" v-html="item.responsibilities"></div>
                  <div class="my-3" v-if="item.environnement">
                    <p><strong>{{ technicalEnvironmentText }} :</strong> <span v-html="item.environnement"></span> </p>
                  </div>
                </div>
                <div class="right">
                  <div class="duration">{{ (item.start_date || '') + ' ' + (item.end_date || '') }}</div>
                  <div class="addr">{{ item.city || '' }}</div>
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
                  <div class="duration">
                    {{ item.start_year || '' }} - {{ item.end_year || '' }}
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
                  <div class="duration">
                    {{ (item.start_date || '') + ' ' + (item.end_date || '') }}
                  </div>
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
                  <div class="duration">{{ item.date || '' }}</div>
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
                  <div class="duration">
                    {{ (item.start_date || '') + ' ' + (item.end_date || '') }}
                  </div>
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
                    <div class="font-weight-medium d-inline" v-if="item.level ">{{ ': ' +  item.level }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section" v-if="model.templateData.interests.visible && resume.interests?.length > 0">
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
    min-width: 220px;
    flex-wrap: nowrap;
    padding: 3px;
    margin-right: 50px;
    font-weight: bold;
  }

  .skills {
    float: left;
    width: 100%;
    font-weight: lighter;
  }
}

.header {
  margin: 20px 10px;
  color: #333;

  .full-name {
    font-size: 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: v-bind(textColor);
  }

  .contact-detail {
    display: inline-block;
    margin-right: 15px;
  }

  .email, .phone {
    font-weight: bold;
    color: v-bind(primaryColor);
  }

  .email-val, .phone-val {
    margin-left: 5px;
    font-weight: 300;
  }

  .position {
    font-weight: bold;
    font-size: 1.2rem;
    //text-decoration: underline;
    color: v-bind(primaryColor);
    margin-bottom: 5px;
  }


  .separator {
    height: 10px;
    width: 2px;
    background-color: v-bind(primaryColor);
    margin: 0 15px;
  }

  .summary {
    font-size: 1rem;
    font-style: italic;
    line-height: 1.5;
    color: #666;
    margin-top: 15px;
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