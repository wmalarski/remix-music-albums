import { ReactElement } from "react";
import { Form, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { authenticator, User } from "~/api/auth.server";
import { Button, Page, StyledLink } from "~/components";
import { HandleFunction } from "~/utils/remix";
import { routes } from "~/utils/routes";

export type LoaderData = {
  user: User;
  message: string;
};

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const handle: HandleFunction = () => {
  return { route: "home" };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return { message: "this is awesome 😎", user };
};

const Index = (): ReactElement => {
  const data = useLoaderData<LoaderData>();

  return (
    <Page>
      <main>Index</main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {!data.user && (
        <p>
          <StyledLink to={routes.login}>Link to login page.</StyledLink>
          Clicking this link will land you in the login page UI.
        </p>
      )}
      {data.user && (
        <Form action={routes.logout} method="post">
          <Button>Logout</Button>
        </Form>
      )}
    </Page>
  );
};

export default Index;
