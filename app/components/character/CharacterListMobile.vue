<template>
  <div>
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
      class="text-center text-slate-500 py-4 font-semibold text-sm dark:text-gray-400"
    >
      Loading More...
    </p>
  </div>
</template>

<script setup lang="ts">
import type { GetAllCharacterItem } from "#shared/types/characters.interface";

interface CharacterListMobileProps {
  characters: GetAllCharacterItem[];
  hasMore: boolean;
}

const props = defineProps<CharacterListMobileProps>();
const emit = defineEmits<{ (e: "load-more"): void }>();
const favoritesStore = useFavoritesStore();

const route = useRoute();
const router = useRouter();

const pageQuery = computed(() => Number(route.query.page || 1));
const nameQuery = computed(() => String(route.query.name || "").trim());

const observerTarget = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

watch(observerTarget, (el, _, onCleanup) => {
  if (!el) return;
  const currentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && props.hasMore) {
        router.push({
          query: {
            isMobile: "true",
            page: pageQuery.value + 1,
            ...(nameQuery.value ? { name: nameQuery.value } : {}),
          },
        });
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
</script>
