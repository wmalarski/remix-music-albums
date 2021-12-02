import { ActionFunction, LoaderFunction } from "remix";
import { HandleFunction, json } from "~/utils/remix";

export const handle: HandleFunction = () => {
  return { route: "reviewsLoad" };
};

export const action: ActionFunction = async ({ request, context, params }) => {
  console.log("action", { request, context, params });

  return json([{ data: 1 }]);
};

export const loader: LoaderFunction = () => json([{ data: "loader" }]);
