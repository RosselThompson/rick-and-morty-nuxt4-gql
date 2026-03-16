// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    rickAndMortyApi: "",
  },

  modules: ["@nuxt/icon", "@nuxt/image", "@pinia/nuxt", "@nuxtjs/color-mode"],
  icon: {
    size: "24",
  },
  colorMode: {
    classSuffix: "",
  },
});
