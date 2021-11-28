import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";
import { jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
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
  const album = useLoaderData<AlbumWithArtistAndReviewsFragment>();

  return (
    <Dialog>
      <AlbumDetails album={album} />
      <Outlet />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Album;
