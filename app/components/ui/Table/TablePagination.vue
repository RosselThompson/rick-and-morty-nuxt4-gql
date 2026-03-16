<template>
  <div
    class="flex items-center justify-between p-4 border-t-1 border-gray-200 dark:border-gray-800"
  >
    <div>
      <p class="text-sm text-slate-500 uppercase font-bold dark:text-white">
        Showing {{ perPage }} of {{ paginationInfo?.count }} results
      </p>
    </div>
    <div class="flex gap-2">
      <button
        :disabled="!hasPrevPage"
        :class="`rounded-lg px-2 py-1 dark:text-white ${hasPrevPage && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'}`"
        @click="goToPage(currentPage - 1)"
      >
        <Icon name="heroicons:chevron-left" size="12" />
      </button>
      <div class="flex gap-2">
        <button
          v-for="page in pageNumbers"
          :key="page"
          :disabled="page === '...'"
          :class="[
            'rounded-lg px-3 py-1 text-sm dark:text-white',
            page === '...'
              ? 'cursor-default border-transparent'
              : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
            page === currentPage &&
              'bg-slate-500 text-white dark:hover:bg-slate-500',
          ]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        :disabled="!hasNextPage"
        :class="`rounded-lg px-2 py-1 dark:text-white ${hasNextPage && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'}`"
        @click="goToPage(currentPage + 1)"
      >
        <Icon name="heroicons:chevron-right" size="12" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageInfo } from "#shared/types/characters.interface";

interface TablePaginationProps {
  paginationInfo?: PageInfo;
  perPage?: number;
}

const props = defineProps<TablePaginationProps>();
const emit = defineEmits<{
  "page-change": [page: number];
}>();

const hasPrevPage = computed(() => props.paginationInfo?.prev !== null);
const hasNextPage = computed(() => props.paginationInfo?.next !== null);
const currentPage = computed(() =>
  props.paginationInfo?.next ? props.paginationInfo?.next - 1 : 1,
);

const pageNumbers = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = [];
  const totalPages = props.paginationInfo?.pages || 0;

  const delta = 1;

  const rangeStart = Math.max(2, currentPage.value - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage.value + delta);

  pages.push(1);

  if (rangeStart > 2) {
    pages.push("...");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
});

const goToPage = (page: number | string) => {
  if (page === "...") return;
  emit("page-change", Number(page));
};
</script>
