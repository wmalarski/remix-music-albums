import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement, useMemo } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistFragment,
  ArtistWithAlbumsFragment,
  DeleteArtist,
  DeleteArtistMutation,
  DeleteArtistMutationVariables,
  SelectArtist,
  SelectArtistQuery,
  SelectArtistQueryVariables,
} from "~/api/types";
import { Dialog } from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { ArtistDetails } from "~/molecules/artists";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ArtistActionData = {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);

  const result = await jsonFetcher<
    DeleteArtistMutation,
    DeleteArtistMutationVariables
  >(DeleteArtist, { id: artistId });

  console.log("artistId action", JSON.stringify(result, null, 2));

  if (result.errors) return json({ fetcherErrors: result.errors });

  return redirect(routes.albums());
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const id = Number(params.artistId);

  const result = await jsonFetcher<
    SelectArtistQuery,
    SelectArtistQueryVariables
  >(SelectArtist, { id });

  console.log("artistId", JSON.stringify(result, null, 2));

  const artistFragment = result.data?.artist_by_pk;
  if (!artistFragment) throw new Response("Not Found", { status: 404 });
  return json(artistFragment);
};

const Artist = (): ReactElement => {
  const loader = useLoaderData<ArtistWithAlbumsFragment>();
  const action = useActionData<ArtistActionData>();
  const transition = useTransition();

  const albums = useMemo<AlbumWithArtistFragment[]>(() => {
    const { albums: artistAlbums, ...artistByArtist } = loader;
    return artistAlbums.map((album) => ({ ...album, artistByArtist }));
  }, [loader]);

  return (
    <Dialog>
      <ArtistDetails artist={loader} transition={transition} />
      <AlbumsGrid albums={albums} transition={transition} />
      <Outlet />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Artist;
