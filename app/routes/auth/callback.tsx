import { LoaderFunction } from "remix";
import { authenticator, AuthStrategyName } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import { routes } from "~/utils/routes";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  await authenticator.authenticate(AuthStrategyName, request, {
    successRedirect: session.data.route ?? routes.home,
    failureRedirect: routes.login,
  });
};
