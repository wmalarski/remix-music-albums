import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { ErrorsList, Heading } from "~/components";
import { NavigationDialog } from "~/modules/layout";
import { ReviewScroll } from "~/modules/reviews";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { SelectReviewsWithInfoQuery } from "~/services/types.server";
import { json, notAuthorized, notFound } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { scrollConfig } from "~/utils/scroll";
import { isNumber, toNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw notFound();

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteReview({
    id: Number(reviewId),
    profile: user.profileId,
  });

  if (!result.data?.deleteReview?.returning.length) return notAuthorized();
  const album = result.data?.deleteReview?.returning?.[0]?.album;
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
      <NavigationDialog to={routes.albums} header={<Heading>Reviews</Heading>}>
        <ReviewScroll query={query} />
      </NavigationDialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;
