import { ReactElement } from "react";
import {
  Link,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useActionData,
  useTransition,
} from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistFragment,
  GetAlbums,
  GetAlbumsQuery,
  GetAlbumsQueryVariables,
} from "~/api/types";
import { AlbumsGrid } from "~/molecules/albums";
import { routes } from "~/utils/routes";
import { toNumber } from "~/utils/validation";

type AlbumsActionData = {
  albums?: AlbumWithArtistFragment[];
  errors?: FetcherError[];
};

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.limit, 12);
  const offset = toNumber(params.offset, 0);

  const payload = await jsonFetcher<GetAlbumsQuery, GetAlbumsQueryVariables>(
    GetAlbums,
    { limit, offset }
  );

  return { albums: payload.data?.album, errors: payload.errors };
};

const Albums = (): ReactElement => {
  const action = useActionData<AlbumsActionData>();
  const transition = useTransition();

  return (
    <div className="remix__page">
      <main>
        Albums
        <Link to={routes.albums}>Albums</Link>
        <Link to={routes.newArtist}>New Artist</Link>
        <AlbumsGrid albums={action?.albums} transition={transition} />
        <Outlet />
      </main>
    </div>
  );
};

export default Albums;
