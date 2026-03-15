<template>
  <AppNavBar @open-drawer="toggleMenu" />
  <AppDrawer :is-open="isDrawerOpen" @close-drawer="toggleMenu" />
  <div class="px-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppDrawer from "~/components/AppDrawer.vue";
import { ref } from "vue";
const isDrawerOpen = ref(false);

const toggleMenu = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
