import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewFragment } from "~/api/types";

type AlbumReviewsListProps = {
  reviews?: ReviewFragment[];
  transition: Transition;
};

export const AlbumReviewsList = ({
  reviews,
  transition,
}: AlbumReviewsListProps): ReactElement => {
  return (
    <div>
      <p>AlbumReviewsList</p>
      <div>
        {reviews?.map((review) => (
          <div key={review.id}>
            <p>{review.rate}</p>
            <p>{review.text}</p>
            <p>{review.createdAt}</p>
            <Form method="delete">
              <input type="hidden" value={review.id} name="reviewId" />
              <button type="submit">
                {transition.submission ? "Deleting..." : "Delete"}
              </button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
};
