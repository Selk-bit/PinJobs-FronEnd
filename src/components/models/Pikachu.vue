<script setup lang="ts">
import {useModelStore} from "@/stores/model";

const modelStore = useModelStore();

</script>

<template>
  <div class="mr-3 ">
    <div class="resume">
      <h1>pikashu here</h1>
      <p>Start adding content wherever.</p>
      <div class="multicolumn">
        <p>We can use layout tools like Flexbox or Grid...</p>
        <p>to help us achieve custom layouts, like multiple columns.</p>
        {{modelStore.model}}
      </div>
    </div>
  </div>
</template>


<style scoped>
.resume {
  height: 11in;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0.5in;
  width: 8.5in;
  background-color: white;
  box-shadow: 0 3px 8px -3px rgba(0, 0, 0, 0.7);
}



.multicolumn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>