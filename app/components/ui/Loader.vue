<template>
  <div
    :class="`animate-spin rounded-full h-[${size}] w-[${size}] border-b-2 border-gray-400`"
  ></div>
</template>
<script setup lang="ts">
defineProps<{
  size?: string;
}>();
</script>
