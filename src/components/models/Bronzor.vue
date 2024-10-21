<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import {computed} from "vue";
import {storeToRefs} from 'pinia';


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
      <div class="leftPanel" style="word-wrap: break-word">
        <div class="details" :class="model.templateData.typography.family">
          <div class="item bottomLineSeparator">
            <h2>
              CONTACT
            </h2>
            <div class="smallText text">
              <p>
                {{ isShowPhone ? resume.phone : '' }}
              </p>
              <p>
                <a class="text" :href="`mailto:${resume.email}`">
                  {{ isShowEmail ? resume.email : '' }}
                </a>
              </p>
              <p>
                {{ isShowCity ? resume.city : '' }}
              </p>
              <p>
                Age :{{ isShowAge ? resume.age : '' }}
              </p>
            </div>
          </div>
          <div class="item bottomLineSeparator" v-if="model.templateData.skills.visible && resume.skills.length > 0">
            <h2>
              {{ model.templateData.skills.name }}
            </h2>
            <div class="smallText">
              <div class="skills">
                <div v-for="skill in resume.skills" class="skill text">
                  {{ skill.skill }}
                </div>
              </div>
            </div>
          </div>
          <div class="item educations bottomLineSeparator"
               v-if="model.templateData.education.visible && resume.educations.length > 0">
            <h2>
              {{ model.templateData.education.name }}
            </h2>
            <div class="smallText">
              <div class="education-item" v-for="education in resume.educations">
                <p class="bolded text  font-weight-bold" style="display: flex;">{{ education.degree }}</p>
                <p class="text">
                  {{ education.institution }}
                </p>
                <p class="text">
                  {{ education.start_year + ' ' + education.end_year }}
                </p>
              </div>
            </div>
          </div>
          <div class="item bottomLineSeparator languages"
               v-if="model.templateData.languages.visible && resume.languages.length > 0">
            <h2>
              {{ model.templateData.languages.name }}
            </h2>
            <div class="smallText">
              <div class="skills">
                <div v-for="skill in resume.languages" class="skill text">
                  {{ skill.language }}
                </div>
              </div>
            </div>
          </div>
          <div class="item bottomLineSeparator" v-if="model.templateData.social.visible">
            <h2>
              {{ model.templateData.social.name }}
            </h2>
            <div class="smallText">
              <div class="skills">
                <div v-for="skill in resume.social" class="skill text">
                  {{ skill.skill }}
                </div>
              </div>
            </div>
          </div>
          <div class="item bottomLineSeparator interests"
               v-if="model.templateData.interests.visible && resume.interests.length > 0">
            <h2>
              {{ model.templateData.interests.name }}
            </h2>
            <div class="smallText">
              <div class="skills">
                <div v-for="interest in resume.interests" class="skill text">
                  {{ interest.interest }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightPanel" :class="model.templateData.typography.family">

        <img :src="model.templateData.company_logo.url"
             :style="{width:model.templateData.company_logo.size + 'px',
                      aspectRatio:model.templateData.company_logo.aspectRatio ,
             border: model.templateData.company_logo.border ?  '' : 'none',
             filter:model.templateData.company_logo.grayscale ?  'grayscale(1)' : 'grayscale(0)',
             }"
             v-if="!model.templateData.company_logo.hidden"
             class="company-logo"
        />
        <div class="name">
          <h1 v-if="isShowName">{{ resume.name }}</h1>
          <h1 v-else class="text-h4 font-weight-semibold">{{
              setModelReference
            }}{{ candidateSelected.reference ? '-' + candidateSelected.reference : '' }}</h1>
          <div class="smallText" v-if="isHeadline">
            <h3>
              {{ resume.headline }}
            </h3>
          </div>
        </div>
        <!--        about me-->
        <div class="section" v-if="model.templateData.page.summary">
          <h2>
            About me
          </h2>
          <div class="smallText">
            <div v-html="resume.summary">
            </div>
          </div>
        </div>

        <!--        work section -->
        <div class="section" v-if="model.templateData.experience.visible && resume.work.length > 0">
          <h2>
            {{ model.templateData.experience.name }}
          </h2>
          <ul>
            <li v-for="work in resume.work">
              <div class="jobPosition">
                <span class="font-weight-bold">
                      {{ work.job_title }}
                </span>
                <span>
                  {{ work.start_date }} - {{ work.end_date }}
                </span>
              </div>
              <div class="projectName bolded">
                <span class="font-weight-bold">
                  {{ work.company_name }}
                </span>
                <div>{{ work.city }}</div>
              </div>
              <div class="desc" v-html="work.responsibilities">
              </div>
            </li>
          </ul>
        </div>
        <!--        projects-->
        <div class="section" v-if="model.templateData.projects.visible && resume.projects.length > 0">
          <h2>
            {{ model.templateData.projects.name }}
          </h2>
          <ul>
            <li v-for="project in resume.projects">
              <div class="jobPosition">
                <div class="projectName bolded">
                <span class="font-weight-bold">
                  {{ project.project_name }}
                </span>
                </div>
                <span>
                  {{ project.start_date + '' + project.end_date }}
                </span>
              </div>

              <div v-html="project.description" class="desc">
              </div>
            </li>
          </ul>
        </div>
        <!--        References-->
        <div class="section" v-if="model.templateData.references.visible && resume.references.length > 0">
          <h2>
            {{ model.templateData.references.name }}
          </h2>
          <ul>
            <li v-for="item in resume.references">
              <li>
                <div class="jobPosition">
                     <span class=" bolded font-weight-bold">
                      {{ item.name }} | {{ item.position }}
                    </span>

                </div>
                <div class="projectName bolded">
                  <span class=" font-weight-semibold">
                      {{ item.company }}
                    </span>
                  <div>
                    {{ item.email }}
                  </div>
                  <div>
                    {{ item.phone }}
                  </div>
                </div>
              </li>
            </li>
          </ul>
        </div>

        <!--        volunteering-->
        <div class="section" v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">
          <h2>
            {{ model.templateData.volunteering.name }}
          </h2>
          <ul>
            <li v-for="item in resume.volunteering">
              <div class="jobPosition">
                <span class="text-h5 bolded font-weight-bold">
                      {{ item.position }}
                </span>
                <span>
                  {{ item.start_date }} - {{ item.end_date }}
                </span>
              </div>
              <div class="projectName bolded">
                <span class="font-weight-semibold">
                  {{ item.organization }}
                </span>
              </div>
              <div v-html="item.description" class="desc">
              </div>
            </li>

          </ul>
        </div>

        <!--        Certifications-->
        <div class="section" v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
          <h2>
            {{ model.templateData.certifications.name }}
          </h2>
          <ul>
            <li v-for="item in resume.certifications">
              <div class="jobPosition">
              <span class="bolded">
                {{ item.certification }}
              </span>
                <span>
                {{ item.date }}
              </span>
              </div>
              <div class="projectName bolded">
                <div>
                  {{ item.institution }}

                </div>
                <div>
                  <a style="text-decoration: none" :href="item.link">{{ item.link }}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">


div.page {
  background: white;
  display: block;
  margin: 0 auto 0px;
  position: relative;
  font-size: v-bind(fontSize);
  //box-shadow: 1px 1px 2px #DAD7D7;
}

div.page[data-size="A4"] {
  width: 21cm;
  height: auto;
    color: black;
  min-height: 29.7cm;
}


@page {
  size: 21cm 29.7cm;
  margin: 0mm;
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

* {


  :deep(ul), :deep(ol) {
    padding: 0 1rem;
    margin: 10px;
  }

}

.leftPanel {
  width: 30%;
  background-color: v-bind(backgroundColor);
  padding: 0.5cm;
  display: flex;
  flex: 1;
  height: auto;

}

.rightPanel {
  width: 73%;
  padding: 0.7cm;

  h2 {
    margin-left: 6px;
  }
}

//elements
.item {
  padding-bottom: 0.8cm;
  padding-top: 0.2cm;
}

.item h2 {
  margin-top: 0;
}

.bottomLineSeparator {
  border-bottom: 0.05cm solid white;
}


.leftPanel h2 {
  color: v-bind(textColor);
}

.leftPanel .text {
  color: v-bind(primaryColor);
}


img {
  width: 4cm;
  height: 4cm;
  margin-bottom: 0.7cm;
  border-radius: 50%;
  border: 0.15cm solid white;
  object-fit: cover;
  object-position: 50% 50%;
}

.details {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .skill {

    padding: 1px;
    mix-blend-mode: normal;

  }
}

.leftPanel .smallText,
.leftPanel .smallText,
.leftPanel .smallText span,
.leftPanel .smallText p,
.smallText a {
  font-size: 0.40cm;
}

.smallText,
.smallText span,
.smallText p,
.smallText a {

  text-align: justify;
}

.contactIcon {
  width: 0.5cm;
  text-align: center;
}

.leftPanel,
.leftPanel a {
  color: #bebebe;
  text-decoration: none;
}


.alignleft {
  text-align: left !important;
  width: 1cm;
}

.alignright {
  text-align: right !important;
  width: 0.6cm;

}

//education
.white {
  color: white;
}


h1 {
  font-weight: 300;
  font-size: 1.2cm;
  transform: scale(1, 1.15);
  margin-bottom: 0.2cm;
  margin-top: 0.2cm;
  text-transform: uppercase;
}


.company-logo {
  position: relative;
  float: right;
  border-radius: v-bind(setBorderRadius);
  border: 2px solid var(--vc-clr-primary);
  top: -30px;
  right: -10px;
  height: 70px;
  width: 70px;

  margin-top: 10px;
}


//work section
.section > ul > li ul {
  padding-left: 0.5cm;
  list-style-type: disc;
}

.section > ul {
  list-style-type: none;
  padding-left: 0;
}

.section > ul > li {
  position: relative;
  margin: 0;
  padding-bottom: 0.5cm;
  padding-left: 0.5cm;
}

.section > ul > li:before {
  background-color: #b8abab;
  width: 0.05cm;
  content: '';
  position: absolute;
  top: 0.1cm;
  bottom: -0.2cm; /* change this after border removal */
  left: 0.05cm;
}

.section > ul > li::after {
  //content: '';
  position: absolute;
  //background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' viewBox='0 0 32 32' focusable='false'%3E%3Ccircle stroke='none' fill='%23484444' cx='16' cy='16' r='10'%3E%3C/circle%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  left: -0.09cm;
  top: -15px;
  width: 0.35cm;
  height: 0.35cm;
  content: '•'; /* Unicode character for a bullet point */
  color: black; /* Color of the bullet point */
  font-size: 1.7em; /* Size of the bullet point */
  margin-left: 2px; /* Space between bullet point and list item text */

}

.jobPosition {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.jobPosition span,
.projectName span {

}
</style>