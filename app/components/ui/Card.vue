<template>
  <div
    class="bg-white rounded-2xl overflow-hidden border border-gray-100 w-full cursor-pointer transition-colors duration-300 ease-in-out dark:bg-slate-900 dark:border-slate-800"
  >
    <div @click="navigateToCharacter" class="relative h-[250px] w-full">
      <NuxtImg
        :src="image"
        :alt="name"
        width="800"
        height="500"
        sizes="(max-width: 640px) 100vw, 400px"
        class="w-full h-full object-cover object-center"
      />

      <div
        class="absolute top-3 right-3 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-xs uppercase shadow-sm"
        :class="statusBadgeClasses"
      >
        <div class="w-1.5 h-1.5 rounded-full" :class="statusDotClasses"></div>
        {{ status }}
      </div>
    </div>

    <div class="p-5 flex items-start justify-between">
      <div class="flex-1">
        <h3
          class="font-bold text-lg text-gray-900 mb-1 dark:text-white transition-colors duration-300 ease-in-out"
        >
          {{ name }}
        </h3>
        <p
          class="text-gray-500 text-sm dark:text-gray-400 transition-colors duration-300 ease-in-out"
        >
          {{ species }} from {{ originName || "Unknown" }}
        </p>
      </div>

      <UiFavoriteButton
        class="ml-4"
        :is-favorite="isFavorite"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { GetAllCharacterItem } from "#shared/types/characters.interface";
import { getStatusBadgeClass, getStatusDotClass } from "~/utils/statusClasses";

interface CardProps extends GetAllCharacterItem {
  isFavorite: boolean;
}

const props = defineProps<CardProps>();

const emit = defineEmits(["toggleFavorite"]);

const statusBadgeClasses = computed(() => getStatusBadgeClass(props.status));

const statusDotClasses = computed(() => getStatusDotClass(props.status));

const toggleFavorite = () => {
  emit("toggleFavorite");
};

const navigateToCharacter = () => {
  navigateTo(`/characters/${props.id}`);
};
</script>
