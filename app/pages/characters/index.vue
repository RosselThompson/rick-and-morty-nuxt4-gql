<template>
  <UiSearchInput
    v-model="searchValue"
    placeholder="Search characters by name ..."
  />
  <div class="flex flex-col gap-4 mt-4 justify-center items-center">
    <UiCard
      :id="character.id"
      :image="character.image"
      :name="character.name"
      :species="character.species"
      :status="character.status"
      :origin-name="character.originName"
    />
  </div>
</template>

<script setup lang="ts">
const searchValue = ref("");
const character = {
  id: "1",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  originName: "Earth (C-137)",
};

watch(searchValue, (value) => {
  console.log(value);
});
</script>
