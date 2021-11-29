import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher";
import { SelectReviewsQuery } from "~/api/types";
import { Dialog, ErrorsList, Heading } from "~/components";
import { ReviewList } from "~/molecules/reviews";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber, toNumber } from "~/utils/validation";

export const handle: HandleFunction = () => {
  return { route: "reviews" };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  const album = result.data?.delete_review_by_pk?.album;
  if (!album || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.reviewLimit, 12);
  const offset = toNumber(params.reviewOffset, 0);

  const result = await graphqlSdk.SelectReviews({ limit, offset });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectReviewsQuery>(result.data ?? { review: [] });
};

const Reviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const query = useLoaderData<SelectReviewsQuery>();
  const transition = useRouteTransition();

  return (
    <>
      <Dialog>
        <Heading>Reviews</Heading>
        <ReviewList reviews={query.review} transition={transition} />
        <Dialog.Close to={routes.albums()}>
          <Cross1Icon />
        </Dialog.Close>
      </Dialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;
