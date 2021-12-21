import { ReactElement, useCallback, useRef } from "react";
import { SelectReviewsWithInfoQuery } from "~/api/types.server";
import { useScrollNavigation } from "~/utils/scroll";
import { ReviewList } from "./ReviewList/ReviewList";

type Props = {
  query: SelectReviewsWithInfoQuery;
};

export const ReviewScroll = ({ query }: Props): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null);
  const size = query.reviewAggregate.aggregate?.count ?? 0;

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
  });

  return (
    <ReviewList
      ref={parentRef}
      start={start}
      reviews={query.review}
      virtualizer={virtualizer}
    />
  );
};
