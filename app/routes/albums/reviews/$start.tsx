import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { ErrorsList } from "~/components";
import { NavigationDialog } from "~/modules/layout";
import { ReviewScroll } from "~/modules/reviews";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { SelectReviewsWithInfoQuery } from "~/services/types.server";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { scrollConfig } from "~/utils/scroll";
import { isNumber, toNumber } from "~/utils/validation";

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

export const loader: LoaderFunction = async ({ params }) => {
  const result = await graphqlSdk.SelectReviewsWithInfo({
    limit: scrollConfig.limit,
    offset: toNumber(params.start, 0),
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
