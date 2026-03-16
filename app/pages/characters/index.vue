<template>
  <div class="sticky top-20 z-10 bg-white pb-4">
    <UiSearchInput
      v-model="searchValue"
      placeholder="Search characters by name ..."
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
  <p v-else-if="characters.length === 0">No characters found</p>
</template>

<script setup lang="ts">
const route = useRoute();

const observerTarget = ref<HTMLElement | null>(null);
const page = ref(Number(route.query.page || 1));
const name = ref(String(route.query.name || "").trim());
const searchValue = ref(name.value);
const characters = ref<GetAllCharacterItem[]>([]);

const { data, pending, error } = await useAsyncData(
  () => `characters:${page.value}:${name.value}`,
  () =>
    $fetch("/api/characters", {
      params: {
        page: page.value,
        ...(name.value ? { name: name.value } : {}),
      },
    }),
  {
    watch: [page, name],
  },
);
const hasMore = computed(() => data.value?.info.next !== null);

watch(
  data,
  (newData) => {
    if (!newData) return;
    characters.value.push(...newData.results);
  },
  { immediate: true },
);

watch(observerTarget, (el) => {
  if (!el) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !pending.value && hasMore.value) {
        page.value++;
      }
    });
  });
  observer.observe(el);
});
</script>
