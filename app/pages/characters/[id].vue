<template>
  <div v-if="pending" class="flex justify-center items-center py-20">
    <UiLoader size="8" />
  </div>

  <UiMessage
    v-else-if="error"
    message="An error occurred retrieving character"
  />

  <div v-else-if="character">
    <header class="mb-4">
      <button
        @click="goBack"
        class="flex items-center gap-2 transition-colors duration-300 ease-in-out dark:text-white"
      >
        <Icon name="heroicons:arrow-left" class="w-6 h-6" />
      </button>
    </header>

    <div class="mb-5">
      <p
        class="text-gray-600 font-bold tracking-wide text-sm mb-1 uppercase transition-colors duration-300 ease-in-out dark:text-gray-400"
      >
        ID: #{{ character.id }}
      </p>
      <div class="flex items-center justify-between">
        <h2
          class="text-3xl font-black text-slate-900 transition-colors duration-300 ease-in-out dark:text-white"
        >
          {{ character.name }}
        </h2>
        <UiFavoriteButton
          :is-favorite="favoritesStore.isFavorite(character.id)"
          @toggle-favorite="toggleFavorite(character)"
        />
      </div>
    </div>
    <div class="md:flex md:gap-4 md:w-full">
      <div
        class="w-full h-[250px] mb-8 rounded-2xl overflow-hidden bg-gray-200 md:w-[400px] md:h-[385px]"
      >
        <NuxtImg
          :src="character.image"
          :alt="character.name"
          width="800"
          height="800"
          sizes="(max-width: 640px) 100vw, 800px"
          class="w-full h-full object-cover object-center"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 pb-12 md:w-full">
        <UiWidget title="Status">
          <div
            class="flex items-center gap-2 font-medium text-slate-900 text-sm transition-colors duration-300 ease-in-out dark:text-white"
          >
            <div class="w-2 h-2 rounded-full" :class="statusDotClasses"></div>
            {{ character.status }}
          </div>
        </UiWidget>

        <UiWidget title="Species">
          <p
            class="font-medium text-slate-900 text-sm truncate transition-colors duration-300 ease-in-out dark:text-white"
          >
            {{ character.species }}
          </p>
        </UiWidget>

        <UiWidget title="Gender">
          <p
            class="font-medium text-slate-900 text-sm truncate transition-colors duration-300 ease-in-out dark:text-white"
          >
            {{ character.gender }}
          </p>
        </UiWidget>

        <UiWidget title="Apperances">
          <p
            class="font-medium text-slate-900 text-sm truncate transition-colors duration-300 ease-in-out dark:text-white"
          >
            {{ character.episodeCount }} Episodes
          </p>
        </UiWidget>

        <UiWidget title="Origin" class-name="col-span-2">
          <p
            class="font-medium text-slate-900 text-sm truncate transition-colors duration-300 ease-in-out dark:text-white"
          >
            {{ character.originName || "Unknown" }}
          </p>
        </UiWidget>

        <UiWidget title="Last Location Known" class-name="col-span-2">
          <p
            class="font-medium text-slate-900 text-sm truncate transition-colors duration-300 ease-in-out dark:text-white"
          >
            {{ character.locationName || "Unknown" }}
          </p>
        </UiWidget>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetOneCharacterApiResponse } from "#shared/types/characters.interface";

const router = useRouter();
const route = useRoute();
const favoritesStore = useFavoritesStore();
const id = route.params.id as string;

const {
  data: character,
  pending,
  error,
} = await useAsyncData<GetOneCharacterApiResponse>(
  () => `characters:${id}`,
  () => $fetch(`/api/characters/${id}`),
);

const statusDotClasses = computed(() =>
  getStatusDotClass(character.value?.status),
);

const goBack = () => {
  router.back();
};

const toggleFavorite = (character: GetOneCharacterApiResponse) => {
  const mappedCharacter: GetAllCharacterItem = {
    id: character.id,
    name: character.name,
    image: character.image,
    species: character.species,
    status: character.status,
    originName: character.originName,
  };
  favoritesStore.toggleFavorite(mappedCharacter);
};
</script>
