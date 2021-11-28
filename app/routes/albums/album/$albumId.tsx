import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
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
  AlbumWithArtistAndReviewsFragment,
  DeleteAlbum,
  DeleteAlbumMutation,
  DeleteAlbumMutationVariables,
  InsertVisit,
  InsertVisitMutation,
  InsertVisitMutationVariables,
  SelectAlbum,
  SelectAlbumQuery,
  SelectAlbumQueryVariables,
} from "~/api/types";
import { Dialog } from "~/components";
import { AlbumDetails } from "~/molecules/albums";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type AlbumActionData = {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const result = await jsonFetcher<
    DeleteAlbumMutation,
    DeleteAlbumMutationVariables
  >(DeleteAlbum, { id: Number(params.albumId) });

  const artist = result.data?.delete_album_by_pk?.artist;
  if (!artist || result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.artist(artist));
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const profile = 1; // TODO add profiles
  const id = Number(params.albumId);
  const [payload] = await Promise.all([
    jsonFetcher<SelectAlbumQuery, SelectAlbumQueryVariables>(SelectAlbum, {
      id,
    }),
    jsonFetcher<InsertVisitMutation, InsertVisitMutationVariables>(
      InsertVisit,
      { visit: { album: id, profile } }
    ),
  ]);

  const albumFragment = payload.data?.album_by_pk;
  if (!albumFragment) throw new Response("Not Found", { status: 404 });
  return json(albumFragment);
};

const Album = (): ReactElement => {
  const loader = useLoaderData<AlbumWithArtistAndReviewsFragment>();
  const action = useActionData<AlbumActionData>();
  const transition = useTransition();

  return (
    <Dialog>
      <AlbumDetails
        album={loader}
        fetcherErrors={action?.fetcherErrors}
        transition={transition}
      />
      <Outlet />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Album;
