<template>
  <div
    class="animate-spin rounded-full border-b-2 border-gray-400 dark:border-gray-600"
    :class="`h-${size} w-${size}`"
  ></div>
</template>
<script setup lang="ts">
defineProps<{
  size?: string;
}>();
</script>
