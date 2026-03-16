<template>
  <div
    class="bg-white p-5 rounded-2xl border border-slate-100 transition-colors duration-300 ease-in-out dark:bg-slate-900 dark:border-slate-800"
    :class="className"
  >
    <span
      class="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 dark:text-gray-400 transition-colors duration-300 ease-in-out"
    >
      {{ title }}
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; className?: string }>();
</script>
