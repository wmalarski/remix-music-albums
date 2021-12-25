import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import { Flex, IconButton, IconLink, Text, TooltipText } from "~/components";
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
        <TooltipText text="Edit review" asChild>
          <IconLink
            to={routes.editReview(album.id, review.id)}
            aria-label="Edit review"
          >
            <Pencil1Icon />
          </IconLink>
        </TooltipText>
        <Form method="delete">
          <input type="hidden" defaultValue={review.id} name="reviewId" />
          <TooltipText text="Remove review" asChild>
            <IconButton type="submit" aria-label="Remove review">
              <TrashIcon />
            </IconButton>
          </TooltipText>
        </Form>
      </Flex>
    </Flex>
  );
};
