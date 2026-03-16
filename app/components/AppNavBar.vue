<template>
  <nav class="bg-white p-6 flex items-center justify-between sticky top-0 z-10">
    <div class="flex items-center gap-6">
      <button @click="openDrawer">
        <Icon name="heroicons:bars-3" class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-semibold text-gray-800 mb-1">Rick and Morty</h1>
    </div>
    <button>
      <Icon name="heroicons:moon" class="w-6 h-6" />
    </button>
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits(["open-drawer"]);

const openDrawer = () => {
  emit("open-drawer");
};
</script>
