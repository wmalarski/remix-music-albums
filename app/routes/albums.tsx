import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { Container, Page } from "~/components";
import { AlbumsGrid } from "~/modules/albums";
import { Footer, Header, Layout } from "~/modules/layout";
import { authenticator, User } from "~/services/auth.server";
import { graphqlSdk } from "~/services/fetcher.server";
import { RandomAlbumsQuery } from "~/services/types.server";
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
      <Header user={data.user} />
      <Page>
        <Container>
          <AlbumsGrid albums={data.albums.randomAlbums} />
          <Outlet />
        </Container>
      </Page>
      <Footer />
    </Layout>
  );
};

export default Albums;
