import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement, useMemo } from "react";
import {
  json,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useTransition,
} from "remix";
import { jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistFragment,
  ArtistWithAlbumsFragment,
  GetArtist,
  GetArtistQuery,
  GetArtistQueryVariables,
} from "~/api/types";
import { Dialog } from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { ArtistDetails } from "~/molecules/artists";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const id = Number(params.artistId);

  const payload = await jsonFetcher<GetArtistQuery, GetArtistQueryVariables>(
    GetArtist,
    { id }
  );

  const artistFragment = payload.data?.artist_by_pk;
  if (!artistFragment) throw new Response("Not Found", { status: 404 });
  return json(artistFragment);
};

const Artist = (): ReactElement => {
  const artist = useLoaderData<ArtistWithAlbumsFragment>();
  const transition = useTransition();

  const albums = useMemo<AlbumWithArtistFragment[]>(() => {
    const { albums: artistAlbums, ...artistByArtist } = artist;
    return artistAlbums.map((album) => ({ ...album, artistByArtist }));
  }, [artist]);

  return (
    <Dialog>
      <ArtistDetails artist={artist} />
      <AlbumsGrid albums={albums} transition={transition} />
      <Outlet />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Artist;
