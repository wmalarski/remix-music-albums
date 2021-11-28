import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useTransition } from "remix";
import { fetcher, FetcherPayload } from "~/api/fetcher";
import {
  SelectReviews,
  SelectReviewsQuery,
  SelectReviewsQueryVariables,
} from "~/api/types";
import { Dialog, Heading } from "~/components";
import { ReviewList } from "~/molecules/reviews";
import { routes } from "~/utils/routes";
import { toNumber } from "~/utils/validation";

export const loader: LoaderFunction = ({ params }) => {
  const limit = toNumber(params.reviewLimit, 12);
  const offset = toNumber(params.reviewOffset, 0);

  return fetcher<SelectReviewsQueryVariables>(SelectReviews, { limit, offset });
};

const Reviews = (): ReactElement => {
  const action = useLoaderData<FetcherPayload<SelectReviewsQuery>>();
  const transition = useTransition();

  return (
    <Dialog>
      <Heading>Reviews</Heading>
      <ReviewList reviews={action?.data?.review} transition={transition} />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Reviews;
