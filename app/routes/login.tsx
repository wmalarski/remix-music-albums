import { ReactElement } from "react";
import { MetaFunction } from "remix";
import { Page } from "~/components";
import { routes } from "~/utils/routes";

export const meta: MetaFunction = () => {
  return {
    title: "Music Albums - Login",
    description: "Welcome to remix!",
  };
};

const Login = (): ReactElement => {
  return (
    <Page>
      <form action={routes.auth} method="post">
        <button>Login with Auth0</button>
      </form>
    </Page>
  );
};

export default Login;
