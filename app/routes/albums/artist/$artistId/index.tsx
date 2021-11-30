import { ReactElement, useMemo } from "react";
import { AlbumWithArtistFragment, ArtistWithAlbumsFragment } from "~/api/types";
import { AlbumList } from "~/molecules/albums";
import { HandleFunction, useRouteLoaderData } from "~/utils/remix";

export const handle: HandleFunction = () => {
  return { route: "artist/index" };
};

const ArtistAlbums = (): ReactElement => {
  const artist = useRouteLoaderData<ArtistWithAlbumsFragment>("artist");

  const albums = useMemo<AlbumWithArtistFragment[]>(() => {
    const { albums: artistAlbums, ...artistByArtist } = artist;
    return artistAlbums.map((album) => ({ ...album, artistByArtist }));
  }, [artist]);

  return <AlbumList albums={albums} />;
};

export default ArtistAlbums;
