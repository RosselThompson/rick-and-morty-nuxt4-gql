import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { useFavoritesStore } from "./favorites";
import type { GetAllCharacterItem } from "#shared/types/characters.interface";

const rick: GetAllCharacterItem = {
  id: "1",
  image: "https://example.com/rick.png",
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  originName: "Earth (C-137)",
};

describe("favorites store", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("loads favorites from localStorage on init", () => {
    localStorage.setItem("favorites", JSON.stringify([rick]));

    const store = useFavoritesStore();

    expect(store.favorites).toHaveLength(1);
    expect(store.favorites[0]?.id).toBe("1");
    expect(store.isFavorite("1")).toBe(true);
  });

  it("adds and removes a favorite with toggleFavorite", async () => {
    const store = useFavoritesStore();

    store.toggleFavorite(rick);
    await nextTick();

    expect(store.isFavorite("1")).toBe(true);
    expect(store.favorites).toHaveLength(1);
    expect(localStorage.getItem("favorites")).toContain("\"id\":\"1\"");

    store.toggleFavorite(rick);
    await nextTick();

    expect(store.isFavorite("1")).toBe(false);
    expect(store.favorites).toHaveLength(0);
    expect(localStorage.getItem("favorites")).toBe("[]");
  });

  it("does not duplicate favorites for the same character id", async () => {
    const store = useFavoritesStore();

    store.toggleFavorite(rick);
    await nextTick();
    store.toggleFavorite(rick);
    await nextTick();
    store.toggleFavorite(rick);
    await nextTick();

    expect(store.favorites).toHaveLength(1);
  });
});
