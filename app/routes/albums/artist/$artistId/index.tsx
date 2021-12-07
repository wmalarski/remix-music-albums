import { ReactElement, useCallback, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";
import {
  AlbumWithArtistFragment,
  ArtistWithAlbumsFragment,
} from "~/api/types.server";
import { Flex, Heading } from "~/components";
import { AlbumList } from "~/molecules/albums";
import { HandleFunction, useRouteLoaderData } from "~/utils/remix";

const DATA_OVER_SCAN = 5;

export const handle: HandleFunction = () => {
  return { route: "artist/index" };
};

const ArtistAlbums = (): ReactElement => {
  const artist = useRouteLoaderData<ArtistWithAlbumsFragment>("artist");

  const albums = useMemo<AlbumWithArtistFragment[]>(() => {
    const { albums: artistAlbums, ...artistByArtist } = artist;
    return artistAlbums.map((album) => ({ ...album, artistByArtist }));
  }, [artist]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtual({
    size: albums.length,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
    overscan: DATA_OVER_SCAN,
  });

  return (
    <Flex direction="column">
      <Heading>Albums</Heading>
      <AlbumList albums={albums} start={0} virtualizer={virtualizer} />
    </Flex>
  );
};

export default ArtistAlbums;
