<script setup>
// import VueResizable from 'vue-resizable'
import {ref} from "vue";

// function checkEmpty(value) {
//   return typeof value !== "number" ? 0 : value;
// }
//

// const handlers = ref(["r", "rb", "b", "lb", "l", "lt", "t", "rt"]);
// // const handlers = ref(["r",]);
// const fit = ref(true);
//
// const maxW = ref(1000);
// const minW = ref(800);
//
// const maxH = ref(1000);
// const minH = ref(800);
//
// const width = ref(800);
// const height = ref(800);
//
// const left = ref(10);
// const top = ref(0);
// const right = ref(0);
//
// function eHandler(data) {
//   width.value = data.width;
//   height.value = data.height;
//   left.value = data.left;
//   top.value = data.top;
// }

const elementOne = ref({
  x: 820,
  y: 0,
  width: 800,
  height: 800,
  zIndex: 2,
  isActive: true,
})
</script>

<template>
  <draggable-resizable-vue
      v-model:x="elementOne.x"
      v-model:y="elementOne.y"
      v-model:h="elementOne.height"
      v-model:w="elementOne.width"
      :min-width="800"
      :min-height="800"
      :max-width="1000"
      :max-height="900"
      :draggable="false"
      :Resize="true"

      v-model:active="elementOne.isActive"
      :parent="true"
      :handles-size="20"

      :handles="[ 'ml','bm' ]"
      class="editor  bg-surface elevation-1 pa-3 overflow-y-auto  "

  >
<!--      handles-type="borders"-->
    <!--    <template #handle-bm>&</template>-->
        <template #handle-ml><v-icon>mdi-menu</v-icon></template>
    <!-- <template #handle-bm><v-icon>mdi-menu</v-icon></template>-->
    <!--    <div class="overflow-y-auto" style="height: 1900px">-->
    <!--      text here-->
    <!--    </div>-->
    <div>
      <v-label class="mb-2 font-weight-medium">Username</v-label>
      <v-text-field variant="outlined" type="text" placeholder="Username" color="primary">
        <template v-slot:prepend-inner>
          <UserIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>
        </template>
      </v-text-field>
      <v-label class="mb-2 font-weight-medium">Email</v-label>
      <v-text-field variant="outlined" type="email" placeholder="Email" color="primary">
        <template v-slot:prepend-inner>
          <MailIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>
        </template>
      </v-text-field>
      <v-label class="mb-2 font-weight-medium">Password</v-label>
      <v-text-field variant="outlined" type="password" placeholder="Password" color="primary">
        <template v-slot:prepend-inner>
          <LockIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>
        </template>
      </v-text-field>
      <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
      <v-text-field variant="outlined" type="password" color="primary" hide-details placeholder="Confirm Password">
        <template v-slot:prepend-inner>
          <LockIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>
        </template>
      </v-text-field>
      <div class="my-3">
        <v-checkbox density="compact" v-model="checkbox1" hide-details color="primary"
                    label="Check Me Out!"></v-checkbox>
      </div>
      <v-btn color="primary" class="mr-3" flat>Submit</v-btn>
      <v-btn color="error" class="mr-3" flat>Cancel</v-btn>
    </div>
    <v-row>
      <v-col cols="12" lg="12">
        <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Person Info</v-alert>

        <v-row>
          <v-col cols="12" md="6">
            <v-label class="mb-2 font-weight-medium">First Name</v-label>
            <v-text-field variant="outlined" color="primary"></v-text-field>
            <v-label class="mb-2 font-weight-medium">Select Gender</v-label>
            <v-select :items="gender" item-title="gender" item-value="abbr" return-object single-line
                      variant="outlined"></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-label class="mb-2 font-weight-medium">Last Name</v-label>
            <v-text-field variant="outlined" color="primary"></v-text-field>
            <v-label class="mb-2 font-weight-medium">Date of Birth</v-label>
            <v-text-field color="primary" variant="outlined" type="date"></v-text-field>
          </v-col>
        </v-row>
        <v-label class="mb-2 font-weight-medium">Membership</v-label>
        <v-radio-group v-model="inline" inline>
          <v-radio label="Free" value="radio-1" color="primary"></v-radio>
          <v-radio label="Paid" value="radio-2" color="primary"></v-radio>
        </v-radio-group>
        <!---Address--->
        <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Address</v-alert>
        <v-row>
          <v-col cols="12">
            <v-label class="mb-2 font-weight-medium">Street</v-label>
            <v-text-field variant="outlined" color="primary" hide-details></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label class="mb-2 font-weight-medium">City</v-label>
            <v-text-field variant="outlined" color="primary"></v-text-field>
            <v-label class="mb-2 font-weight-medium">Post Code</v-label>
            <v-text-field variant="outlined" color="primary"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label class="mb-2 font-weight-medium">State</v-label>
            <v-text-field variant="outlined" color="primary"></v-text-field>
            <v-label class="mb-2 font-weight-medium">Country</v-label>
            <v-select
                :items="country"
                item-title="country"
                item-value="abbr"
                return-object
                single-line
                variant="outlined"
            ></v-select>
          </v-col>
        </v-row>

        <v-btn color="error" class="mr-3">Cancel</v-btn>
        <v-btn color="primary">Submit</v-btn>
      </v-col>
    </v-row>
  </draggable-resizable-vue>
</template>

<style scoped lang="scss">
.drag {
  cursor: grab;
  height: 20px;
  width: 80%;
  text-align: center;
  //border: 1px solid black;
  margin: 5px;
}

.editor {
  //z-index: 10;
  padding: 0;
  //
  //border: 2px solid blue;
  //width: 50%;
  //min-height: 900px;
  //background-color: aqua;


}
</style>


<!--  <vue-resizable class="editor  bg-surface elevation-1 pa-3 overflow-y-auto "-->
<!--                 style="border: 1px solid blue"-->
<!--                 :max-width="maxW | checkEmpty"-->
<!--                 :max-height="maxH | checkEmpty"-->
<!--                 :min-width="minW | checkEmpty"-->
<!--                 :min-height="minH | checkEmpty"-->
<!--                 :active="handlers"-->
<!--              -->
<!--                 @resize:start="eHandler"-->
<!--                 @resize:end="eHandler"-->
<!--                 :fit-parent="fit"-->
<!--                 :width="width"-->
<!--                 :height="height"-->
<!--                 :left="left"-->
<!--                 :right="right"-->
<!--                 :top="top"-->
<!--  >-->
<!--    <v-container class="" style="border: 1px solid blue">-->


<!--    </v-container>-->

<!--  </vue-resizable>-->


<!--  <div>-->
<!--        <v-label class="mb-2 font-weight-medium">Username</v-label>-->
<!--        <v-text-field variant="outlined" type="text" placeholder="Username" color="primary">-->
<!--          <template v-slot:prepend-inner>-->
<!--            <UserIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--        <v-label class="mb-2 font-weight-medium">Email</v-label>-->
<!--        <v-text-field variant="outlined" type="email" placeholder="Email" color="primary">-->
<!--          <template v-slot:prepend-inner>-->
<!--            <MailIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--        <v-label class="mb-2 font-weight-medium">Password</v-label>-->
<!--        <v-text-field variant="outlined" type="password" placeholder="Password" color="primary">-->
<!--          <template v-slot:prepend-inner>-->
<!--            <LockIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--        <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>-->
<!--        <v-text-field variant="outlined" type="password" color="primary" hide-details placeholder="Confirm Password">-->
<!--          <template v-slot:prepend-inner>-->
<!--            <LockIcon stroke-width="1.5" size="22" class="text-medium-emphasis"/>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--        <div class="my-3">-->
<!--          <v-checkbox density="compact" v-model="checkbox1" hide-details color="primary"-->
<!--                      label="Check Me Out!"></v-checkbox>-->
<!--        </div>-->
<!--        <v-btn color="primary" class="mr-3" flat>Submit</v-btn>-->
<!--        <v-btn color="error" class="mr-3" flat>Cancel</v-btn>-->
<!--      </div>-->
<!--      <v-row>-->
<!--        <v-col cols="12" lg="12">-->
<!--          <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Person Info</v-alert>-->

<!--          <v-row>-->
<!--            <v-col cols="12" md="6">-->
<!--              <v-label class="mb-2 font-weight-medium">First Name</v-label>-->
<!--              <v-text-field variant="outlined" color="primary"></v-text-field>-->
<!--              <v-label class="mb-2 font-weight-medium">Select Gender</v-label>-->
<!--              <v-select :items="gender" item-title="gender" item-value="abbr" return-object single-line-->
<!--                        variant="outlined"></v-select>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="6">-->
<!--              <v-label class="mb-2 font-weight-medium">Last Name</v-label>-->
<!--              <v-text-field variant="outlined" color="primary"></v-text-field>-->
<!--              <v-label class="mb-2 font-weight-medium">Date of Birth</v-label>-->
<!--              <v-text-field color="primary" variant="outlined" type="date"></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-label class="mb-2 font-weight-medium">Membership</v-label>-->
<!--          <v-radio-group v-model="inline" inline>-->
<!--            <v-radio label="Free" value="radio-1" color="primary"></v-radio>-->
<!--            <v-radio label="Paid" value="radio-2" color="primary"></v-radio>-->
<!--          </v-radio-group>-->
<!--          &lt;!&ndash;-Address-&ndash;&gt;-->
<!--          <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Address</v-alert>-->
<!--          <v-row>-->
<!--            <v-col cols="12">-->
<!--              <v-label class="mb-2 font-weight-medium">Street</v-label>-->
<!--              <v-text-field variant="outlined" color="primary" hide-details></v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="6">-->
<!--              <v-label class="mb-2 font-weight-medium">City</v-label>-->
<!--              <v-text-field variant="outlined" color="primary"></v-text-field>-->
<!--              <v-label class="mb-2 font-weight-medium">Post Code</v-label>-->
<!--              <v-text-field variant="outlined" color="primary"></v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="6">-->
<!--              <v-label class="mb-2 font-weight-medium">State</v-label>-->
<!--              <v-text-field variant="outlined" color="primary"></v-text-field>-->
<!--              <v-label class="mb-2 font-weight-medium">Country</v-label>-->
<!--              <v-select-->
<!--                  :items="country"-->
<!--                  item-title="country"-->
<!--                  item-value="abbr"-->
<!--                  return-object-->
<!--                  single-line-->
<!--                  variant="outlined"-->
<!--              ></v-select>-->
<!--            </v-col>-->
<!--          </v-row>-->

<!--          <v-btn color="error" class="mr-3">Cancel</v-btn>-->
<!--          <v-btn color="primary">Submit</v-btn>-->
<!--        </v-col>-->
<!--      </v-row>-->