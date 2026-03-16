<template>
  <p
    class="text-center text-gray-500 mb-4 font-semibold text-sm transition-colors duration-300 ease-in-out dark:text-gray-400"
  >
    {{ message }}
  </p>
</template>

<script setup lang="ts">
interface MessageProps {
  message: string;
}
defineProps<MessageProps>();
</script>
