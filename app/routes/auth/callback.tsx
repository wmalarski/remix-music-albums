import { LoaderFunction } from "remix";
import { authenticator, AuthStrategyName } from "~/api/auth.server";
import { routes } from "~/utils/routes";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate(AuthStrategyName, request, {
    successRedirect: routes.home,
    failureRedirect: routes.login,
  });
};
