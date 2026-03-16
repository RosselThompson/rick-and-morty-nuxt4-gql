<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/40 z-40 transition-opacity"
        @click="closeDrawer"
      ></div>
    </Transition>
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 bottom-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
      >
        <div class="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Menu</h2>
          <button
            class="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            @click="closeDrawer"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <nav class="flex-1 p-4 flex flex-col gap-2">
          <NuxtLink
            to="/characters"
            class="flex items-center gap-4 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            active-class="bg-slate-100 text-slate-900 font-semibold dark:bg-slate-800 dark:text-slate-100"
            @click="closeDrawer"
          >
            <Icon name="heroicons:home" class="w-6 h-6 flex-shrink-0" />
            <span class="text-base">Characters</span>
          </NuxtLink>

          <NuxtLink
            to="/favorites"
            class="flex items-center gap-4 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            active-class="bg-slate-100 text-slate-900 font-semibold dark:bg-slate-800 dark:text-slate-100"
            @click="closeDrawer"
          >
            <Icon name="heroicons:heart" class="w-6 h-6 flex-shrink-0" />
            <span class="text-base">Favorites</span>
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface AppDrawerProps {
  isOpen: boolean;
}

const props = defineProps<AppDrawerProps>();

const emit = defineEmits(["close-drawer"]);

const closeDrawer = () => {
  emit("close-drawer");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
