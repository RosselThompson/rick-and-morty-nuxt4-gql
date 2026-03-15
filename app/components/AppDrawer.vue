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
        class="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col"
      >
        <div
          class="p-6 flex items-center justify-between border-b border-gray-100"
        >
          <h2 class="text-xl font-bold text-gray-800">Menu</h2>
          <button @click="closeDrawer" class="text-gray-500">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <nav class="flex-1 p-4 flex flex-col gap-2">
          <NuxtLink
            to="/characters"
            class="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 transition-colors"
            active-class="bg-gray-100 text-gray-900 font-semibold"
            @click="closeDrawer"
          >
            <Icon name="heroicons:home" class="w-6 h-6 flex-shrink-0" />
            <span class="text-base">Characters</span>
          </NuxtLink>

          <NuxtLink
            to="/favorites"
            class="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 transition-colors"
            active-class="bg-gray-100 text-gray-900 font-semibold"
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
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

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
