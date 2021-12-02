import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { Button, StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import * as Styles from "./ReviewListItem.styles";

type ReviewListItemProps = {
  row: VirtualItem;
  review: ReviewWithAlbumAndArtistFragment;
  transition: Transition;
};

export const ReviewListItem = ({
  row,
  review,
  transition,
}: ReviewListItemProps): ReactElement => {
  return (
    <Styles.Container
      direction="column"
      css={{
        height: `${row.size}px`,
        transform: `translateY(${row.start}px)`,
      }}
    >
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
        <Button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </Button>
      </Form>
    </Styles.Container>
  );
};
