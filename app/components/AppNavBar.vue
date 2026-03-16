<template>
  <nav
    class="sticky top-0 z-10 flex items-center justify-between bg-white p-6 text-slate-900 transition-colors duration-300 ease-in-out dark:bg-slate-950 dark:text-slate-100"
  >
    <div class="flex items-center gap-6">
      <button
        class="rounded-md p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 ease-in-out"
        @click="openDrawer"
      >
        <Icon name="heroicons:bars-3" class="w-6 h-6" />
      </button>
      <h1
        class="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300 ease-in-out"
      >
        Rick and Morty App
      </h1>
    </div>
    <ClientOnly>
      <button
        class="rounded-md p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 ease-in-out"
        @click="toggleTheme"
      >
        <Icon
          :name="theme === 'dark' ? 'heroicons:sun' : 'heroicons:moon'"
          class="w-6 h-6"
        />
      </button>
      <template #fallback>
        <div class="w-6 h-6 animate-pulse">...</div>
      </template>
    </ClientOnly>
  </nav>
</template>

<script setup lang="ts">
import type { Theme } from "~/types/theme";

interface AppNavBarProps {
  theme: Theme;
}
defineProps<AppNavBarProps>();
const emit = defineEmits(["open-drawer", "toggle-theme"]);

const openDrawer = () => {
  emit("open-drawer");
};

const toggleTheme = () => {
  emit("toggle-theme");
};
</script>
