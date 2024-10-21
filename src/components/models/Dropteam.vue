<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import {computed, onMounted} from "vue";
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

const setUnderlineLinks = computed(() => {
  return model.templateData.typography.underlineLinks ? 'underline' : 'none';
})
const setBorderRadius = computed(() => {
  return model.templateData.company_logo.borderRadius + 'px';
})
const identity = computed(() => {
  return model.templateData.identity;
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

// onMounted(()=> {
//   model.templateData.theme.primary = '#ccdbe7'
//   model.templateData.theme.text = '#5B9BD5'
// })
</script>

<template>
  <div class="page" data-size="A4" :class="model.templateData.typography.family">
    <div class="container">
      <div class="resume">
        <img :src="model.templateData.company_logo.url"
             :style="{width:model.templateData.company_logo.size + 'px'
             }"
             v-if="!model.templateData.company_logo.hidden"
             class="company-logo"
        />
        <div class="header">
          <h2 v-if="isHeadline" class="headline">{{ resume.headline }}</h2>
          <h2 class="name" v-if="isShowName">{{ resume.name }}</h2>
          <div v-else class="">
              <h2 class="mt-2 first-name text-h3" v-if="identity == 'reference'">
                {{ setModelReference }}{{ candidateSelected.reference ? '-' + candidateSelected.reference : '' }}
              </h2>
              <h2 class="mt-2 first-name " v-if="identity == 'alias'">
                {{ resume?.alias }}
              </h2>
            </div>
          <div class="contact-info mb-4 ">

            <div class="smallText text d-flex flex-column  align-start">
              <div class="text-body-1 font-weight-semibold" v-if="isShowPhone">
                <v-icon class="icon">mdi-cellphone</v-icon>
                {{ isShowPhone ? resume.phone : '' }}
              </div>
              <div class="text-body-1 font-weight-semibold" v-if="isShowEmail">
                <a class="text email">
                  <v-icon class="icon">mdi-email-outline</v-icon>
                  <span style="color: black;text-decoration: none">

                  {{ isShowEmail ? resume.email : '' }}
                  </span>
                </a>
              </div>
              <div class="text-body-1 font-weight-semibold" v-if="isShowCity">
                <v-icon class="icon">mdi-map-marker</v-icon>
                {{ isShowCity ? resume.city : '' }}
              </div>
              <div class="text-body-1 font-weight-semibold" v-if="isShowAge">
                <v-icon class="icon">mdi-cake-variant-outline</v-icon>
                {{ isShowAge ? resume.age : '' }}
              </div>
            </div>
          </div>

        </div>
        <div class="content">
          <!--        summary-->
          <div class="section">
            <div class="section-items">
              <!--              summary-->
              <div class="item" v-if="model.templateData.page.summary">
                <section>
                  <h3>Facultés :</h3>

                  <div v-html="resume.summary">
                  </div>
                </section>
              </div>
            </div>
          </div>
          <!--          skills-->
          <div class="section" v-if="model.templateData.skills.visible && resume.skills.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2>{{ model.templateData.skills.name }}:</h2>
                  </div>
                  <ul v-for="skill in resume.skills">
                    <li> {{ skill.skill }}</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <!--experience-->
          <div class="section" v-if="model.templateData.experience.visible && resume.work.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2>{{ model.templateData.experience.name }}:</h2>
                  </div>
                  <div v-for="work in resume.work">
                    <p>
                      <span class="blue underline"><strong>{{ work.company_name }} - {{ work.city }}</strong></span>
                      - {{ work.job_title }}
                    </p>
                    <span>
                  {{ work.start_date }} - {{ work.end_date }}
                </span>
                    <div class="desc" v-html="work.responsibilities">
                    </div>
                  </div>
                </section>

              </div>


            </div>
          </div>
          <!--education-->
          <div class="section" v-if="model.templateData.education.visible && resume.educations.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.education.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.educations">
                    <li class="mb">
                      {{ item.start_year + ' - ' + item.end_year }}: {{ item.degree }} – {{ item.institution }}
                    </li>

                  </ul>
                </section>
              </div>
            </div>
          </div>
          <!--Reference-->
          <div class="section" v-if="model.templateData.references.visible && resume.references.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.references.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.references">
                    <li class="mb">
                      <div class="item" v-for="item in resume.references">
                        <div class="font-weight-bold"> {{ item.name + '- ' + item.position }}</div>
                        <h5>{{ item.company }}</h5>
                        <div>{{ item.email }} <br></div>
                        <div> {{ item.phone }}</div>
                      </div>
                    </li>

                  </ul>
                </section>
              </div>
            </div>
          </div>

          <!--          Certifications-->
          <div class="section" v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.certifications.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.certifications">
                    <li class="mb">
                      <div class="item">
                        <div class="font-weight-bold"> {{ item.certification }}</div>
                        <h5>{{ item.institution }}</h5>
                        <div>
                          {{ item.date }}
                        </div>
                        <a :href="item.link" class="link" style="color: black;"> {{ item.link }}</a>
                      </div>
                    </li>

                  </ul>
                </section>
              </div>
            </div>
          </div>
          <!--projects-->
          <div class="section" v-if="model.templateData.projects.visible && resume.projects.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.projects.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.projects">
                    <li class="mb">
                      <div>
                        <div class="font-weight-bold"> {{ item.project_name }}</div>
                        <div>{{ item.start_date + ' ' + item.end_date }}</div>
                        <div class="desc" v-html="item.description"></div>
                      </div>
                    </li>

                  </ul>
                </section>
              </div>
            </div>
          </div>

          <!--          volunteering-->
          <div class="section" v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.volunteering.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.volunteering">
                    <li class="mb">
                      <div>
                        <div class="font-weight-bold"> {{ item.position }}</div>
                        <h4>{{ item.organization }}</h4>
                        <div>{{ item.start_date + ' ' + item.end_date }}</div>
                        <div class="desc" v-html="item.description"></div>
                      </div>
                    </li>

                  </ul>
                </section>
              </div>
            </div>
          </div>

          <!--          languages-->
          <div class="section" v-if="model.templateData.languages.visible && resume.languages.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.languages.name }}:</h2>
                  </div>
                  <div class="languages section-items">
                    <ul v-for="item in resume.languages" class=" language d-flex align-start justify-start">
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
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <!--          socials-->
          <div class="section" v-if="model.templateData.social.visible && resume.social.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.social.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.social">
                    <li class="mb">
                      <div class="skill">
                        {{ item.skill }}
                      </div>
                    </li>

                  </ul>
                </section>
              </div>
            </div>
          </div>

          <!--interests-->
          <div class="section" v-if="model.templateData.interests.visible && resume.interests.length > 0">
            <div class="section-items">
              <div class="item">
                <section class="section">
                  <div class="section-name">
                    <h2 class="blue underline mt"> {{ model.templateData.interests.name }}:</h2>
                  </div>
                  <ul v-for="item in resume.interests">
                    <li class="mb">
                      {{ item.interest }}
                    </li>

                  </ul>
                </section>
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

.icon {
  color: v-bind(primaryColor);
  margin-right: 5px;
}

.headline {
  color: v-bind(textColor) !important;
}

.heading {
  color: v-bind(textColor);
}

div.page {
  display: block;
  background-color: white;
  margin: 0 auto;
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

.resume {
  padding: 20px;
}

.header {
  text-align: center;
  font-size: smaller;
}



.name {
  text-align: center;
  color: black;
  text-transform: uppercase;
  margin-top: 0px;
}

.company-logo {
  position: relative;
  float: right;
  top: -20px;
  right: -10px;
  height: auto;


  margin-top: 10px;
}


.section {
  margin-bottom: 30px;

  .section-name {
    letter-spacing: 1.5px;
    font-weight: bold;
    margin-bottom: 20px;
    width: 80%;
    border-bottom: 3px solid v-bind(primaryColor);
    text-transform: uppercase;
    color: v-bind(textColor);
  }
}


//language
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