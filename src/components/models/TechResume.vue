<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import {computed} from "vue";
import {storeToRefs} from 'pinia';
import {useI18n} from "vue-i18n";

const {t} = useI18n()
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
  <div class="page" data-size="A4" :class="model.templateData.typography.family">
    <img :src="model.templateData.company_logo.url"
         v-if="!model.templateData.company_logo.hidden"
         class="company-logo ma-6"
         :style="{width:model.templateData.company_logo.size + 'px',
             }"
    />
    <div class="full-name ml-8 position-relative mt-4 text-capitalize ">
      <div class="text-h1 font-weight-bold" v-if="isShowName">{{ resume.name }}</div>
      <div v-else class="">
        <h2 class="mt-2 first-name text-h2" v-if="identity == 'reference'">
          {{ setModelReference }}{{ candidateSelected.reference ? '-' + candidateSelected.reference : '' }}
        </h2>
        <h2 class="mt-2 first-name text-h1 " v-if="identity == 'alias'">
          {{ resume?.alias }}
        </h2>
      </div>
    </div>
    <div class="ml-6 mb-1">
      <div>
        <span class=" font-weight-semibold ml-2" v-if="isShowEmail"> Email: </span>
        <span class="email- font-weight-semibold">{{ isShowEmail ? resume?.email : '' }}</span>
      </div>
      <div>
        <span class=" font-weight-semibold ml-2" v-if="isShowPhone">Phone: </span>
        <span class="phone- font-weight-semibold">{{ isShowPhone ? resume?.phone : '' }}</span>
      </div>
      <div>
        <span class=" font-weight-semibold ml-2" v-if="isShowCity">City: </span>
        <span class="phone- font-weight-semibold">{{ isShowCity ? resume?.city : '' }}</span>
      </div>
      <div>
        <span class=" font-weight-semibold ml-2" v-if="isShowAge">Age: </span>
        <span class="phone- font-weight-semibold">{{ isShowAge ? resume?.age : '' }} </span>
      </div>
    </div>
    <div class="container ">

      <div class="mx-2 resume">
        <div class="header" v-if="isHeadline">

          <div class="text-h3 font-weight-medium">{{ resume.headline }}</div>

        </div>
        <div v-html="resume.summary" class=" text-start ml-4 summary desc" v-if="model.templateData.page.summary">

        </div>

        <!--          work section-->
        <div class="content" v-if="model.templateData.experience.visible && resume.work.length > 0">
          <div class="section">
            <div class="section-name">
              <h2>{{ model.templateData.experience.name }}</h2>
            </div>
            <div class="item" v-for="item in resume.work">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.work.duration') }}</th>
                  <td>{{ item.start_date }} - {{ item.end_date }}</td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.work.companyName') }}</th>
                  <td>{{ item.company_name }}</td>
                </tr>
                <tr>
                  <th> {{ t('cvs.tech.work.city') }}</th>
                  <td>{{ item.city }}</td>
                </tr>
                <tr>
                  <th> {{ t('cvs.tech.work.jobTitle') }}</th>
                  <td>{{ item.job_title }}</td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.work.responsibilities') }}</th>
                  <td v-html="item.responsibilities"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!--        education-->
        <div class="content" v-if="model.templateData.education.visible && resume.educations.length > 0">
          <div class="section">
            <div class="section-name">
              <h2>{{ model.templateData.education.name }}</h2>
            </div>

            <div class="item" v-for="item in resume.educations">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.education.duration') }}</th>
                  <td>{{ item.start_year }} - {{ item.end_year }}</td>
                </tr>
                <tr>
                  <th>
                    {{
                      t('cvs.tech.education.institution')
                    }}
                  </th>
                  <td>
                    {{ item.institution }}
                  </td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.education.degree') }}</th>
                  <td>{{ item.degree }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!--        project -->
        <div class="content" v-if="model.templateData.projects.visible && resume.projects.length > 0">
          <div class="section">
            <div class="section-name">
              <h2>{{ model.templateData.projects.name }}</h2>
            </div>

            <div class="item" v-for="item in resume.projects">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.project.duration') }}</th>
                  <td>{{ item.start_date }} - {{ item.end_date }}</td>
                </tr>
                <tr>
                  <th>
                    {{
                      t('cvs.tech.project.name')
                    }}
                  </th>
                  <td>
                    {{ item.project_name }}
                  </td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.project.description') }}</th>
                  <td v-html="item.description"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!--        Certifications-->
        <div class="content" v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
          <div class="section">
            <div class="section-name">
              <h2>{{ model.templateData.certifications.name }}</h2>
            </div>

            <div class="item" v-for="item in resume.certifications">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.certification.date') }}</th>
                  <td>{{ item.date }}</td>
                </tr>
                <tr>
                  <th>
                    {{ t('cvs.tech.certification.certification') }}
                  </th>
                  <td>
                    {{ item.certification }}
                  </td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.certification.institution') }}</th>
                  <td v-html="item.institution"></td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.certification.link') }}</th>
                  <td> {{ item.link }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!--        reference -->
        <div class="content" v-if="model.templateData.references.visible && resume.references.length > 0">
          <div class="section">
            <div class="section-name">
              <h2>{{ model.templateData.references.name }}</h2>
            </div>

            <div class="item" v-for="item in resume.references">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.reference.name') }}</th>
                  <td>{{ item.name }}</td>
                </tr>
                <tr>
                  <th>
                    {{ t('cvs.tech.reference.position') }}
                  </th>
                  <td>
                    {{ item.position }}
                  </td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.reference.company') }}</th>
                  <td> {{ item.company }}</td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.reference.email') }}</th>
                  <td> {{ item.email }}</td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.reference.phone') }}</th>
                  <td> {{ item.phone }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>


        <!--        volunteering -->
        <div class="content" v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">
          <div class="section">
            <div class="section-name">
              <h2>{{ model.templateData.volunteering.name }}</h2>
            </div>

            <div class="item" v-for="item in resume.volunteering">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.volunteering.organisation') }}</th>
                  <td>{{ item.organization }}</td>
                </tr>
                <tr>
                  <th>
                    {{ t('cvs.tech.volunteering.position') }}
                  </th>
                  <td>
                    {{ item.position }}
                  </td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.volunteering.duration') }}</th>
                  <td> {{ item.start_date }} - {{ item.end_date }}</td>
                </tr>
                <tr>
                  <th>{{ t('cvs.tech.volunteering.description') }}</th>
                  <td v-html="item.description"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>


        <!--        social skills-->
        <div class="content" v-if="model.templateData.social.visible && resume.social.length > 0">
          <div class="section languages">
            <div class="section-name">
              <h2>{{ model.templateData.social.name }}</h2>
            </div>
            <div class="item">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.social.social') }}</th>
                  <th class="small">{{ t('cvs.tech.social.level') }}</th>
                </tr>
                <tr v-for="item in resume.social">
                  <td>{{ item.skill }}</td>
                  <td>
                    <div class="language">
                      <div class="language-bar align-center d-flex">
                        <div
                            v-for="(level, index) in 5"
                            :key="index"
                            :class="['language-level', { 'dash-filled': +index < +item.level }]"
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>

              </table>
            </div>
          </div>
        </div>

        <!--        languages-->
        <div class="content" v-if="model.templateData.languages.visible && resume.languages.length > 0">
          <div class="section languages">
            <div class="section-name">
              <h2>{{ model.templateData.languages.name }}</h2>
            </div>
            <div class="item">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.language.language') }}</th>
                  <th class="small">{{ t('cvs.tech.language.level') }}</th>
                </tr>
                <tr v-for="item in resume.languages">
                  <td>{{ item.language }}</td>
                  <td>
                    <div class="language">
                      <div class="language-bar align-center d-flex">
                        <div
                            v-for="(level, index) in 5"
                            :key="index"
                            :class="['language-level', { 'dash-filled': +index < +item.level }]"
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>

              </table>
            </div>
          </div>
        </div>

        <!--        technologies / skills-->
        <div class="content" v-if="model.templateData.skills.visible && resume.skills.length > 0">
          <div class="section ">
            <div class="section-name">
              <h2>{{ model.templateData.skills.name }}</h2>
            </div>
            <div class="item">
              <table>
                <tr>
                  <th class="small">{{ t('cvs.tech.skill.skill') }}</th>
                  <th class="small">{{ t('cvs.tech.skill.level') }}</th>
                </tr>
                <tr v-for="item in resume.skills">
                  <td>{{ item.skill }}</td>
                  <td>
                    <div class="language languages">
                      <div class="language-bar align-center d-flex">
                        <div
                            v-for="(level, index) in 5"
                            :key="index"
                            :class="['language-level', { 'dash-filled': +index < +item.level }]"
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>

              </table>
            </div>
          </div>
        </div>


        <!--        interests-->
        <div class="content" v-if="model.templateData.interests.visible && resume.interests.length > 0">
          <div class="section languages">
            <div class="section-name">
              <h2>{{ model.templateData.interests.name }}</h2>
            </div>
            <div class="item">
              <table>
                <tr v-for="item in resume.interests">
                  <td>{{ item.interest }}</td>
                </tr>
              </table>
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

.company-logo {
  //position: relative;
  float: right;
  top: 6px;
  right: 30px;
  padding: 3px;
  height: auto;
  //max-width: 15%;
  margin-top: 10px;
}

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

/*
@page { size: A4 portrait !important; margin: 0 !important;}


div.page[data-size="A4"] {
  width: 21cm;
  height: auto;
    padding: 30px;
  background-color: white;
  min-height: 29.7cm;
}

@page {
  size: 21cm 29.7cm;
  margin: 0mm;
  background-color: white;
}
*/


.container {
  display: flex;
  flex-direction: row;


  width: 100%;
  height: 100%;
}

.resume {
  width: 800px;
  padding-left: 4px;
  padding-right: 4px;
}

.header {
  margin-left: 19px;

}

.section-name {
  background-color: v-bind(primaryColor);
  font-size: 23px;
  margin-bottom: 10px;
  color: v-bind(textColor);
}

h2 {
  font-size: 1.2em;
  margin-top: 20px;
}

.content {
  margin-left: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table, th, td {
  border: 2px solid #000;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #dbd8d8;
}

.small {
  width: 18%;
}

.Technology {
  background-color: #000;
  width: 10%;
  color: white;
  text-align: center;
}

.Level {
  background-color: #000;
  width: 10%;
  color: white;
  text-align: center;
}

.Duration {
  background-color: #000;
  width: 5%;
  color: white;
  text-align: center;
}

.date {
  background-color: #000;
  width: 10%;
  color: white;
  text-align: center;

}

.Description {
  background-color: #000;
  width: 25%;
  color: white;
  text-align: center;
}

.table-title {
  background-color: #dbd8d8;
  text-align: left;
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
      background-color: #ccc9c9; /* Default color for empty dash */
    }

    .dash-filled {
      background-color: v-bind(primaryColor);
    }
  }
}
</style>