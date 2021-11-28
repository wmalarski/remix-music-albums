import { ReactElement } from "react";
import {
  json,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
  useTransition,
} from "remix";
import { FetcherPayload, jsonFetcher } from "~/api/fetcher";
import {
  SelectAlbums,
  SelectAlbumsQuery,
  SelectAlbumsQueryVariables,
} from "~/api/types";
import { Divider, Page } from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { LoaderErrors } from "~/molecules/root";
import { toNumber } from "~/utils/validation";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Albums",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.limit, 12);
  const offset = toNumber(params.offset, 0);

  const result = await jsonFetcher<
    SelectAlbumsQuery,
    SelectAlbumsQueryVariables
  >(SelectAlbums, { limit, offset });

  return json(result);
};

const Albums = (): ReactElement => {
  const loader = useLoaderData<FetcherPayload<SelectAlbumsQuery>>();
  const transition = useTransition();

  return (
    <Page>
      <main>
        <AlbumsGrid albums={loader?.data?.album} transition={transition} />
        <Divider />
        <Outlet />
      </main>
      <LoaderErrors />
    </Page>
  );
};

export default Albums;
