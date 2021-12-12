import { LoaderFunction } from "remix";
import { graphqlSdk } from "~/api/fetcher.server";
import { SearchQuery } from "~/api/types.server";
import { json } from "~/utils/remix";

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const result = await graphqlSdk.Search({
    limit: 5,
    query: params.get("query"),
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SearchQuery>(result.data ?? { album: [], artist: [] });
};
