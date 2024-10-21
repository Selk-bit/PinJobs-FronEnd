<script setup lang="ts">
import {RouterLink} from 'vue-router';
import logo from '@/assets/images/logos/logo-app.svg';
import {computed} from "vue";


const height = computed(() => {
  return 40 + 'px'
});
const width = computed(() => {
  return 120 + 'px'
});
</script>
<template>
  <div class="logo">
    <RouterLink to="/" class="text">
      <div class="d-flex align-start">
        <img :src="logo" class="img" alt="home"/>

      </div>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">

.img {
  width: v-bind(width);
  height: v-bind(height);
  margin-right: 20px;
}

.text {
  text-decoration: none !important;
  font-weight: bold;
  color: #39B55A;


}
</style>