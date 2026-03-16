import { describe, expect, it, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

const props = {
  id: "1",
  image: "https://example.com/rick.png",
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  originName: "Earth (C-137)",
  isFavorite: false,
};

describe("Card", () => {
  beforeEach(() => {
    (globalThis as unknown as { navigateTo: ReturnType<typeof vi.fn> }).navigateTo =
      vi.fn();
  });

  it("renders character information", () => {
    const wrapper = mount(Card, {
      props,
      global: {
        stubs: {
          NuxtImg: true,
          UiFavoriteButton: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Rick Sanchez");
    expect(wrapper.text()).toContain("Human from Earth (C-137)");
    expect(wrapper.text()).toContain("Alive");
  });

  it("emits toggleFavorite when favorite button emits", async () => {
    const wrapper = mount(Card, {
      props,
      global: {
        stubs: {
          NuxtImg: true,
          UiFavoriteButton: {
            template: "<button data-testid='fav' @click=\"$emit('toggle-favorite')\" />",
          },
        },
      },
    });

    await wrapper.get("[data-testid='fav']").trigger("click");
    expect(wrapper.emitted("toggleFavorite")).toBeTruthy();
    expect(wrapper.emitted("toggleFavorite")?.length).toBe(1);
  });

  it("navigates to character details when image area is clicked", async () => {
    const wrapper = mount(Card, {
      props,
      global: {
        stubs: {
          NuxtImg: true,
          UiFavoriteButton: true,
        },
      },
    });

    await wrapper.get(".relative.h-\\[250px\\].w-full").trigger("click");

    const { navigateTo } = globalThis as unknown as {
      navigateTo: ReturnType<typeof vi.fn>;
    };
    expect(navigateTo).toHaveBeenCalledWith("/characters/1");
  });
});
