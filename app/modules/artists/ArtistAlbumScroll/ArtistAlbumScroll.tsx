import { ReactElement, useCallback, useRef } from "react";
import { SelectAlbumsQuery } from "~/api/types.server";
import { useScrollNavigation } from "~/utils/scroll";
import { ArtistAlbumList } from "..";

type Props = {
  query: SelectAlbumsQuery;
};

export const ArtistAlbumScroll = ({ query }: Props): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null);
  const size = query.albumAggregate.aggregate?.count ?? 0;

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
  });

  return (
    <ArtistAlbumList
      ref={parentRef}
      start={start}
      albums={query.album}
      virtualizer={virtualizer}
    />
  );
};
