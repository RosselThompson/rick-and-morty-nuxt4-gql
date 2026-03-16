<template>
  <ClientOnly>
    <button
      @click.stop="toggleFavorite"
      :class="`flex-shrink-0 w-12 h-12 text-gray-400 rounded-xl flex items-center justify-center transition-colors duration-300 ease-in-out dark:text-gray-400 cursor-pointer
    ${!noBorder && 'bg-gray-100 dark:bg-slate-800'}
    ${isFavorite && 'text-yellow-500 dark:text-yellow-500'}`"
    >
      <Icon
        :name="isFavorite ? 'heroicons:star-solid' : 'heroicons:star'"
        class="w-6 h-6"
      />
    </button>
    <template #fallback>
      <div class="w-6 h-6 animate-pulse">...</div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
interface FavoriteButtonProps {
  isFavorite: boolean;
  noBorder?: boolean;
}
const props = defineProps<FavoriteButtonProps>();

const emit = defineEmits(["toggleFavorite"]);

const toggleFavorite = () => {
  emit("toggleFavorite");
};
</script>
