import { defineStore, skipHydrate } from "pinia";
import { ref, watch } from "vue";
import type { GetAllCharacterItem } from "#shared/types/characters.interface";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = skipHydrate(ref<GetAllCharacterItem[]>([]));
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        favorites.value = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse favorites from local storage", e);
      }
    }
  }

  const addFavorite = (character: GetAllCharacterItem) => {
    if (!favorites.value.map((fav) => fav.id).includes(character.id)) {
      favorites.value.push(character);
    }
  };

  const removeFavorite = (id: string) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== id);
  };

  const toggleFavorite = (character: GetAllCharacterItem) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.value.map((fav) => fav.id).includes(id);
  };

  watch(
    favorites,
    (newVal) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newVal));
      }
    },
    { deep: true },
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
});
