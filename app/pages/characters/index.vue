<template>
  <div
    class="sticky top-20 z-10 bg-white pb-4 transition-colors duration-300 ease-in-out md:static dark:bg-slate-950"
  >
    <UiSearchInput
      v-model="name"
      placeholder="Search characters by name ..."
      :is-loading="pending"
    />
  </div>
  <div v-if="characters.length > 0" class="py-4">
    <CharacterList :characters="characters" :pagination-info="data?.info" />
  </div>
  <UiMessage
    v-else-if="error"
    message="An error occurred retrieving characters"
  />
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
import CharacterList from "~/components/character/CharacterList.vue";

const route = useRoute();
const router = useRouter();

const appendData = ref(false);
const name = ref(String(route.query.name || "").trim());
const characters = ref<GetAllCharacterItem[]>([]);

const debouncedSearch = useDebounce(name, 600);
const pageQuery = computed(() => Number(route.query.page || 1));
const nameQuery = computed(() => String(route.query.name || "").trim());
const isMobileQuery = computed(() => route.query.isMobile === "true");
const queryKey = computed(
  () => `${isMobileQuery.value}:${pageQuery.value}:${nameQuery.value}`,
);

const { data, pending, error } =
  await useAsyncData<GetAllCharactersApiResponse>(
    () => `characters:${queryKey.value}`,
    () =>
      $fetch("/api/characters", {
        params: {
          page: pageQuery.value,
          ...(nameQuery.value ? { name: nameQuery.value } : {}),
        },
      }),
    {
      watch: [queryKey],
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
    if (isMobileQuery.value && appendData.value) {
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
  appendData.value = false;
  const nextQuery = {
    ...(isMobileQuery.value ? { isMobile: "true" } : {}),
    page: 1,
    ...(newDebouncedSearch ? { name: newDebouncedSearch } : {}),
  };
  const currentQuery = {
    ...(isMobileQuery.value ? { isMobile: "true" } : {}),
    page: pageQuery.value,
    ...(nameQuery.value ? { name: nameQuery.value } : {}),
  };

  if (JSON.stringify(nextQuery) === JSON.stringify(currentQuery)) return;
  router.replace({ query: nextQuery });
});
</script>
