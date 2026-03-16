<template>
  <div
    class="flex items-center gap-3 bg-gray-100 rounded-md px-4 py-4 w-full transition-colors duration-300 ease-in-out dark:bg-slate-900 dark:text-slate-100"
  >
    <Icon
      name="heroicons:magnifying-glass"
      class="text-gray-500 flex-shrink-0 dark:text-slate-400 transition-colors duration-300 ease-in-out"
      size="16"
    />
    <input
      v-model="inputValue"
      :placeholder="placeholder"
      type="text"
      class="bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 w-full text-base focus:ring-0 dark:text-slate-100 dark:placeholder-slate-400 transition-colors duration-300 ease-in-out"
    />
    <UiLoader v-if="isLoading" />
    <button
      v-if="inputValue"
      class="text-gray-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors duration-300 ease-in-out"
      @click="clearInput"
    >
      <Icon name="heroicons:x-mark" size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface SearchInputProps {
  modelValue: string;
  placeholder?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<SearchInputProps>(), {
  modelValue: "",
  placeholder: "Search ...",
  isLoading: false,
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const clearInput = () => {
  emit("update:modelValue", "");
};
</script>
