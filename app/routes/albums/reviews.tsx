import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useTransition } from "remix";
import { fetcher, FetcherPayload } from "~/api/fetcher";
import {
  GetReviews,
  GetReviewsQuery,
  GetReviewsQueryVariables,
} from "~/api/types";
import { ReviewList } from "~/molecules/reviews";
import { toNumber } from "~/utils/validation";

export const loader: LoaderFunction = ({ params }) => {
  const limit = toNumber(params.reviewLimit, 12);
  const offset = toNumber(params.reviewOffset, 0);

  return fetcher<GetReviewsQueryVariables>(GetReviews, { limit, offset });
};

const Reviews = (): ReactElement => {
  const action = useLoaderData<FetcherPayload<GetReviewsQuery>>();
  const transition = useTransition();

  return (
    <div>
      <p>Reviews</p>
      <ReviewList reviews={action?.data?.review} transition={transition} />
    </div>
  );
};

export default Reviews;
