import { LoaderFunction, MetaFunction, redirect } from "remix";
import { routes } from "~/utils/routes";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const loader: LoaderFunction = () => {
  return redirect(routes.albums);
};
