import { ReactElement } from "react";
import { LoaderFunction, MetaFunction, redirect } from "remix";
import { authenticator } from "~/api/auth.server";
import { Layout, LayoutFooter, LayoutHeader, Page } from "~/components";
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
      <LayoutHeader isAuthorized={false} />
      <Page>
        <form action={routes.auth} method="post">
          <button>Login with Auth0</button>
        </form>
      </Page>
      <LayoutFooter />
    </Layout>
  );
};

export default Login;
