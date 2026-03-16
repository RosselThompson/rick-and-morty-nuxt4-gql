<template>
  <div>
    <UiTable>
      <template #header>
        <th
          v-for="column in CHARACTERS_COLUMNS"
          :class="`py-4 text-[11px] text-left font-bold text-slate-500 uppercase ${column === CHARACTERS_COLUMNS[0] && 'pl-8'}`"
        >
          {{ column }}
        </th>
      </template>
      <template #body>
        <tr
          v-for="character in characters"
          :key="character.id"
          class="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 ease-in-out cursor-pointer"
          @click="navigateTo(`/characters/${character.id}`)"
        >
          <td class="pl-8 text-left py-2">
            <NuxtImg
              :src="character.image"
              :alt="character.name"
              class="rounded-2xl"
              width="30"
              height="30"
            />
          </td>
          <td class="text-left text-sm font-bold dark:text-white">
            {{ character.name }}
          </td>
          <td class="text-left text-sm text-slate-500">
            {{ character.species }}
          </td>
          <td class="text-left text-sm">
            <div
              class="flex items-center gap-2 font-medium text-slate-900 text-sm transition-colors duration-300 ease-in-out dark:text-white"
            >
              <div
                class="w-2 h-2 rounded-full"
                :class="getStatusDotClass(character.status)"
              ></div>
              {{ character.status }}
            </div>
          </td>
          <td class="text-left text-sm text-slate-500">
            {{ character.originName }}
          </td>
          <td class="text-center">
            <UiFavoriteButton
              no-border
              :is-favorite="favoritesStore.isFavorite(character.id)"
              @toggle-favorite="favoritesStore.toggleFavorite(character)"
            />
          </td>
        </tr>
      </template>
      <template #pagination>
        <UiTablePagination
          :pagination-info="paginationInfo"
          :per-page="CHARACTERS_PER_PAGE"
          @page-change="updatePage"
        />
      </template>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import type {
  GetAllCharacterItem,
  PageInfo,
} from "#shared/types/characters.interface";
import {
  CHARACTERS_COLUMNS,
  CHARACTERS_PER_PAGE,
} from "@/constants/characters";

interface CharacterListDesktopProps {
  characters: GetAllCharacterItem[];
  paginationInfo?: PageInfo;
}

defineProps<CharacterListDesktopProps>();
const router = useRouter();
const route = useRoute();
const favoritesStore = useFavoritesStore();

const updatePage = (newPage: number) => {
  router.push({
    query: {
      ...(route.query.name ? { name: route.query.name } : {}),
      page: newPage,
    },
  });
};
</script>
