<template>
  <div class="text-center">
    <h1>Pricing Table CVDesignPro</h1>
    <div class="header">
      <h2>Modèle économique (Crédit)</h2>
      <p>*Un abonnement de 90$ est obligatoire par utilisateur à partir de 2025</p>
    </div>
  </div>

  <table>
    <colgroup></colgroup>
    <colgroup></colgroup>
    <colgroup></colgroup>
    <colgroup></colgroup>
    <colgroup></colgroup>
    <thead>
    <tr>
      <th>&nbsp;</th>
      <th>
        <h2>10 CVs</h2>
<!--        <p>Gratuit</p>-->
      </th>
      <th>
        <h2>11-30 Credits</h2>
<!--        <p>Crédit = 7$</p>-->
      </th>
      <th>
        <h2>31-500 credits</h2>
        <p class="promo">Notre forfait le plus précieux !</p>
<!--        <p>Crédit = 5$</p>-->
      </th>
      <th>
        <h2>+500 credits</h2>
<!--        <p>Crédit = 3$</p>-->
      </th>
    </tr>
    </thead>

    <tfoot>
    <tr>
      <th>&nbsp;</th>
      <td><a href="#">Consulter maintenant</a></td>
      <td><a href="#">Consulter maintenant</a></td>
      <td><a href="#">Consulter maintenant</a></td>
      <td><a href="#">Consulter maintenant</a></td>
    </tr>
    </tfoot>

    <tbody>
    <template v-for="plan in data">

      <tr>
        <th>
          {{ plan.label }}
          <span>{{ plan.text }}</span>
        </th>
        <td class="cell" v-for="(price, idx) in plan.prices" :key="idx">{{ price }}</td>
      </tr>

    </template>

    </tbody>
  </table>
    <p class="footer">La projection financiers sera basé sur la formule de 3$ par crédit</p>
</template>

<script setup>
import {reactive} from 'vue'
import {getPrimary,getLightSecondary} from "@/utils/UpdateColors";
import Template from "@/components/model-settings/sections/Template.vue";

const data = reactive([
  {
    label: 'Prix',
    text: "",
    prices: ['Gratuit', 'Crédit = 7$', 'Crédit = 5$', 'Crédit = 3$']
  },
  {
    label: 'Personnalisation du CV',
    text: "Personnalisation du CV is a feature where you can personalize your resume with custom sections and templates.",
    prices: ['1 crédit', '1 crédit', '1 crédit', '1 crédit']
  },
  {
    label: 'Traduction du CV',
    text: "Traduction du CV provides the ability to translate your resume into your desired language. ",
    prices: ['0,5 crédit', '0,5 crédit', '0,5 crédit', '0,5 crédit']
  },
  {
    label: 'Génération de contenu',
    text: "Génération de contenu offers the ability to extract data from your resume.",
    prices: ['0,5 crédit', '0,5 crédit', '0,5 crédit', '0,5 crédit']
  },
  {
    label: 'Gestion de la CVthèque',
    text: "Gestion de la CVthèque is a feature where you can search and filter through resumes and candidates with custom fields.",
    prices: ['0,5 crédit', '0,5 crédit', '0,5 crédit', '0,5 crédit']
  },
  {
    label: "Importation du design de l'entreprise",
    text: "Importation du design de l'entreprise allows you to import your own enterprise model as a template into the platform.",
    prices: ['X', '250$', '150$', 'Gratuit']
  }
])
</script>

<style scoped lang="scss">

.header {
  background-color: #f2f2f2;
  font-weight: bold;

  h1 {
    font-size: 2.5em;
    color: #00b300;
  }

  h2 {
    font-size: 1.5em;
    color: #ff66cc;
  }

  p {
    color: red;
    font-size: 1em;
  }
}


body {
  background: #fff;
  font: 400 1em/1.4 "Open Sans", "Helvetica Neue", sans-serif;
  color: #333;
  text-align: center;
  padding: 4em 2em;
}

h1 {
  font-weight: 300;
  font-size: 5em;
  line-height: 1.35;
  margin: 0 0 .125em;
}

h1 + p {
  font-size: 1.5em;
  color: #999;
  max-width: 30em;
  margin: 0 auto 3em;
}

table {
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

th, td {
  font-family: inherit;
  font-size: .875em;
  line-height: 1.45;
  color: #444;
  vertical-align: middle;
  padding: 1em;
}

th {
  font-weight: 600;
}

colgroup:nth-child(1) {
  width: 20%;
  border: 0 none;
}

colgroup:nth-child(2) {
  width: 20%;
  border: 1px solid #ccc;
}

colgroup:nth-child(3) {
  width: 20%;
  border: 1px solid #ccc;
}

colgroup:nth-child(4) {
  width: 20%;
  border: 7px solid v-bind(getPrimary);
}

colgroup:nth-child(5) {
  width: 20%;
  border: 1px solid #ccc;
}

/* Tablehead */

thead th {
  background: #def4fe;
  //background: -moz-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  //background: -webkit-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  //background: -o-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  //background: -ms-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  //background: linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%);
  text-align: center;
  position: relative;
  border-bottom: 1px solid #ccc;
  padding: 3em 0 2em;
  font-weight: 400;
  color: #999;
}

thead th:nth-child(1) {
  background: transparent;
}

thead th:nth-child(4) {
  padding: 2em 0 5em;
}

thead th h2 {
  font-weight: 300;
  font-size: 2.4em;
  line-height: 1.2;
  color: v-bind(getPrimary);
}

thead th h2 + p {
  font-size: 1.35em;
  line-height: 1.4;
}

thead th:nth-child(4) h2 {
  font-size: 3.6em;
}

thead th:nth-child(3) h2 + p {
  font-size: 1.5em;
}

thead th p.promo {
  font-size: 1em;
  color: #fff;
  position: absolute;
  top: 13em;
  left: -17px;
  z-index: 1000;
  width: 100%;
  margin: 0;
  padding: .625em 17px .75em;
  background: v-bind(getPrimary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
  border-bottom: 1px solid v-bind(getPrimary);
}

thead th p.promo:before {
  content: "";
  position: absolute;
  display: block;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 7px 7px 0;
  border-color: transparent   v-bind(getPrimary) transparent transparent;
  bottom: -7px;
  left: 0;
}

thead th p.promo:after {
  content: "";
  position: absolute;
  display: block;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 7px 7px 0 0;
  border-color: v-bind(getPrimary) transparent transparent transparent;
  bottom: -7px;
  right: 0;
}

/* Tablebody */

tbody th {
  background: #fff;
  border-left: 1px solid #ccc;
}

tbody th span {
  font-weight: normal;
  font-size: 87.5%;
  color: #999;
  display: block;
}

tbody td {
  background: #fff;
  text-align: center;
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  background: #f5f5f5;
  border-width: 1px 0 1px 1px;
}

tbody tr:last-child td {
  border-bottom: 0 none;
}

/* Tablefooter */

tfoot th {
  padding: 2em 1em;
  border-top: 1px solid #ccc;
}

tfoot td {
  text-align: center;
  padding: 2em 1em;
  border-top: 1px solid #ccc;
}

tfoot a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  display: block;
  padding: 1.125em 2em;
  background: v-bind(getPrimary);
  border-radius: .5em;
}

.footer {
  text-align: center;
  font-weight: bold;
}
</style>
