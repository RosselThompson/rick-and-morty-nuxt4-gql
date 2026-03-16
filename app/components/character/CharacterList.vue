<template>
  <CharacterListMobile
    class="md:hidden"
    :characters="characters || []"
    :has-more="hasMore"
  />
  <CharacterListDesktop
    class="hidden md:block"
    :characters="characters || []"
    :pagination-info="paginationInfo"
  />
</template>

<script setup lang="ts">
import CharacterListMobile from "./CharacterListMobile.vue";
import CharacterListDesktop from "./CharacterListDesktop.vue";
import type {
  GetAllCharacterItem,
  PageInfo,
} from "#shared/types/characters.interface";

interface CharacterListProps {
  characters?: GetAllCharacterItem[];
  paginationInfo?: PageInfo;
}

const props = defineProps<CharacterListProps>();
const hasMore = computed(() => props.paginationInfo?.next !== null || false);
</script>
