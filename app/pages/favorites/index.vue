<template>
  <div v-if="favorites.length > 0" class="py-4">
    <div
      class="flex flex-col gap-4 justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3"
    >
      <UiCard
        v-for="character in favorites"
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
  </div>
  <div v-else>
    <UiMessage message="No favorites found" />
  </div>
</template>

<script setup lang="ts">
const favoritesStore = useFavoritesStore();
const favorites = computed(() => favoritesStore.favorites);
</script>
