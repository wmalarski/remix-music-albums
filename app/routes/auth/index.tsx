import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator, AuthStrategyName } from "~/api/auth.server";
import { routes } from "~/utils/routes";

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(AuthStrategyName, request);
};

export const loader: LoaderFunction = () => redirect(routes.login);
