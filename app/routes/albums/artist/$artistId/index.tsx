import { ReactElement, useCallback, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";
import { useLocation } from "remix";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { Flex, Heading, TabsContent } from "~/components";
import { ArtistAlbumList, useArtistRoot } from "~/molecules/artists";

const DATA_OVER_SCAN = 5;

const ArtistAlbums = (): ReactElement => {
  const artist = useArtistRoot();
  const location = useLocation();

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
    <TabsContent value={location.pathname}>
      <Flex direction="column">
        <Heading>Albums</Heading>
        <ArtistAlbumList albums={albums} start={0} virtualizer={virtualizer} />
      </Flex>
    </TabsContent>
  );
};

export default ArtistAlbums;
