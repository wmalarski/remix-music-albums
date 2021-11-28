import { ReactElement } from "react";
import {
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
  useTransition,
} from "remix";
import { fetcher, FetcherPayload } from "~/api/fetcher";
import {
  GetAlbums,
  GetAlbumsQuery,
  GetAlbumsQueryVariables,
} from "~/api/types";
import { Divider, Page } from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { toNumber } from "~/utils/validation";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Albums",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = ({ params }) => {
  const limit = toNumber(params.limit, 12);
  const offset = toNumber(params.offset, 0);

  return fetcher<GetAlbumsQueryVariables>(GetAlbums, { limit, offset });
};

const Albums = (): ReactElement => {
  const action = useLoaderData<FetcherPayload<GetAlbumsQuery>>();
  const transition = useTransition();

  return (
    <Page>
      <main>
        <AlbumsGrid albums={action?.data?.album} transition={transition} />
        <Divider />
        <Outlet />
      </main>
    </Page>
  );
};

export default Albums;
