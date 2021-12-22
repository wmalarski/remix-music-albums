import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import { Flex, IconButton, IconLink, Text } from "~/components";
import { ReviewFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "../../../AlbumRoot/AlbumRoot";

type Props = {
  row: VirtualItem;
  review: ReviewFragment;
};

export const AlbumReviewsListItem = ({ row, review }: Props): ReactElement => {
  const album = useAlbumRoot();

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Text size="small">{`Rate: ${review.rate}`}</Text>
      <Text size="small">{`Text: ${review.text}`}</Text>
      <Text size="small">{`Date: ${review.createdAt}`}</Text>
      <Flex direction="row">
        <IconLink to={routes.editReview(album.id, review.id)}>
          <AccessibleIcon label="Edit review">
            <Pencil1Icon />
          </AccessibleIcon>
        </IconLink>
        <Form method="delete">
          <input type="hidden" defaultValue={review.id} name="reviewId" />
          <IconButton type="submit">
            <AccessibleIcon label="Remove review">
              <TrashIcon />
            </AccessibleIcon>
          </IconButton>
        </Form>
      </Flex>
    </Flex>
  );
};
