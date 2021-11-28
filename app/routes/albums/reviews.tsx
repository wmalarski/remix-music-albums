import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
} from "remix";
import { FetcherPayload, jsonFetcher } from "~/api/fetcher";
import {
  DeleteReview,
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  SelectReviews,
  SelectReviewsQuery,
  SelectReviewsQueryVariables,
} from "~/api/types";
import { Dialog, Heading } from "~/components";
import { ReviewList } from "~/molecules/reviews";
import { routes } from "~/utils/routes";
import { isNumber, toNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw new Response("Not Found", { status: 404 });

  const result = await jsonFetcher<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DeleteReview, { id: Number(reviewId) });

  const album = result.data?.delete_review_by_pk?.album;
  if (!album || result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.reviewLimit, 12);
  const offset = toNumber(params.reviewOffset, 0);

  const result = await jsonFetcher<
    SelectReviewsQuery,
    SelectReviewsQueryVariables
  >(SelectReviews, { limit, offset });

  return json(result);
};

const Reviews = (): ReactElement => {
  const loader = useLoaderData<FetcherPayload<SelectReviewsQuery>>();
  const transition = useTransition();

  return (
    <Dialog>
      <Heading>Reviews</Heading>
      <ReviewList reviews={loader?.data?.review} transition={transition} />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Reviews;
