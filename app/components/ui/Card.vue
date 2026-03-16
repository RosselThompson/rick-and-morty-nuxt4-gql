<template>
  <div
    @click="navigateToCharacter"
    class="bg-white rounded-2xl overflow-hidden border border-gray-100 w-full cursor-pointer"
  >
    <div class="relative h-[250px] w-full">
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
        <h3 class="font-bold text-lg text-gray-900 mb-1">
          {{ name }}
        </h3>
        <p class="text-gray-500 text-sm">
          {{ species }} from {{ originName || "Unknown" }}
        </p>
      </div>

      <button
        @click="toggleFavorite"
        class="flex-shrink-0 ml-4 w-12 h-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center"
        :class="{ 'text-yellow-500': isFavorite }"
      >
        <Icon
          :name="isFavorite ? 'heroicons:star-solid' : 'heroicons:star'"
          class="w-6 h-6"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { GetAllCharacterItem } from "#shared/types/characters.interface";

const props = defineProps<GetAllCharacterItem>();

const emit = defineEmits(["toggleFavorite"]);

const statusBadgeClasses = computed(() => {
  const statusLower = props.status.toLowerCase();
  if (statusLower === "alive") {
    return "bg-[#E8F5E9] text-[#2E7D32]";
  } else if (statusLower === "dead") {
    return "bg-[#FFEBEE] text-[#C62828]";
  } else {
    // Unknown or other status
    return "bg-gray-100 text-gray-700";
  }
});

const statusDotClasses = computed(() => {
  const statusLower = props.status.toLowerCase();
  if (statusLower === "alive") {
    return "bg-[#4CAF50]";
  } else if (statusLower === "dead") {
    return "bg-[#F44336]";
  } else {
    return "bg-gray-500";
  }
});

const isFavorite = computed(() => {
  return props.id === "2"; //MOCK
});

const toggleFavorite = () => {
  emit("toggleFavorite");
};

const navigateToCharacter = () => {
  navigateTo(`/characters/${props.id}`);
};
</script>
