import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import { Button, Flex, StyledLink } from "~/components";
import { ReviewFragment } from "~/services/types.server";
import { useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "../../../AlbumRoot/AlbumRoot";

type Props = {
  row: VirtualItem;
  review: ReviewFragment;
};

export const AlbumReviewsListItem = ({ row, review }: Props): ReactElement => {
  const album = useAlbumRoot();

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
      <StyledLink to={routes.editReview(album.id, review.id)}>
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
