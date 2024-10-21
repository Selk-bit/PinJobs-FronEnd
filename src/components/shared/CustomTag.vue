<template>
  <div class="tag-input " ref="tagInput" @click="focusInput">
    <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
      {{ tag }}
      <span @click="removeTag(index)">x</span>
    </div>
    <input
      v-if="!isHidden"
      type="text"
      ref="inputField"
      :placeholder="customPlaceholder"
      class="tag-input__text "
      :class="{ 'error-border': showError || showDuplicateError }"
      @keydown.enter="addTag"
      @keydown.188="addTag"
      @keydown.delete="removeLastTag"
    />
  </div>
  <div class="text-error pt-0 pa-4" v-if="showError">
    {{ invalidEmailMessage }}
  </div>
  <div class="text-error pt-0 pa-4" v-if="showDuplicateError">
    {{ duplicateEmailMessage }}
  </div>
<!--  <a target="_blank" href="https://github.com/Saldoc/">Saldoc</a>-->
</template>

<script setup>
import { ref, watch } from 'vue';

// Define props for emailList and error messages
const props = defineProps({
  customPlaceholder:{
    type:String,
    default:"Enter Email",
  },
  emailList: {
    type: Array,
    default: () => []
  },
  invalidEmailMessage: {
    type: String,
    default: "One or more emails are invalid"
  },
  duplicateEmailMessage: {
    type: String,
    default: "One or more emails are duplicates"
  }
});


const tagInput = ref()
const inputField = ref()

const focusInput = () => {
  inputField.value?.focus();
};
// Emit changes to the parent
const emit = defineEmits(["update:emailList"]);

// Reactive variables
const tags = ref([...props.emailList]); // Initialize with emailList prop
const showError = ref(false);
const showDuplicateError = ref(false);
const isHidden = ref(false); // Used to hide the input text temporarily

// Email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Watch for changes in the emailList prop and update tags accordingly
watch(() => props.emailList, (newList) => {
  tags.value = [...newList];
});

const addTag = (event) => {
  event.preventDefault();
  let val = event.target.value.trim();

  if (val.length > 0) {
    // Split the input by commas to handle multiple emails
    const emailList = val.split(',').map(email => email.trim());

    const invalidEmails = [];
    const duplicateEmails = [];

    emailList.forEach(email => {
      if (!emailRegex.test(email)) {
        invalidEmails.push(email);
      } else if (tags.value.includes(email)) {
        duplicateEmails.push(email);
      } else {
        tags.value.push(email); // Add valid and non-duplicate email
      }
    });

    // Show error messages if there are any invalid or duplicate emails
    if (invalidEmails.length > 0) {
      showError.value = true;
      showDuplicateError.value = false;
    } else if (duplicateEmails.length > 0) {
      showDuplicateError.value = true;
      showError.value = false;
    } else {
      showError.value = false;
      showDuplicateError.value = false;
    }

    // Clear input
    event.target.value = '';

    // Emit the updated tags to the parent
    emit('update:emailList', tags.value);

    // Hide the input text temporarily for errors
    if (showError.value || showDuplicateError.value) {
      isHidden.value = true;
      setTimeout(() => {
        isHidden.value = false;
      }, 2000);
    }
  }
};

// Function to remove a tag
const removeTag = (index) => {
  tags.value.splice(index, 1);

  // Emit the updated tags to the parent
  emit('update:emailList', tags.value);
};

// Remove last tag when delete key is pressed with an empty input
const removeLastTag = (event) => {
  if (event.target.value.length === 0) {
    removeTag(tags.value.length - 1);
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

a {
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-weight: bold;
  text-decoration: none;
  color: v-bind(getPrimary);
  font-size: 20px;
}

/*tag input style*/
.tag-input {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #D9DFE7;
  border-radius: 15px;
  font-size: 1em;
  min-height: 60px; /* Increased height */
  box-sizing: border-box;
  padding: 0 20px; /* Increased padding */
  font-family: "Roboto";
   cursor: text;
}

.tag-input__tag {
  height: 30px; /* Increased height for the tag */
  color: white;
  float: left;
  font-size: 19px;
  margin-right: 10px;
  background-color: #32bb3a;
  border-radius: 15px;
  margin-top: 10px;
  line-height: 30px; /* Adjusted for bigger tag */
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
  width:auto;
  height: 50px;  /* Increased height */
  outline: none;

  font-size: 1em; /* Increased font size */
  line-height: 60px; /* Adjusted line height */
  background: none;
}

.error-border {
  border-color: red !important;
}

.text-error {
  color: red;
  font-size: 1.2em; /* Larger error text */
  margin-top: 10px;
}
</style>
