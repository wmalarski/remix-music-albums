import { ReactElement, useCallback, useRef } from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useScrollNavigation } from "~/hooks/useScrollNavigation";
import { SelectReviewsWithInfoQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { ReviewList } from "./ReviewList/ReviewList";

type Props = {
  query: SelectReviewsWithInfoQuery;
};

export const ReviewScroll = ({ query }: Props): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.reviewAggregate.aggregate?.count ?? 0;

  const isDesktop = useMediaQuery("bp2");

  const { virtualizer, start } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => (isDesktop ? 260 : 510), [isDesktop]),
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
