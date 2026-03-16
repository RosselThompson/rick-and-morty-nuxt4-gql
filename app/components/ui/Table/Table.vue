<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
    <div class="overflow-x-auto h-[650px] overflow-y-auto">
      <table class="w-full">
        <thead class="sticky top-0 z-10 bg-white pt-8 dark:bg-slate-900">
          <tr>
            <slot name="header" />
          </tr>
        </thead>
        <tbody>
          <slot name="body" />
        </tbody>
      </table>
    </div>
    <slot name="pagination" />
  </div>
</template>
