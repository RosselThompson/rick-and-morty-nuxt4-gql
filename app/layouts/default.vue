<template>
  <AppNavBar
    @open-drawer="toggleMenu"
    @toggle-theme="toggleTheme"
    :theme="theme"
  />
  <AppDrawer :is-open="isDrawerOpen" @close-drawer="toggleMenu" />
  <div
    class="px-4 bg-white transition-colors duration-300 ease-in-out dark:bg-slate-950"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppDrawer from "~/components/AppDrawer.vue";
import type { Theme } from "~/types/theme";

const colorMode = useColorMode();
const theme = computed<Theme>(() =>
  colorMode.value === "dark" ? "dark" : "light",
);

const isDrawerOpen = ref(false);

const toggleMenu = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
