import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { graphqlSdk } from "~/api/fetcher";
import { SelectAlbumsQuery } from "~/api/types";
import { Divider, Page } from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { toNumber } from "~/utils/validation";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Albums",
    description: "Welcome to remix!",
  };
};

export const handle: HandleFunction = () => {
  return { route: "albums" };
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.limit, 12);
  const offset = toNumber(params.offset, 0);

  const result = await graphqlSdk.SelectAlbums({ limit, offset });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectAlbumsQuery>(result.data ?? { album: [] });
};

const Albums = (): ReactElement => {
  const query = useLoaderData<SelectAlbumsQuery>();
  const transition = useRouteTransition();

  return (
    <Page>
      <main>
        <AlbumsGrid albums={query.album} transition={transition} />
        <Divider />
        <Outlet />
      </main>
    </Page>
  );
};

export default Albums;
