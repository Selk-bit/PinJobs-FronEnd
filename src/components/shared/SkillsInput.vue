<template>
  <div class="tag-input" ref="tagInput" @click="focusInput">
    <div v-for="(skill, index) in skills" :key="skill" class="tag-input__tag">
      {{ skill }}
      <span @click="removeSkill(index)">x</span>
    </div>
    <input
      v-if="!isHidden"
      type="text"
      ref="inputField"
      :placeholder="customPlaceholder"
      class="tag-input__text"
      :class="{ 'error-border': showDuplicateError }"
      @keydown.enter.prevent="addSkill"
      @keydown.188.prevent="addSkill"
      @keydown.delete="removeLastSkill"
    />
  </div>
  <div class="text-error pt-0 pa-4" v-if="showDuplicateError">
    {{ duplicateSkillMessage }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Define props for skillsList and error message
const props = defineProps({
  customPlaceholder: {
    type: String,
    default: "Enter a skill",
  },
  skillsList: {
    type: Array,
    default: () => []
  },
  duplicateSkillMessage: {
    type: String,
    default: "This skill is already added"
  }
});

const tagInput = ref();
const inputField = ref();
const skills = ref([...props.skillsList]); // Initialize with skillsList prop
const showDuplicateError = ref(false);
const isHidden = ref(false);

// Emit changes to the parent
const emit = defineEmits(["update:skillsList"]);

const focusInput = () => {
  inputField.value?.focus();
};

// Watch for changes in the skillsList prop and update skills accordingly
watch(() => props.skillsList, (newList) => {
  skills.value = [...newList];
});

const addSkill = (event) => {
  const val = event.target.value.trim();

  if (val.length > 0) {
    // Check if the skill is already present
    if (skills.value.includes(val)) {
      showDuplicateError.value = true;
      // Temporarily hide the input field to show the error border effect immediately

    } else {
      skills.value.push(val);
      showDuplicateError.value = false;
      // Emit the updated skills to the parent only if there are no errors
      emit('update:skillsList', skills.value);
    }

    // Clear input
    event.target.value = '';
  }
};

const hideInputTemporarily = () => {
  isHidden.value = true;
  setTimeout(() => {
    isHidden.value = false;
  }, 0); // Using a minimal timeout to minimize latency
};

// Function to remove a skill
const removeSkill = (index) => {
  skills.value.splice(index, 1);
  emit('update:skillsList', skills.value);
};

// Remove the last skill when the delete key is pressed with an empty input
const removeLastSkill = (event) => {
  if (event.target.value.length === 0 && skills.value.length > 0) {
    removeSkill(skills.value.length - 1);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(102,126,234,1) 50%, rgba(69,252,250,1) 100%);
}

/*tag input style*/
.tag-input {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #D9DFE7;
  border-radius: 15px;
  font-size: 1em;
  min-height: 60px;
  box-sizing: border-box;
  padding: 0 20px;
  font-family: "Roboto";
  cursor: text;
}

.tag-input__tag {
  height: 30px;
  color: white;
  float: left;
  font-size: 19px;
  margin-right: 10px;
  background-color: #32bb3a;
  border-radius: 15px;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 16px;
  font-family: "Roboto";
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
  display: inline-block;
  margin-left: 8px;
}

.tag-input__text {
  width: auto;
  height: 50px;
  outline: none;
  font-size: 1em;
  line-height: 60px;
  background: none;
}

.error-border {
  border-color: red !important;
}

.text-error {
  color: red;
  font-size: 1.2em;
  margin-top: 10px;
}
</style>
