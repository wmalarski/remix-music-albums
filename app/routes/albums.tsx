import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { authenticator, User } from "~/api/auth.server";
import { graphqlSdk } from "~/api/fetcher.server";
import { SelectAlbumsQuery } from "~/api/types.server";
import {
  Divider,
  Layout,
  LayoutFooter,
  LayoutHeader,
  Page,
} from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { json } from "~/utils/remix";
import { toNumber } from "~/utils/validation";

type LoaderData = {
  albums: SelectAlbumsQuery;
  user: User | null;
};

export const meta: MetaFunction = () => {
  return {
    title: "Remix Albums",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const limit = toNumber(params.limit, 12);
  const offset = toNumber(params.offset, 0);

  const result = await graphqlSdk.SelectAlbums({ limit, offset });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  const user = await authenticator.isAuthenticated(request);

  return json<LoaderData>({
    albums: result.data ?? { album: [], albumAggregate: {} },
    user,
  });
};

const Albums = (): ReactElement => {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout>
      <LayoutHeader isAuthorized={!!data.user} />
      <Page>
        <main>
          <AlbumsGrid albums={data.albums.album} />
          <Divider />
          <Outlet />
        </main>
      </Page>
      <LayoutFooter />
    </Layout>
  );
};

export default Albums;
