import type { DebouncedFunc } from "lodash";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { useCallbackRef } from "./useCallbackRef";

export const useValueDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useCallbackDebounce = <T, R>(
  callback: (arg: T) => R,
  delay: number
): DebouncedFunc<(arg: T) => R> => {
  const callbackMemoized = useCallbackRef(callback);

  return useMemo(
    () => debounce(callbackMemoized, delay),
    [callbackMemoized, delay]
  );
};
