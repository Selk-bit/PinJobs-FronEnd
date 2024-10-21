<script setup>
import {SearchIcon} from 'vue-tabler-icons';
import {searchSugg} from '@/_mockApis/headerData';
import {computed, ref, shallowRef} from "vue";
import sidebarItem from "@/layouts/full/vertical-sidebar/sidebarItem";

const sidebarMenu = shallowRef(sidebarItem);


function filterItemsWithValidRoutes(items) {
  return items.reduce((acc, item) => {
    if (item.to && item.to !== '#') {
      acc.push(item);
    } else if (item.children) {
      const validChildren = item.children.filter(child => child.to && child.to !== '#');
      acc.push(...validChildren);
    }
    return acc;
  }, []);
}

const MenuItems = ref(filterItemsWithValidRoutes(sidebarItem));
const filteredItems = computed(() => {
  if (search.value !== '') {
    return MenuItems.value.filter((item) => {
      return item.title.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    return MenuItems.value;
  }

});
const menu = ref()
const search = ref('')

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- search1 -->
  <!-- ------------------------------------------------>
  <v-menu :close-on-content-click="false" v-model="menu">
    <template v-slot:activator="{ props }">
      <v-btn icon variant="text" class="custom-hover-primary ml-2" size="small" color="primary" v-bind="props">
        <SearchIcon size="22"/>
      </v-btn>
    </template>

    <v-sheet width="360" elevation="10" rounded="md">
      <div class="d-flex align-center justify-space-between pa-5">
        <v-text-field placeholder="Search" color="primary" v-model="search" density="compact" variant="outlined"
                      hide-details></v-text-field>
      </div>
      <v-divider></v-divider>
      <h5 class="text-h5 mt-4 px-5 pb-4">Quick Page Links</h5>
      <perfect-scrollbar style="height: 380px">
        <v-list class="pt-0 pb-5" lines="two">
          <v-list-item
              :value="item"
              v-for="(item, index) in filteredItems"
              :key="index"
              exact
              :to="item.to"
              @click.stop="menu = false"
              active-color="primary"
              class="px-5 py-2"
          >
            <h6 class="text-subtitle-1 font-weight-medium mb-1">{{ item.title }}</h6>
<!--            <p class="text-subtitle-2 text-medium-emphasis">{{ item.to }}</p>-->
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
    </v-sheet>
  </v-menu>
</template>
