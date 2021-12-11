import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { authenticator, User } from "~/api/auth.server";
import { graphqlSdk } from "~/api/fetcher.server";
import { RandomAlbumsQuery } from "~/api/types.server";
import {
  Divider,
  Layout,
  LayoutFooter,
  LayoutHeader,
  Page,
} from "~/components";
import { AlbumsGrid } from "~/molecules/albums";
import { json } from "~/utils/remix";

type LoaderData = {
  albums: RandomAlbumsQuery;
  user: User | null;
};

const randomAlbumLimit = 16;

export const meta: MetaFunction = () => {
  return {
    title: "Remix Albums",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const result = await graphqlSdk.RandomAlbums({ limit: randomAlbumLimit });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  const user = await authenticator.isAuthenticated(request);

  return json<LoaderData>({
    albums: result.data ?? { randomAlbums: [] },
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
          <AlbumsGrid albums={data.albums.randomAlbums} />
          <Divider />
          <Outlet />
        </main>
      </Page>
      <LayoutFooter />
    </Layout>
  );
};

export default Albums;
