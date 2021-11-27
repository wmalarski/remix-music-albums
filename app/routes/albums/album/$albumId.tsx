import { ReactElement } from "react";
import { json, Link, LoaderFunction, Outlet, useLoaderData } from "remix";
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
import { routes } from "~/utils/routes";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.albumId || !/^\d+$/.test(params.albumId))
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
      <p>
        <Link to={routes.album(album.id)}>Album</Link>
      </p>
      <p>
        <Link to={routes.artist(album.artistByArtist.id)}>Artist</Link>
      </p>
      <p>
        <Link to={routes.newReview(album.id)}>Review</Link>
      </p>
      <pre>{JSON.stringify(album, null, 2)}</pre>
      <Outlet />
    </div>
  );
};

export default Album;
