<template>
  <div class="sticky top-20 z-10 bg-white pb-4">
    <UiSearchInput
      v-model="name"
      placeholder="Search characters by name ..."
      :is-loading="pending"
    />
  </div>
  <div v-if="characters.length > 0" class="my-4">
    <div
      class="flex flex-col gap-4 justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3"
    >
      <UiCard
        v-for="character in characters"
        :key="character.id"
        :id="character.id"
        :image="character.image"
        :name="character.name"
        :species="character.species"
        :status="character.status"
        :origin-name="character.originName"
        :is-favorite="favoritesStore.isFavorite(character.id)"
        @toggle-favorite="favoritesStore.toggleFavorite(character)"
      />
    </div>
    <p
      v-if="hasMore"
      ref="observerTarget"
      class="text-center text-gray-500 mb-4 font-semibold text-sm"
    >
      Loading More...
    </p>
  </div>
  <UiMessage v-else-if="error" :message="error.message" />
  <UiMessage
    v-else-if="!pending && characters.length === 0"
    message="No characters found"
  />
</template>

<script setup lang="ts">
import { useDebounce } from "~/composables/useDebounce";
import { scrollToTop } from "~/utils/scrollToTop";
import type {
  GetAllCharacterItem,
  GetAllCharactersApiResponse,
} from "#shared/types/characters.interface";

const route = useRoute();

const observerTarget = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);
const appendData = ref(false);
const page = ref(Number(route.query.page || 1));
const name = ref(String(route.query.name || "").trim());
const characters = ref<GetAllCharacterItem[]>([]);

const debouncedSearch = useDebounce(name, 600);
const favoritesStore = useFavoritesStore();

const { data, pending, error } =
  await useAsyncData<GetAllCharactersApiResponse>(
    () => `characters:${page.value}:${debouncedSearch.value}`,
    () =>
      $fetch("/api/characters", {
        params: {
          page: page.value,
          ...(debouncedSearch.value ? { name: debouncedSearch.value } : {}),
        },
      }),
    {
      watch: [page, debouncedSearch],
    },
  );

const getNewItems = (newRecords: GetAllCharacterItem[]) => {
  const existingIds = new Set(
    characters.value.map((character) => character.id),
  );
  const nextItems = newRecords.filter(
    (character) => !existingIds.has(character.id),
  );
  return nextItems;
};

watch(
  data,
  (newData) => {
    if (!newData) return;
    if (appendData.value) {
      const nextItems = getNewItems(newData.results);
      characters.value.push(...nextItems);
    } else {
      scrollToTop();
      characters.value = newData.results;
    }
    appendData.value = true;
  },
  { immediate: true },
);

watch(debouncedSearch, (newDebouncedSearch, oldDebouncedSearch) => {
  if (newDebouncedSearch === oldDebouncedSearch) return;
  page.value = 1;
  appendData.value = false;
});

watch(observerTarget, (el, _, onCleanup) => {
  if (!el) return;
  const currentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !pending.value && hasMore.value) {
        page.value++;
      }
    });
  });
  currentObserver.observe(el);
  observer.value = currentObserver;
  onCleanup(() => {
    currentObserver.disconnect();
    if (observer.value === currentObserver) {
      observer.value = null;
    }
  });
});

const hasMore = computed(() => data.value?.info.next !== null);
</script>
