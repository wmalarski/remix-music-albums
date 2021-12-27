import { json as remixJson } from "remix";
import { FetcherActionData } from "~/services/fetcher.server";

export const json = <TData>(
  data: TData,
  init?: Parameters<typeof remixJson>[1]
): ReturnType<typeof remixJson> => remixJson(data, init);

export const notFound = (): Response => {
  return new Response("Not Found", { status: 404 });
};

export const notAuthorized = (): ReturnType<typeof remixJson> => {
  return json<FetcherActionData>({
    fetcherErrors: [{ message: "No rights to modify" }],
  });
};
