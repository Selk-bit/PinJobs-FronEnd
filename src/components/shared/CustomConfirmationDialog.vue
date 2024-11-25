<script setup lang="ts">

const emits = defineEmits(['accept', 'reject'])

interface IProps {
  dialog: boolean;
  id?: string;
  ids?: string[];
  title: string;
  text: string;
  confirmTextButton: string;
  cancelTextButton?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  dialog: false,
});
</script>

<template>
  <v-dialog v-model="dialog" class="backdrop" persistent max-width="400px">
    <v-card>
      <v-card-title>{{ title || 'Delete items' }}</v-card-title>
      <div class=" pa-4 flex-nowrap d-flex ">
        {{ text }}
      </div>
      <v-spacer></v-spacer>
      <v-card-actions class="justify-space-between">
        <v-btn color="secondary" v-if="cancelTextButton" text @click="$emit('reject')">{{ cancelTextButton || 'Cancel' }}</v-btn>
        <v-btn color="error" variant="tonal" v-if="confirmTextButton" @click="$emit('accept')">{{ confirmTextButton || 'Confirm' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>