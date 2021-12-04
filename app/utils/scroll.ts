import { VirtualItem } from "react-virtual";

type GetScrollStartArgs = {
  start: number;
  limit: number;
  overScan: number;
  items: VirtualItem[];
};

export const getScrollStart = ({
  start,
  limit,
  overScan,
  items,
}: GetScrollStartArgs): number => {
  const middleCount = Math.ceil(limit / 2);

  const firstVirtualItem = items.at(0);
  const lastVirtualItem = items.at(-1);

  if (!firstVirtualItem || !lastVirtualItem) {
    throw new Error("this should never happen");
  }

  const first = firstVirtualItem.index;
  const last = lastVirtualItem.index;

  if (first < start) {
    const lowerStart = Math.floor((first - middleCount) / overScan) * overScan;
    return Math.max(lowerStart, 0);
  } else if (last > start + limit) {
    const upperStart = Math.ceil((last - middleCount) / overScan) * overScan;
    return Math.max(upperStart, 0);
  }

  return start;
};
