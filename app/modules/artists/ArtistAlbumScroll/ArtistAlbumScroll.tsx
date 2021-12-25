import { ReactElement, useCallback, useRef } from "react";
import { SelectAlbumsQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { useScrollNavigation } from "~/utils/scroll";
import { useArtistRoot } from "..";
import { ArtistAlbumList } from "./ArtistAlbumList/ArtistAlbumList";

type Props = {
  query: SelectAlbumsQuery;
};

export const ArtistAlbumScroll = ({ query }: Props): ReactElement => {
  const artist = useArtistRoot();

  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.albumAggregate.aggregate?.count ?? 0;

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 260, []),
    initialRect: { width: 250, height: 250 },
    route: (offset) => routes.artist(artist.id, offset),
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