import { useEffect } from "react";
import { Options, useVirtual, VirtualItem } from "react-virtual";
import { useNavigate, useParams } from "remix";
import { toNumber } from "../utils/validation";
import { useCallbackRef } from "./useCallbackRef";
import { useDebounce } from "./useDebounce";

const scrollConfig = {
  limit: 40,
  overscan: 10,
};

type GetScrollStartArgs = {
  start: number;
  items: VirtualItem[];
};

const getScrollStart = ({ start, items }: GetScrollStartArgs): number => {
  const { limit, overscan } = scrollConfig;
  const middleCount = Math.ceil(limit / 2);

  const firstVirtualItem = items.at(0);
  const lastVirtualItem = items.at(-1);

  if (!firstVirtualItem || !lastVirtualItem) {
    return start;
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

type UseScrollNavigationReturn = {
  start: number;
  virtualizer: ReturnType<typeof useVirtual>;
};

export const useScrollNavigation = <T>({
  route,
  size,
  ...args
}: Options<T> & {
  route: (page: number) => string;
}): UseScrollNavigationReturn => {
  const navigate = useNavigate();

  const start = toNumber(useParams().start, 0);

  const routeRef = useCallbackRef(route);

  const virtualizer = useVirtual({
    size,
    ...args,
  });

  const neededStart = getScrollStart({
    items: virtualizer.virtualItems,
    start,
  });

  const debouncedNavigate = useDebounce(
    (route: string) => navigate(route),
    500
  );

  useEffect(() => {
    if (neededStart === start) return;
    debouncedNavigate(routeRef(neededStart));
  }, [debouncedNavigate, neededStart, routeRef, start]);

  return { start, virtualizer };
};

useScrollNavigation.config = scrollConfig;
