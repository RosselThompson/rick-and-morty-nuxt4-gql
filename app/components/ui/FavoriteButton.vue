<template>
  <button
    @click="toggleFavorite"
    class="flex-shrink-0 ml-4 w-12 h-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center transition-colors duration-300 ease-in-out dark:bg-slate-800 dark:text-gray-400"
    :class="{ 'text-yellow-500 dark:text-yellow-500': isFavorite }"
  >
    <Icon
      :name="isFavorite ? 'heroicons:star-solid' : 'heroicons:star'"
      class="w-6 h-6"
    />
  </button>
</template>

<script setup lang="ts">
interface FavoriteButtonProps {
  isFavorite: boolean;
}
const props = defineProps<FavoriteButtonProps>();

const emit = defineEmits(["toggleFavorite"]);

const toggleFavorite = () => {
  emit("toggleFavorite");
};
</script>
