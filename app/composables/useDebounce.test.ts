import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { effectScope, nextTick, ref } from "vue";
import type { Ref } from "vue";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps initial value and updates after delay", async () => {
    const source = ref("Rick");
    let debounced!: Ref<string>;

    const scope = effectScope();
    scope.run(() => {
      debounced = useDebounce(source, 200);
    });

    source.value = "Morty";
    await nextTick();
    expect(debounced.value).toBe("Rick");

    vi.advanceTimersByTime(199);
    await nextTick();
    expect(debounced.value).toBe("Rick");

    vi.advanceTimersByTime(1);
    await nextTick();
    expect(debounced.value).toBe("Morty");

    scope.stop();
  });

  it("debounces rapid updates and keeps the latest value", async () => {
    const source = ref(1);
    let debounced!: Ref<number>;

    const scope = effectScope();
    scope.run(() => {
      debounced = useDebounce(source, 300);
    });

    source.value = 2;
    await nextTick();
    vi.advanceTimersByTime(100);
    source.value = 3;
    await nextTick();
    vi.advanceTimersByTime(100);
    source.value = 4;
    await nextTick();

    vi.advanceTimersByTime(299);
    await nextTick();
    expect(debounced.value).toBe(1);

    vi.advanceTimersByTime(1);
    await nextTick();
    expect(debounced.value).toBe(4);

    scope.stop();
  });

  it("clears pending timer when scope is disposed", async () => {
    const source = ref("A");
    let debounced!: Ref<string>;

    const scope = effectScope();
    scope.run(() => {
      debounced = useDebounce(source, 250);
    });

    source.value = "B";
    await nextTick();
    scope.stop();

    vi.advanceTimersByTime(300);
    await nextTick();
    expect(debounced.value).toBe("A");
  });
});
