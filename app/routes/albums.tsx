import { ReactElement } from "react";
import {
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
  useTransition,
} from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistFragment,
  GetAlbums,
  GetAlbumsQuery,
  GetAlbumsQueryVariables,
} from "~/api/types";
import { Divider, Page } from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
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
  const action = useLoaderData<AlbumsActionData>();
  const transition = useTransition();

  return (
    <Page>
      <main>
        <AlbumsGrid albums={action?.albums} transition={transition} />
        <Divider />
        <Outlet />
      </main>
    </Page>
  );
};

export default Albums;
