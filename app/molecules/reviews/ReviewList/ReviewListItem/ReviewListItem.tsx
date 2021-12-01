import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type ReviewListItemProps = {
  review: ReviewWithAlbumAndArtistFragment;
  transition: Transition;
};

export const ReviewListItem = ({
  review,
  transition,
}: ReviewListItemProps): ReactElement => {
  return (
    <Flex direction="column">
      <StyledLink to={routes.album(review.albumByAlbum.id)}>
        {review.albumByAlbum.title}
      </StyledLink>
      <StyledLink to={routes.artist(review.albumByAlbum.artistByArtist.id)}>
        {review.albumByAlbum.artistByArtist.name}
      </StyledLink>
      <StyledLink to={routes.editReview(review.albumByAlbum.id, review.id)}>
        Edit review
      </StyledLink>
      <p>{review.rate}</p>
      <p>{review.text}</p>
      <p>{review.createdAt}</p>
      <Form method="delete">
        <input type="hidden" defaultValue={review.id} name="reviewId" />
        <button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </Flex>
  );
};
