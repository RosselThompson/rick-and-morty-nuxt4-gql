<template>
  <button
    @click="goBack"
    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
  >
    <Icon name="heroicons:arrow-left" class="w-6 h-6" />
    <span class="font-semibold">Back</span>
  </button>
  <p>Character: {{ $route.params.id }}</p>
</template>

<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
