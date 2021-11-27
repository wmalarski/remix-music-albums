import { ReactElement } from "react";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
  GetAlbum,
  GetAlbumQuery,
  GetAlbumQueryVariables,
} from "~/api/types";
import { routes } from "~/utils/routes";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.albumId, "expected params.albumId");
  invariant(/^\d+$/.test(params.albumId), "params.albumId not number");

  const id = Number(params.albumId);

  const payload = await jsonFetcher<GetAlbumQuery, GetAlbumQueryVariables>(
    GetAlbum,
    { id }
  );

  const albumFragment = payload.data?.album_by_pk;
  if (!albumFragment) throw new Response("Not Found", { status: 404 });
  return albumFragment;
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
