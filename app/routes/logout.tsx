import { ActionFunction, json, LoaderFunction, redirect } from "remix";
import { destroySession, getSession } from "~/api/session.server";
import { routes } from "~/utils/routes";

export const action: ActionFunction = async ({ request }) => {
  return redirect(routes.home, {
    headers: {
      "Set-Cookie": await destroySession(await getSession(request)),
    },
  });
};

export const loader: LoaderFunction = () => {
  throw json({}, { status: 404 });
};
