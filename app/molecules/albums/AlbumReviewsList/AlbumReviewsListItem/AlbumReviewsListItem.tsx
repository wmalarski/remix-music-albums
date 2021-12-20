import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import { ReviewFragment } from "~/api/types.server";
import { Button, Flex, StyledLink } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  albumId: number;
  review: ReviewFragment;
};

export const AlbumReviewsListItem = ({
  row,
  albumId,
  review,
}: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
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
