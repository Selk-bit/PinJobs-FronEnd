<script setup lang="ts">

</script>

<template>


  <v-expand-transition>
    <div class="d-flex align-center profile-card ml-4 pa-4">
      <!-- Icon on the left -->
      <v-icon size="40" class="me-4" color="primary">
        mdi-robot-outline
      </v-icon>

      <div>
        <!-- Card Title -->
        <div class="profile-info ">
          <h3 style="width: 250px"/>
        </div>


        <div class="profile-info ">
          <!--            <span />-->
          <h3/>
          <p/>
          <p style="width: 700px"/>
          <p style="width: 400px"/>
          <p/>
          <p style="width: 700px"/>
          <p/>
        </div>
      </div>
    </div>

  </v-expand-transition>
</template>

<style scoped lang="scss">
.profile-card .profile-image__img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  animation: pulse-bg 1s infinite;
}

.profile-info span {
  min-width: 100px;
  height: 16px;
  display: inline-block;
  border-radius: 23px;
  background-color: #ddd;
}

.profile-info h3 {
  content: ' ';
  width: 550px;
  height: 24px;
  border-radius: 23px;
  background-color: #ddd;
  margin: 10px 0;
}

.profile-info p {
  width: 90%;
  background-color: #ddd;
  border-radius: 23px;
  height: 16px;
  margin-bottom: 5px;
  line-height: 140%;
}

@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
</style>