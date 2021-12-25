import { ReactElement, useCallback, useRef } from "react";
import { SelectReviewsWithInfoQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { useScrollNavigation } from "~/utils/scroll";
import { ReviewList } from "./ReviewList/ReviewList";

type Props = {
  query: SelectReviewsWithInfoQuery;
};

export const ReviewScroll = ({ query }: Props): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.reviewAggregate.aggregate?.count ?? 0;

  const { virtualizer, start } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 260, []),
    initialRect: { width: 250, height: 250 },
    route: routes.reviews,
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
