import { ReactElement } from "react";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";
import { jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
  GetAlbum,
  GetAlbumQuery,
  GetAlbumQueryVariables,
  InsertVisit,
  InsertVisitMutation,
  InsertVisitMutationVariables,
} from "~/api/types";
import { AlbumDetails } from "~/molecules/albums";
import { isNumber } from "~/utils/validation";

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const profile = 1; // TODO add profiles
  const id = Number(params.albumId);
  const [payload] = await Promise.all([
    jsonFetcher<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbum, { id }),
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
    <div>
      <AlbumDetails album={album} />
      <Outlet />
    </div>
  );
};

export default Album;
