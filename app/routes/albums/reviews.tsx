import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useTransition } from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  GetReviews,
  GetReviewsQuery,
  GetReviewsQueryVariables,
  ReviewWithAlbumAndArtistFragment,
} from "~/api/types";
import { ReviewList } from "~/molecules/reviews";
import { toNumber } from "~/utils/validation";

type ReviewsActionData = {
  reviews?: ReviewWithAlbumAndArtistFragment[];
  errors?: FetcherError[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.reviewLimit, 12);
  const offset = toNumber(params.reviewOffset, 0);

  const payload = await jsonFetcher<GetReviewsQuery, GetReviewsQueryVariables>(
    GetReviews,
    { limit, offset }
  );

  return { reviews: payload.data?.review, errors: payload.errors };
};

const Reviews = (): ReactElement => {
  const action = useLoaderData<ReviewsActionData>();
  const transition = useTransition();

  return (
    <div>
      <p>Reviews</p>
      <ReviewList reviews={action?.reviews} transition={transition} />
    </div>
  );
};

export default Reviews;
