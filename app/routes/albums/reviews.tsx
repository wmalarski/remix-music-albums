import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { SelectReviewsWithInfoQuery } from "~/api/types.server";
import { ErrorsList } from "~/components";
import { NavigationDialog } from "~/molecules/layout";
import { ReviewScroll } from "~/molecules/reviews";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { getRequestStart, scrollConfig } from "~/utils/scroll";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  const album = result.data?.deleteReviewByPk?.album;
  if (!album || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ request }) => {
  const start = getRequestStart(request);

  const result = await graphqlSdk.SelectReviewsWithInfo({
    limit: scrollConfig.limit,
    offset: start,
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectReviewsWithInfoQuery>(
    result.data ?? { review: [], reviewAggregate: {} }
  );
};

const Reviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const query = useLoaderData<SelectReviewsWithInfoQuery>();

  return (
    <>
      <NavigationDialog to={routes.albums} header="Reviews">
        <ReviewScroll query={query} />
      </NavigationDialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;
