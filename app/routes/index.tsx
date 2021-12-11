import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { authenticator, User } from "~/api/auth.server";
import { Page } from "~/components";
import { Footer, Header, Layout } from "~/molecules/layout";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.isAuthenticated(request);
};

const Index = (): ReactElement => {
  const user = useLoaderData<User>();

  return (
    <Layout>
      <Header isAuthorized={!!user} />
      <Page>
        <main>Index</main>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Page>
      <Footer />
    </Layout>
  );
};

export default Index;
