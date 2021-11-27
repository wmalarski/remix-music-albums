import { ReactElement } from "react";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { jsonFetcher } from "~/api/fetcher";
import {
  ArtistWithAlbumsFragment,
  GetArtist,
  GetArtistQuery,
  GetArtistQueryVariables,
} from "~/api/types";
import { routes } from "~/utils/routes";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.artistId, "expected params.artistId");
  invariant(/^\d+$/.test(params.artistId), "params.artistId not number");

  const id = Number(params.artistId);

  const payload = await jsonFetcher<GetArtistQuery, GetArtistQueryVariables>(
    GetArtist,
    { id }
  );

  const artistFragment = payload.data?.artist_by_pk;
  if (!artistFragment) throw new Response("Not Found", { status: 404 });
  return artistFragment;
};

const Artist = (): ReactElement => {
  const artist = useLoaderData<ArtistWithAlbumsFragment>();

  return (
    <div>
      <Link to={routes.artist(artist.id)}>{`Artist: ${artist.name}`}</Link>
      <Link to={routes.newAlbum(artist.id)}>New album</Link>
      {artist.albums.map((album) => (
        <Link key={album.id} to={routes.album(album.id)}>
          {album.title}
        </Link>
      ))}
      <pre>{JSON.stringify(artist, null, 2)}</pre>
      <Outlet />
    </div>
  );
};

export default Artist;
