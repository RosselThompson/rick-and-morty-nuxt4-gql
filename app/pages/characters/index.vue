<template>
  <div class="sticky top-20 z-10 bg-white pb-4">
    <UiSearchInput v-model="name" placeholder="Search characters by name ..." />
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
      />
    </div>
    <p
      v-if="hasMore"
      ref="observerTarget"
      class="text-center text-gray-500 mb-4 font-semibold text-sm"
    >
      Loading More...
    </p>
    <UiLoader v-if="pending" />
  </div>
  <p v-else-if="error">{{ error.message }}</p>
</template>

<script setup lang="ts">
import { useDebounce } from "~/composables/useDebounce";
import { scrollToTop } from "~/utils/scrollToTop";

const route = useRoute();

const observerTarget = ref<HTMLElement | null>(null);
const appendData = ref(false);
const page = ref(Number(route.query.page || 1));
const name = ref(String(route.query.name || "").trim());
const characters = ref<GetAllCharacterItem[]>([]);

const debouncedSearch = useDebounce(name, 600);

const { data, pending, error } = await useAsyncData(
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

watch(
  data,
  (newData) => {
    if (!newData) return;
    if (appendData.value) {
      characters.value.push(...newData.results);
    } else {
      scrollToTop();
      characters.value = newData.results;
    }
    appendData.value = true;
  },
  { immediate: true },
);

watch(debouncedSearch, (newDebouncedSearch, oldDebouncedSearch) => {
  page.value = 1;
  appendData.value = newDebouncedSearch === oldDebouncedSearch;
});

watch(observerTarget, (el, _, onCleanup) => {
  if (!el) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !pending.value && hasMore.value) {
        page.value++;
      }
    });
  });
  observer.observe(el);
  onCleanup(() => {
    observer.disconnect();
  });
});

const hasMore = computed(() => data.value?.info.next !== null);
</script>
