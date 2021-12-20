import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types.server";
import { Button, Flex, StyledLink } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  review: ReviewWithAlbumAndArtistFragment;
};

export const ReviewListItem = ({ row, review }: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
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
    </Flex>
  );
};
