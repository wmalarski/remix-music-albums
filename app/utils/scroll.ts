import { useEffect } from "react";
import { Options, useVirtual, VirtualItem } from "react-virtual";
import { useSearchParams } from "remix";
import { useValueDebounce } from "./debounce";

export const scrollConfig = {
  limit: 20,
  overscan: 5,
};

export const getSearchStart = (searchParams: URLSearchParams): number =>
  Number(searchParams.get("start") || "0");

export const getRequestStart = (request: Request): number =>
  getSearchStart(new URL(request.url).searchParams);

type GetScrollStartArgs = {
  start: number;
  items: VirtualItem[];
};

export const getScrollStart = ({
  start,
  items,
}: GetScrollStartArgs): number => {
  const { limit, overscan } = scrollConfig;
  const middleCount = Math.ceil(limit / 2);

  const firstVirtualItem = items.at(0);
  const lastVirtualItem = items.at(-1);

  if (!firstVirtualItem || !lastVirtualItem) {
    throw new Error("this should never happen");
  }

  const first = firstVirtualItem.index;
  const last = lastVirtualItem.index;

  if (first < start) {
    const lowerStart = Math.floor((first - middleCount) / overscan) * overscan;
    return Math.max(lowerStart, 0);
  } else if (last > start + limit) {
    const upperStart = Math.ceil((last - middleCount) / overscan) * overscan;
    return Math.max(upperStart, 0);
  }

  return start;
};

type UseScrollNavigationArgs<T> = Options<T>;

type UseScrollNavigationReturn = {
  start: number;
  virtualizer: ReturnType<typeof useVirtual>;
};

export const useScrollNavigation = <T>(
  args: UseScrollNavigationArgs<T>
): UseScrollNavigationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = getSearchStart(searchParams);

  const virtualizer = useVirtual({
    overscan: scrollConfig.overscan,
    ...args,
  });

  const neededStart = getScrollStart({
    items: virtualizer.virtualItems,
    start,
  });

  const debouncedStart = useValueDebounce(neededStart, 1000);

  useEffect(() => {
    if (debouncedStart === start) return;
    setSearchParams({ start: String(debouncedStart) });
  }, [setSearchParams, start, debouncedStart]);

  return { start, virtualizer };
};
