import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewFragment } from "~/api/types";
import { Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import * as Styles from "./AlbumReviewsList.styles";

type AlbumReviewsListProps = {
  albumId: number;
  reviews?: ReviewFragment[];
  transition: Transition;
};

export const AlbumReviewsList = ({
  albumId,
  reviews,
  transition,
}: AlbumReviewsListProps): ReactElement => {
  return (
    <div>
      <Heading size="medium">Reviews</Heading>
      <Styles.StyledScroll>
        {reviews?.map((review) => (
          <div key={review.id}>
            <p>{review.rate}</p>
            <p>{review.text}</p>
            <p>{review.createdAt}</p>
            <p>
              <StyledLink to={routes.editReview(albumId, review.id)}>
                Edit review
              </StyledLink>
            </p>
            <Form method="delete">
              <input type="hidden" defaultValue={review.id} name="reviewId" />
              <button type="submit">
                {transition.submission ? "Deleting..." : "Delete"}
              </button>
            </Form>
          </div>
        ))}
      </Styles.StyledScroll>
    </div>
  );
};
