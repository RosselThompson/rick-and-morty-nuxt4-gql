<template>
  <UiSearchInput
    v-model="searchValue"
    placeholder="Search characters by name ..."
  />
</template>

<script setup lang="ts">
const searchValue = ref("");

watch(searchValue, (value) => {
  console.log(value);
});
</script>
