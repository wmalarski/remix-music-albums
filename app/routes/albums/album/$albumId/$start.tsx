import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
} from "remix";
import { ErrorsList, TabsContent } from "~/components";
import { AlbumReviewsScroll } from "~/modules/album";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { SelectReviewsQuery } from "~/services/types.server";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { scrollConfig } from "~/utils/scroll";
import { isNumber, toNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId))
    throw new Response("Review Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  if (result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(Number(params.albumId)));
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.SelectReviews({
    limit: scrollConfig.limit,
    offset: toNumber(params.start, 0),
    where: { album: { _eq: Number(params.albumId) } },
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectReviewsQuery>(
    result.data ?? { review: [], reviewAggregate: {} }
  );
};

const AlbumReviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const query = useLoaderData<SelectReviewsQuery>();
  const location = useLocation();

  return (
    <TabsContent value={location.pathname}>
      <AlbumReviewsScroll query={query} />
      <ErrorsList errors={action?.fetcherErrors} />
    </TabsContent>
  );
};

export default AlbumReviews;
