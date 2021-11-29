import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { FetcherError, graphqlSdk } from "~/api/fetcher";
import { SelectReviewsQuery } from "~/api/types";
import { Dialog, ErrorsList, Heading } from "~/components";
import { ReviewList } from "~/molecules/reviews";
import { routes } from "~/utils/routes";
import { isNumber, toNumber } from "~/utils/validation";

type ReviewsActionData = {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  const album = result.data?.delete_review_by_pk?.album;
  if (!album || result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.reviewLimit, 12);
  const offset = toNumber(params.reviewOffset, 0);

  const result = await graphqlSdk.SelectReviews({ limit, offset });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json(result.data);
};

const Reviews = (): ReactElement => {
  const action = useActionData<ReviewsActionData>();
  const query = useLoaderData<SelectReviewsQuery>();
  const transition = useTransition();

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
