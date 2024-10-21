<template>
  <div id="app">




    <div class="container py-2">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <hr />
        </div>
      </div>
    </div>

    <div class="container pt-2 pb-4">
      <div class="row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <p>Right click on an item below.</p>

          <div class="list-group">
            <div
              v-for="(item, index) in itemArray1"
              :key="index"
              @contextmenu.prevent.stop="handleClick1($event, item)"
              class="list-group-item list-group-item-action"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <p>Left click on an item below.</p>

          <div class="list-group">
            <div
              v-for="(item, index) in itemArray2"
              :key="index"
              @click.prevent.stop="handleClick2($event, item)"
              class="list-group-item list-group-item-action"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-simple-context-menu
      element-id="myFirstMenu"
      :options="optionsArray1"
      ref="vueSimpleContextMenu1"
      @option-clicked="optionClicked1"
    >
    </vue-simple-context-menu>

    <vue-simple-context-menu
      element-id="mySecondMenu"
      :options="optionsArray2"
      ref="vueSimpleContextMenu2"
      @option-clicked="optionClicked2"
    >
    </vue-simple-context-menu>

      <!--  <vue-simple-context-menu-->
  <!--      element-id="Menu"-->
  <!--      :options="options"-->
  <!--      ref="vueSimpleContextMenuOptions"-->
  <!--      @option-clicked="optionClicked1"-->
  <!--  >-->
  <!--  </vue-simple-context-menu>-->

  <!--  Work dialog-->
  </div>



</template>

<script>


// const vueSimpleContextMenuOptions = ref();
// const options = ref([
//   {
//     name: 'Duplicate',
//     slug: 'duplicate',
//   },
//   {
//     type: 'divider',
//   },
//   {
//     name: 'Edit',
//     slug: 'edit',
//   },
//   {
//     name: '<em>Delete</em>',
//     slug: 'delete',
//   },
// ]);
// function ShowContextMenu(event: any, item: { item: Object, arr: number[] }) {
//   vueSimpleContextMenuOptions.value.showMenu(event, item);
// }

// function optionClicked1(event: any, item: any) {
//   window.alert(JSON.stringify(event));
//   toast("I'm a toast!");
// }

// function handleClick2(event: any, item: any) {
//   vueSimpleContextMenuOptions.value.showMenu(event, item);
// }
// function optionClicked2(event: any) {
//   window.alert(JSON.stringify(event));
// }
export default {
  name: 'app',
  data() {
    return {
      itemArray1: [
        {
          name: 'Jim',
          job: 'Salesman',
        },
        {
          name: 'Dwight',
          job: 'Assistant to the Regional Manager',
        },
        {
          name: 'Pam',
          job: 'Receptionist',
        },
      ],
      itemArray2: [
        {
          name: 'Leslie',
          job: 'Deputy Director',
        },
        {
          name: 'Ron',
          job: 'Parks Director',
        },
        {
          name: 'Andy',
          job: 'Shoeshiner',
        },
      ],
      optionsArray1: [
        {
          name: 'Duplicate',
          slug: 'duplicate',
        },
        {
          type: 'divider',
        },
        {
          name: 'Edit',
          slug: 'edit',
        },
        {
          name: '<em>Delete</em>',
          slug: 'delete',
        },
      ],
      optionsArray2: [
        {
          name: 'Add Star',
          slug: 'add-star',
          class: 'my-custom-class',
        },
        {
          name: 'Remove Star',
          slug: 'remove-star',
        },
      ],
    };
  },
  methods: {
    handleClick1(event, item) {
      this.$refs.vueSimpleContextMenu1.showMenu(event, item);
    },
    handleClick2(event, item) {
      this.$refs.vueSimpleContextMenu2.showMenu(event, item);
    },
    optionClicked1(event) {
      window.alert(JSON.stringify(event));
    },
    optionClicked2(event) {
      window.alert(JSON.stringify(event));
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Muli:400,700');

html {
  width: 100%;
  font-size: 18px;
  color: #333;
}

body {
  margin: 0;
  height: 100%;
  height: 100vh;
  width: 100%;
  font-family: 'Muli', sans-serif;
}

#app {
  height: 100%;
  height: 100vh;
  width: 100%;
  line-height: 1.5;
}

.code-text {
  background: #eee;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

@media (min-width: 992px) {
  .code-text {
    margin-bottom: 0;
  }
}

.btn {
  text-transform: uppercase;
  font-weight: bold;
}

textarea {
  min-height: 175px;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>