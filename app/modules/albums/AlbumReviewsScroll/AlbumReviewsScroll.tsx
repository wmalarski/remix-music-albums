import { ReactElement, useCallback, useRef } from "react";
import { SelectReviewsQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { useScrollNavigation } from "~/utils/scroll";
import { useAlbumRoot } from "..";
import { AlbumReviewsList } from "./AlbumReviewsList/AlbumReviewsList";

type Props = {
  query: SelectReviewsQuery;
};

export const AlbumReviewsScroll = ({ query }: Props): ReactElement => {
  const album = useAlbumRoot();

  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.reviewAggregate.aggregate?.count ?? 0;

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
    route: (offset) => routes.album(album.id, offset),
  });

  return (
    <AlbumReviewsList
      ref={parentRef}
      start={start}
      reviews={query.review}
      virtualizer={virtualizer}
    />
  );
};
