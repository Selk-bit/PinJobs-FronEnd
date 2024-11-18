<script setup lang="ts">
import {useModelStore} from "@/stores/model";
import {useResumeStore} from "@/stores/resume";
import {computed} from "vue";
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

const yearsOfExperienceText = computed(() => {
  return model.language === 'en' ? "Years of Experience" : " Années d'expérience";
});

const setUnderlineLinks = computed(() => {
  return model.templateData.typography.underlineLinks ? 'underline' : 'none';
})
const setBorderRadius = computed(() => {
  return model.templateData.company_logo.borderRadius + 'px';
})


const isShowName = computed(() => {
  return model.templateData.personnel.name;
})
const technicalEnvironmentText = computed(() => {
  return model.language === 'en' ? "Technical Environment" : "Environnement Technique";
});
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
  <div class="page" v-if="resume" data-size="A4" :class="model.templateData.typography.family">
    <div class="container">
      <header class="resume-header ">

        <img :src="model.templateData.company_logo.url"
             v-if="!model.templateData.company_logo.hidden"
             class="company-logo"
             draggable="false"
             :style="{width:model.templateData.company_logo.size + 'px',
             }"
        />


        <h1 class="name" v-if="isShowName">{{ resume.name }}</h1>
        <div v-else>
          <h1 class="mt-2 first-name text-h3" v-if="identity === 'reference'">
            {{ setModelReference }}{{ candidateSelected.reference ? '-' + candidateSelected.reference : '' }}
          </h1>
          <h1 class="mt-2 first-name" v-if="identity === 'alias'">
            {{ resume?.alias }}
          </h1>
        </div>
        <h3 class="headline" v-if="isHeadline">{{ resume?.headline }}</h3>
        <h5 class="address" v-if="resume.yoe">{{ resume.yoe ?? '' }} {{ yearsOfExperienceText }}</h5>

        <div class="contact-info ">
          <span class="email">{{ isShowEmail ? resume.email : '' }}</span>
          <!--          <h3 class="address" v-if="resume.yoe">{{ resume.yoe ?? '' }} {{ yearsOfExperienceText }}</h3>-->
          <span class="phone">{{ isShowPhone ? resume.phone : '' }}</span>
        </div>
        <div class="separator"></div>
      </header>


      <!--experience-->
      <section class="experience-section" v-if="model.templateData.experience.visible && resume.work.length > 0">

        <h2 class="section-title">{{ model.templateData.experience.name }}</h2>
        <div class="separator"></div>

        <!-- First Job Experience -->
        <div class="job" :key="index" v-for="(item,index) in resume.work">
          <div class="job-header">
            <h3 class="company-name">{{ item.company_name }}</h3>
            <span class="location">{{ item.city || '' }}</span>
          </div>
          <div class="job-details">
            <p class="position">{{ item.job_title }}</p>
            <p class="date">{{ (item.start_date || '') + ' ' + (item.end_date || '') }}</p>
          </div>
          <div class="responsibilities" v-html="item.responsibilities">
          </div>
          <v-row class="my-3  environment d-flex " v-if="item.environnement">
            <v-col cols="3" class="text-subtitle-2 font-weight-bold">{{ technicalEnvironmentText }}</v-col>
            <v-col class="env">
              <div v-html="item.environnement">
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- Additional job entries here -->
      </section>

      <!--      education-->
      <section class="education-section" v-if="model.templateData.education.visible && resume.educations.length > 0">
        <h2 class="section-title">{{ model.templateData.education.name }}</h2>
        <div class="separator"></div>

        <div class="education-entry" v-for="item in resume.educations">
          <div class="education-header">
            <h3 class="institution">{{ item.degree }}</h3>
            <span class="location">{{ item.start_year || '' }} - {{ item.end_year || '' }}</span>
          </div>
          <div class="education-details spaced-between">
            <p class="degree">{{ item.institution }}</p>
            <p class="date"></p>
          </div>
        </div>

        <!-- Additional education entries can be added similarly -->

      </section>


      <!--      Certifications-->
      <!--      education-->
      <section class="education-section"
               v-if="model.templateData.certifications.visible && resume.certifications.length > 0">
        <h2 class="section-title">{{ model.templateData.certifications.name }}</h2>
        <div class="separator"></div>

        <div class="education-entry" v-for="item in resume.certifications">
          <div class="education-header">
            <h3 class="institution">{{ item.certification }}</h3>
            <span class="location">{{ item.institution }}</span>
          </div>
          <div class="education-details spaced-between">
            <p class="degree">{{ item.link }}</p>
            <p class="date">{{ item.date || '' }}</p>
          </div>
        </div>

        <!-- Additional education entries can be added similarly -->

      </section>


      <!--      volunteering-->
      <section class="experience-section"
               v-if="model.templateData.volunteering.visible && resume.volunteering.length > 0">

        <h2 class="section-title">{{ model.templateData.volunteering.name }}</h2>
        <div class="separator"></div>

        <!-- First Job Experience -->
        <div class="job" v-for="item in resume.volunteering">
          <div class="job-header">
            <h3 class="company-name">{{ item.organization }}</h3>
            <span class="location"></span>
          </div>
          <div class="job-details mb-2">
            <p class="position">{{ item.position }}</p>
            <p class="date">{{ (item.start_date || '') + '-' + (item.end_date || '') }}</p>
          </div>
          <div v-html="item.description" class="responsibilities">
          </div>

        </div>
      </section>


      <!--professional skills-->
      <section class="professional-skills-section" v-if="model.templateData.social.visible && resume.social.length > 0">
        <h2 class="section-title">{{ model.templateData.social.name }}</h2>
        <div class="separator"></div>

        <div class="skills-list">
          <div v-for="(skill, index) in resume.social" :key="index" class="skill-item">
            <p class="skill-name">{{ skill.skill }}</p>
            <p class="skill-level">{{ skill.level }}</p>
          </div>
        </div>
      </section>

      <!--projects-->
      <section class="projects-section" v-if="model.templateData.projects.visible && resume.projects.length > 0">
        <h2 class="section-title">{{ model.templateData.projects.name }}</h2>
        <div class="separator"></div>

        <!-- Project Entries -->
        <div v-for="(project, index) in resume.projects" :key="index" class="project-entry">
          <div class="project-header">
            <h3 class="project-name">{{ project.project_name }}</h3>
            <p class="date">{{ project.start_date }} – {{ project.end_date }}</p>
          </div>
          <p class="project-description" v-html="project.description"></p>
        </div>
      </section>


      <!--      Skills-->
      <section class="skills-section" v-if="model.templateData.skills.visible && resume.skills.length > 0">
        <h2 class="section-title">{{ model.templateData.skills.name }}</h2>
        <div class="separator"></div>

        <!-- Frontend Skills -->
        <div class="skill-category" v-for="(skills, category) in groupedSkills" :key="category">
          <h3 class="category-title">{{ category }}</h3>
          <ul class="skill-list">
            <li>{{ skills.join(', ') }}</li>

          </ul>
        </div>

      </section>
      <!--      langs-->
      <section class="languages-section" v-if="model.templateData.languages.visible && resume.languages.length > 0">
        <h2 class="section-title">{{ model.templateData.languages.name }}</h2>
        <div class="separator"></div>

        <!-- Language Entries -->
        <div v-for="(language, index) in resume.languages" :key="index" class="language-entry">
          <div class="language-header">
            <p class="language-name">{{ language.language }}</p>
            <p class="language-level">{{ language.level }}</p>
          </div>
        </div>
      </section>
      <!--      interests-->
      <section class="interests-section" v-if="model.templateData.interests.visible && resume.interests.length > 0">
        <h2 class="section-title"> {{ model.templateData.interests.name }}</h2>
        <div class="separator"></div>
        <p class="interests-text">
             <span v-for="(item,index) in resume.interests" class="pa-1">
                  {{ item.interest }}<span v-if="!(resume.interests.length -1 == index)">,</span>
                </span>
        </p>
      </section>
    </div>
  </div>
</template>


<style scoped lang="scss">


* {
  :deep(ul), :deep(ol) {
    padding: 0 1rem;
    margin: 10px;
  }
    font-size: v-bind(fontSize) !important;
}


div.page {
  background-color: white;
  display: block;
  margin: 0;
  position: relative;
  padding: 30px;

  font-size: v-bind(fontSize);
}


.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}


//section title
.section-title {
  font-size: 1rem;
  font-weight: bold;
  //margin-bottom: 0.1rem;
}

//header
.resume-header {
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;

  .name {
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 0.2rem;
  }

  .headline {
    font-weight: 500;
  }

  .contact-info {
    display: flex;
    width: auto;
    margin-top: 30px;
    justify-content: space-between;
    gap: 1.5rem;
    font-weight: 600;
    font-size: 0.7rem;
    color: #333;
  }

  .separator {
    margin: 0.1rem auto;
    width: 100%;
    border-top: 3px solid #000;
  }
}


//interests
.interests-section {
  text-align: left;
  margin-bottom: 1rem;
  width: 100%;

  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 0.2rem;
  }

  .interests-text {
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
  }
}

//experience
.experience-section {
  text-align: left;
  margin-bottom: 2rem;

  //.section-title {
  //  font-size: 1.25rem;
  //  font-weight: bold;
  //  margin-bottom: 0.5rem;
  //}

  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1rem;
  }

  .job {
    margin-bottom: 1.5rem;

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;

      .company-name {
        font-size: 1rem;
      }

      .location {
        font-size: 0.9rem;
        //color: #666;
        font-weight: 500;
      }
    }

    .job-details {
      display: flex;
      justify-content: space-between;
      align-items: center;


      .position {
        font-size: 1rem;
        font-style: italic;
      }

      .date {
        font-size: 0.7rem;
        //color: #666;
        text-align: right;
        font-weight: 500;
      }
    }

    .responsibilities {
      //list-style-type: none;
      padding-left: 0;
      font-size: 0.80rem;
      //color: #333;

      li {
        padding: 0 0.8rem;
        margin: 10px;
      }

      .skill {
        font-weight: bold;
      }
    }

    .environment {
      margin-top: 10px;
      //padding: 0px 30px;
      display: flex;
      align-items: start;

      .env {
        font-size: 11px;
        word-spacing: 1.3px;
      }

      h5 {

        margin: 0px 10px 5px;
        width: 90px;
        min-width: 110px;
        font-size: 12px;
      }
    }
  }
}


//education
.education-section {
  text-align: left;
  margin-bottom: 1rem;
  width: 100%;


  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1.2rem;
  }

  .education-entry {
    margin-bottom: 1.5rem;

    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;

      .institution {
        font-size: 1rem;
      }

      .location {
        font-size: 0.9rem;
        //color: #666;
        font-weight: 500;
      }
    }

    .education-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-style: italic;

      .degree {
        font-size: 0.9rem;
      }

      .date {
        font-size: 0.7rem;
        //color: #666;
        text-align: right;
        font-weight: 500;
      }
    }
  }
}

//technical skills
.skills-section {
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;


  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1rem;
  }

  .skill-category {
    margin-bottom: 1rem;

    .category-title {
      font-size: 1rem;
      font-weight: 700;
      //margin-bottom: 0.25rem;
    }

    .skill-list {
      list-style-type: none;
      padding-left: 0;
      font-size: 0.90rem;
      color: #333;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      li {
        //margin-right: 1.5rem;
      }
    }
  }
}

//volunteering
.volunteering-section {
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;

  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1rem;
  }

  .volunteer-entry {
    margin-bottom: 1.5rem;

    .volunteer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;

      .organization {
        font-size: 1rem;
      }

      .location {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .volunteer-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.25rem 0;
      font-style: italic;

      .description {
        font-size: 0.9rem;
        font-weight: 400;
        max-width: 70%;
      }

      .date {
        font-size: 0.8rem;
        font-weight: 500;
        text-align: right;
      }
    }
  }
}

//soft skills
.professional-skills-section {
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;

  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1rem;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .skill-item {
      width: calc(50% - 8rem); // Two columns layout
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 400;
      padding: 0.2rem;
      border-bottom: 1px solid #ddd;

      .skill-name {
        font-weight: 600;
      }

      .skill-level {
        font-style: italic;
        color: #666;
      }
    }
  }
}


//projects
.projects-section {
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;

  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1rem;
  }

  .project-entry {
    margin-bottom: 1.5rem;

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;

      .project-name {
        font-size: 1rem;
      }

      .date {
        font-size: 0.9rem;
        font-weight: 500;
        color: #666;
        text-align: right;
      }
    }

    .project-description {
      font-size: 0.9rem;
      font-weight: 400;
      color: #333;
      margin-top: 0.5rem;
      padding-left: 1rem; // Slight indent for visual separation
    }
  }
}


.languages-section {
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;

  .separator {
    width: 100%;
    border-top: 1px solid #000;
    margin-bottom: 1rem;
  }

  .language-entry {
    margin-bottom: 1.2rem;

    .language-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;

      .language-name {
        font-size: 1rem;
      }

      .language-level {
        font-size: 0.9rem;
        font-weight: 500;
        color: #666;
        text-align: right;
      }
    }
  }
}
</style>
