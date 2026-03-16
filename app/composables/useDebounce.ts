import { onScopeDispose, ref, watch } from "vue";
import type { Ref } from "vue";

export function useDebounce<T>(source: Ref<T>, delay: number = 400) {
  const debounced = ref(source.value) as Ref<T>;
  let timer: ReturnType<typeof setTimeout> | null = null;

  watch(
    source,
    (value) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        debounced.value = value;
      }, delay);
    },
  );

  onScopeDispose(() => {
    if (timer) clearTimeout(timer);
  });

  return debounced;
}
