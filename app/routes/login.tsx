import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, redirect } from "remix";
import { Page } from "~/components";
import { Footer, Header, Layout } from "~/modules/layout";
import { authenticator } from "~/services/auth.server";
import { routes } from "~/utils/routes";

export const meta: MetaFunction = () => {
  return {
    title: "Music Albums - Login",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return null;
  return redirect(routes.home);
};

const Login = (): ReactElement => {
  return (
    <Layout>
      <Header />
      <Page>
        <form action={routes.auth} method="post">
          <button>Login with Auth0</button>
        </form>
      </Page>
      <Footer />
    </Layout>
  );
};

export default Login;
