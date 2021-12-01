import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewFragment } from "~/api/types";
import { Button, Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumReviewsListItemProps = {
  albumId: number;
  review: ReviewFragment;
  transition: Transition;
};

export const AlbumReviewsListItem = ({
  albumId,
  review,
  transition,
}: AlbumReviewsListItemProps): ReactElement => {
  return (
    <Flex direction="column">
      <p>{review.rate}</p>
      <p>{review.text}</p>
      <p>{review.createdAt}</p>
      <StyledLink to={routes.editReview(albumId, review.id)}>
        Edit review
      </StyledLink>
      <Form method="delete">
        <input type="hidden" defaultValue={review.id} name="reviewId" />
        <Button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </Button>
      </Form>
    </Flex>
  );
};
