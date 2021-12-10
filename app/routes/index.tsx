import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { authenticator, User } from "~/api/auth.server";
import { Layout, LayoutFooter, LayoutHeader, Page } from "~/components";
import { HandleFunction } from "~/utils/remix";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const handle: HandleFunction = () => {
  return { route: "home" };
};

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.isAuthenticated(request);
};

const Index = (): ReactElement => {
  const user = useLoaderData<User>();

  return (
    <Layout>
      <LayoutHeader isAuthorized={!!user} />
      <Page>
        <main>Index</main>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Page>
      <LayoutFooter />
    </Layout>
  );
};

export default Index;
