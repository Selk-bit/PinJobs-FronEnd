<script setup lang="ts">

</script>

<template>


  <main class="l-main bd-container  ">

    <!-- Resume CV -->
    <div class="resume" id="area-cv" style="border: 1px solid blue">
      <div class="resume_left">

        <!-- HOME -->
        <section class="home" id="home">
          <div class="home_container section bd-grid">

            <div class="home_data bd-grid">
              <!--<img alt="Icon picture" class="home_img" id="base-cv-img">-->
              <h1 class="home_title">LEA <b>GALLIER</b></h1>
              <h3 class="home_profession">Analyst developer</h3>
              <div>
                <a download="" id="download-button" class="home_button-movil">Download</a>
              </div>
            </div>

            <div class="home_address bd-grid">
                                <span class="home_information">
                                    <i class="fa-solid fa-location-dot home_icon"></i> Port-Jérôme sur Seine - France
                                </span>
              <span class="home_information">
                                    <a href="mailto:leagallier.lag@gmail.com" class="home_link">
                                        <i class="fa-solid fa-envelope home_icon"></i> leagallier.lag@gmail.com
                                    </a>
                                </span>
              <span class="home_information">
                                    <a href="tel:+33611451165" class="home_link">
                                        <i class="fa-solid fa-phone home_icon"></i> 06.11.45.11.65
                                    </a>
                                </span>
            </div>
          </div>

          <!-- Theme change button -->
          <i class="fa-solid fa-moon change-theme" title="Theme" id="theme-button"></i>

          <!-- Button to generate and download the pdf. Available for desktop. -->
          <i class="fa-solid fa-download generate-pdf" title="Generate PDF" id="resume-button"></i>

        </section>

        <!-- SOCIAL -->
        <section class="social section">
          <h2 class="section-title">Social</h2>

          <div class="social_container bd-grid">
            <a href="https://github.com/LeaG76" target="_blank" class="social_link">
              <i class="fa-brands fa-github social_icon"></i> @Leag76
            </a>
            <a href="https://codepen.io/leag76" target="_blank" class="social_link">
              <i class="fa-brands fa-codepen social_icon"></i> @leag76
            </a>
            <a href="https://www.linkedin.com/in/leagallier76/" target="_blank" class="social_link">
              <i class="fa-brands fa-linkedin social_icon"></i> leagallier76
            </a>
          </div>
        </section>

        <!-- PROFILE -->
        <section class="profile section" id="profile">
          <h2 class="section-title">Profile</h2>

          <p class="profile_description">
            I'm actually a student in computer science at the University of Le Havre Normandie. This year is
            my last year of master's degree in computer science at the university. But this year I also
            joined the IES Ingénierie team by becoming an analyst developer in work-study training.
          </p>
        </section>

        <!-- SKILLS  -->
        <section class="skills section" id="skills">
          <h2 class="section-title">Skills</h2>
          <div class="skills_container">
            <div class="skills_content bd-grid">
              <div class="skills_name">
                <span class="skills_text">CSS</span>
                <div class="skills_box">
                  <span class="skills_progress" style="width: 85%;"></span>
                </div>
              </div>
              <div class="skills_name">
                <span class="skills_text">Git</span>
                <div class="skills_box">
                  <span class="skills_progress" style="width: 75%;"></span>
                </div>
              </div>
              <div class="skills_name">
                <span class="skills_text">HTML</span>
                <div class="skills_box">
                  <span class="skills_progress" style="width: 95%;"></span>
                </div>
              </div>
              <div class="skills_name">
                <span class="skills_text">Javascript</span>
                <div class="skills_box">
                  <span class="skills_progress" style="width: 80%;"></span>
                </div>
              </div>
              <div class="skills_name">
                <span class="skills_text">MySQL</span>
                <div class="skills_box">
                  <span class="skills_progress" style="width: 70%;"></span>
                </div>
              </div>
            </div>
          </div>

        </section>

        <!-- LANGUAGES -->
        <section class="languages section" id="languages">
          <h2 class="section-title">Languages</h2>

          <div class="languages_container">
            <ul class="languages_content bd-grid">
              <li class="languages_name">
                <span class="languages_text">French</span>
                <span class="languages_stars">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
              </li>
              <li class="languages_name">
                <span class="languages_text">English</span>
                <span class="languages_stars">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star languages_stars_checked"></i>
                                        <i class="fa-solid fa-star languages_stars_checked"></i>
                                    </span>
              </li>
            </ul>
          </div>
        </section>

      </div>

      <div class="resume_right position-relative">
        <img
            src="https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Icon picture"
            class="home_img" id="home-img" >
        <!-- EXPERIENCE -->
        <section class="experience section" id="experience">
          <h2 class="section-title">Experience</h2>

          <div class="experience_container bd-grid">
            <div class="experience_content">
              <div class="experience_time">
                <span class="experience_rounder"></span>
                <span class="experience_line"></span>
              </div>
              <div class="experience_data bd-grid">
                <h3 class="experience_title">ANALYST PROGRAMMER</h3>
                <span class="experience_company">Sandwichcourse | IES Ingénierie - France</span>
                <span class="experience_year">October 2022 - present</span>
                <p class="experience_description">
                  Work in this company dedicating the best responsibility in the area that
                  corresponds, delivering the best results for the company and improving productivity.
                </p>
              </div>
            </div>
            <div class="experience_content">
              <div class="experience_time">
                <span class="experience_rounder"></span>
              </div>
              <div class="experience_data bd-grid">
                <h3 class="experience_title">ANALYST PROGRAMMER</h3>
                <span class="experience_company">Internship | IES Ingénierie - France</span>
                <span class="experience_year">April 2021 - June 2021</span>
                <p class="experience_description">
                  Work in this company dedicating the best responsibility in the area that
                  corresponds, delivering the best results for the company and improving productivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- CERTIFICATES -->
        <section class="certificate section" id="certificates">
          <h2 class="section-title">Certificates</h2>

          <div class="certificate_container bd-grid">
            <div class="certificate_content">
              <div class="certificate_item">
                <span class="certificate_rounder"></span>
              </div>
              <div class="certificate_data bd-grid">
                <h3 class="certificate_year">2023</h3>
                <span class="certificate_title">Masters in Computer Science</span>
              </div>
            </div>
            <div class="certificate_content">
              <div class="certificate_item">
                <span class="certificate_rounder"></span>
              </div>
              <div class="certificate_data bd-grid">
                <h3 class="certificate_year">2021</h3>
                <span class="certificate_title">Bachelor in Computer Science
                                        <span class="certificate_honours">with honours</span>
                                    </span>
              </div>
            </div>
            <div class="certificate_content">
              <div class="certificate_item">
                <span class="certificate_rounder"></span>
              </div>
              <div class="certificate_data bd-grid">
                <h3 class="certificate_year">2018</h3>
                <span class="certificate_title">High School diploma in Sciences, speciality Mathematics
                                        <span class="certificate_honours">with honours</span>
                                    </span>
              </div>
            </div>
          </div>
        </section>

        <!-- EDUCATION -->
        <section class="education section" id="education">
          <h2 class="section-title">Education</h2>

          <div class="education_container bd-grid">
            <div class="education_content">
              <div class="education_time">
                <span class="education_rounder"></span>
                <span class="education_line"></span>
              </div>
              <div class="education_data bd-grid">
                <h3 class="education_title">Masters in Computer Science</h3>
                <span class="education_studies">Université Le Havre Normandie - France</span>
                <span class="education_year">2021 - 2023</span>
              </div>
            </div>
            <div class="education_content">
              <div class="education_time">
                <span class="education_rounder"></span>
                <span class="education_line"></span>
              </div>
              <div class="education_data bd-grid">
                <h3 class="education_title">Bachelor in Computer Science</h3>
                <span class="education_studies">Université Le Havre Normandie - France</span>
                <span class="education_year">2018 - 2021</span>
              </div>
            </div>
            <div class="education_content">
              <div class="education_time">
                <span class="education_rounder"></span>
              </div>
              <div class="education_data bd-grid">
                <h3 class="education_title">High School diploma in Sciences, speciality Mathematics</h3>
                <span class="education_studies">Lycée Guillaume Le Conquérant - France</span>
                <span class="education_year">2015 - 2018</span>
              </div>
            </div>
          </div>
        </section>

        <!-- INTERESTS -->
        <section class="interests section" id="interests">
          <h2 class="section-title">Interests</h2>
          <div class="interests_container bd-grid">
            <div class="interests_content">
              <i class="fa-solid fa-paw interests_icon"></i>
              <span class="interests_name">Animals</span>
            </div>
            <div class="interests_content">
              <i class="fa-solid fa-dragon interests_icon"></i>
              <span class="interests_name">Dinosaurs</span>
            </div>
            <div class="interests_content">
              <i class="fa-solid fa-film interests_icon"></i>
              <span class="interests_name">Movies/Series</span>
            </div>
            <div class="interests_content">
              <i class="fa-solid fa-leaf interests_icon"></i>
              <span class="interests_name">Nature</span>
            </div>
            <div class="interests_content">
              <i class="fa-solid fa-code interests_icon"></i>
              <span class="interests_name">Program</span>
            </div>
            <div class="interests_content">
              <i class="fa-solid fa-gamepad interests_icon"></i>
              <span class="interests_name">Video games</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

//body.dark-theme {
//  --title-color: #F2F2F2;
//  --text-color: #BFBFBF;
//  --container-color: #212121;
//  --container-color-alt: #796363;
//  --body-color: #2B2B2B;
//}


/* Scale CV */
//
//body.scale-cv {
//  --h1-font-size: 0.938rem;
//  --h2-font-size: 0.938rem;
//  --h3-font-size: 0.875rem;
//  --normal-font-size: 0.813rem;
//  --small-font-size: 0.75rem;
//  --smaller-font-size: 0.688rem;
//}
//
///* PDF A4 */
//
//.scale-cv .change-theme,
//.scale-cv .generate-pdf {
//  display: none;
//}
//
//.scale-cv .bd-container {
//  max-width: 695px;
//}
//
//.scale-cv .section {
//  padding: 1.5rem 0 0.80rem;
//}
//
//.scale-cv .section-title {
//  margin-bottom: 0.75rem;
//}
//
//.scale-cv .resume {
//  height: 1122px;
//}
//
//.scale-cv .resume_left {
//  width: 250px;
//  padding: 0 1.25rem;
//}
//
//.scale-cv .resume_right {
//  padding: 0 1rem 0 1.25rem;
//}
//
//.scale-cv .home_img {
//  width: 100px;
//  height: 100px;
//}
//
//.scale-cv .home_container {
//  gap: 1.5rem;
//}
//
//.scale-cv .home_data {
//  gap: 0.25rem;
//}
//
//.scale-cv .home_address,
//.scale-cv .social_container {
//  gap: 0.75rem;
//}
//
//.scale-cv .home_icon,
//.scale-cv .social_icon,
//.scale-cv .interests_icon {
//  font-size: 1rem;
//}
//
//.scale-cv .education_container,
//.scale-cv .experience_container,
//.scale-cv .certificate_container {
//  width: 500px;
//  gap: 1rem;
//}
//
//.scale-cv .education_time,
//.scale-cv .experience_time,
//.scale-cv .certificate_item {
//  padding-right: 0.5rem;
//}
//
//.scale-cv .education_rounder,
//.scale-cv .experience_rounder {
//  width: 11px;
//  height: 11px;
//  margin-top: 0.22rem;
//}
//
//.scale-cv .education_line,
//.scale-cv .experience_line {
//  width: 2px;
//  transform: translate(4.4px, -2px);
//}
//
//.scale-cv .education_data,
//.scale-cv .experience_data,
//.scale-cv .certificate_data {
//  gap: 0.25rem;
//}
//
//.scale-cv .certificate_rounder {
//  width: 4px;
//  height: 4px;
//}
//
//.scale-cv .skills_content {
//  gap: 0.25rem;
//}
//
//.scale-cv .skills_box {
//  width: 100px;
//  height: 8px;
//  border-radius: 4px;
//}
//
//.scale-cv .skills_progress {
//  height: 8px;
//  border-radius: 4px;
//  transform: translate(0.01px, 0);
//}
//
//.scale-cv .languages_content {
//  gap: 0.25rem;
//}
//
//.scale-cv .languages_text {
//  width: 115px;
//}

/* Body */


h1,
h2,
h3,
ul,
p {
  margin: 0;
}

h1,
h2,
h3 {
  color: var(--title-color);
  font-weight: var(--font-medium);
}

ul {
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Class CSS */

.section {
  padding: 1.5rem 0;
}

.section-title {
  font-size: var(--h2-font-size);
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
  text-transform: uppercase;
  letter-spacing: .35rem;
  text-align: center;
  margin-bottom: var(--margin-3);
}

/* Layout */

.bd-container {
  max-width: 968px;
  width: calc(100% - 3rem);
  margin-left: var(--margin-3);
  margin-right: var(--margin-3);
}

.bd-grid {
  display: grid;
  gap: 1.5rem;
}

.l-header {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--z-fixed);
  background-color: var(--body-color);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

/* Nav */

.nav {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

//@media screen and (max-width: 968px) {
//  .nav_menu {
//    position: fixed;
//    bottom: -100%;
//    left: 0;
//    width: 100%;
//    padding: 2rem 1.5rem;
//    background-color: var(--body-color);
//    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
//    border-radius: 1rem 1rem 0 0;
//    z-index: var(--z-fixed);
//    transition: all 0.5s ease;
//  }
//}

.nav_logo,
.nav_toggle {
  color: var(--title-color);
  font-weight: var(--font-medium);
}

.nav_toggle {
  font-size: 1.2rem;
  cursor: pointer;
}

.nav_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.nav_item {
  text-align: center;
}

.nav_link {
  display: flex;
  flex-direction: column;
  font-size: var(--smaller-font-size);
  color: var(--text-color-light);
  font-weight: var(--font-medium);
}

.nav_link:hover {
  color: var(--title-color);
}

.nav_icon {
  font-size: 1.2rem;
  margin-bottom: var(--margin-1);
}

/* Show menu */

.show-menu {
  bottom: var(--header-height);
}

/* Active menu link */

.active-link {
  color: var(--title-color);
}

/* Home page */

.home {
  position: relative;
}

.home_container {
  gap: 3rem;
}

.home_data {
  gap: .5rem;
  text-align: center;
}

.home_img {
  float: right;
  margin-top: 5px;
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  justify-self: center;
  margin-bottom: var(--margin-1);
}

.home_title {
  font-size: var(--h1-font-size);
}

.home_profession {
  font-size: var(--normal-font-size);
  margin-bottom: var(--margin-1);
}

.home_address {
  gap: 1rem;
}

.home_information {
  display: flex;
  align-items: center;
  font-size: var(--small-font-size);
}

.home_icon {
  font-size: 1.2rem;
  display: flex;
  width: 25px;
  justify-content: center;
  margin-right: 0.75rem;
}

.home_link {
  display: inline-flex;
  align-items: center;
  font-size: var(--small-font-size);
  color: var(--text-color);
}

.home_link:hover {
  color: var(--title-color);
}

.home_button-movil {
  display: inline-block;
  border: 2px solid var(--text-color);
  color: var(--title-color);
  padding: 1rem 2rem;
  border-radius: .25rem;
  transition: all 0.5s ease;
  font-weight: var(--font-medium);
  margin-top: var(--margin-3);
}

.home_button-movil:hover {
  background-color: var(--text-color);
  color: var(--container-color);
}

/* Social page */

.social_container {
  grid-template-columns: max-content;
  gap: 1rem;
}

.social_link {
  display: inline-flex;
  align-items: center;
  font-size: var(--small-font-size);
  color: var(--text-color);
}

.social_link:hover {
  color: var(--title-color);
}

.social_icon {
  font-size: 1.2rem;
  display: flex;
  width: 25px;
  justify-content: center;
  margin-right: 0.75rem;
}

/* Profile page */

.profile_description {
  text-align: center;
}

/* Education page */

.education_content,
.experience_content,
.certificate_content {
  display: flex;
}

.education_time,
.experience_time,
.certificate_item {
  padding-right: 1rem;
}

.education_rounder,
.experience_rounder {
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  background-color: var(--text-color-light);
  border-radius: 50%;
  margin-top: .25rem;
}

.education_line,
.experience_line {
  display: block;
  width: 2px;
  height: 115%;
  background-color: var(--text-color-light);
  transform: translate(7px, 0);
}

.education_data,
.experience_data,
.certificate_data {
  gap: .35rem;
}

.education_title,
.experience_title,
.certificate_year {
  font-size: var(--h3-font-size);
}

.education_studies,
.experience_company,
.certificate_title {
  font-size: var(--small-font-size);
  color: var(--title-color);
}

.education_year,
.experience_year {
  font-size: var(--smaller-font-size);
}

.experience_description {
  color: var(--text-color-light);
  font-size: var(--smaller-font-size);
}

/* Skills */

.skills_content {
  gap: 0.2rem;
  padding-left: 2rem;
}

.skills_name {
  margin-bottom: .25rem;
}

.skills_text {
  display: inline-block;
  width: 100px;
}

.skills_box {
  display: inline-block;
  width: 150px;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--text-color-light);
}

.skills_progress {
  background-color: var(--text-color);
  display: block;
  height: 10px;
  border-radius: 6px;
}

/* Certificates */

.certificate_container {
  gap: 0.75rem;
}

.certificate_rounder {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: var(--text-color-light);
  border-radius: 50%;
  margin-right: 0.38rem;
  margin-left: 0.37rem;
}

.certificate_honours {
  font-size: var(--smaller-font-size);
  color: var(--text-color);
}

/* Languages */

.languages_content {
  gap: 0.2rem;
  padding-left: 2rem;
}

.languages_name {
  margin-bottom: .25rem;
}

.languages_text {
  display: inline-block;
  width: 100px;
}

.languages_stars {
  position: initial;
}

.languages_stars_checked {
  color: var(--text-color-light);
}

/* Interests */

.interests_container {
  grid-template-columns: repeat(3, 1fr);
  margin-top: var(--margin-2);
}

.interests_content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.interests_icon {
  font-size: 1.2rem;
  color: var(--text-color-light);
}

.scrolltop {
  position: fixed;
  right: 1.2rem;
  bottom: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  background-color: var(--container-color-alt);
  border-radius: 0.25rem;
  z-index: var(--z-tooltip);
  transition: 0.4s;
  visibility: hidden;
}

.scrolltop_icon {
  font-size: 1.2rem;
  color: var(--text-color);
}

.show-scroll {
  visibility: visible;
  bottom: 5rem;
}

/* Screen for small phones  */

@media screen and (max-width: 320px) {
  .nav_list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0.5rem;
  }
}

/* Computer screen -> PDF */

@media screen and (min-width: 968px) {
  body {
    margin: 3rem 0;
  }

  .bd-container {
    margin-left: auto;
    margin-right: auto;
  }

  .l-header,
  .scrolltop {
    display: none;
  }

  .resume {
    display: grid;
    grid-template-columns: .5fr 1fr;
    background-color: var(--container-color);
    box-shadow: 0 0 8px rgba(13, 12, 12, .15);
  }

  .resume_left {
    background-color: darkseagreen;
  }

  .resume_left,
  .resume_right {
    padding: 0 1.5rem;
  }

  .generate-pdf {
    display: inline-block;
  }

  .section-title,
  .profile_description {
    text-align: initial;
  }

  .home_container {
    gap: 1.5rem;
  }

  .home_button-movil {
    display: none;
  }

  .languages_content {
    padding-left: 0;
  }

  .languages_text {
    width: 150px;
  }

  .skills_content {
    padding-left: 0;
  }

  .interests_container {
    grid-template-columns: repeat(4, max-content);
    column-gap: 3.5rem;
    padding-left: 2rem;
  }
}
</style>