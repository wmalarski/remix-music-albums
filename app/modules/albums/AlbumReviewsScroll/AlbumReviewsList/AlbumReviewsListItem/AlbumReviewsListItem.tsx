import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import {
  Divider,
  Flex,
  IconButton,
  IconLink,
  Text,
  TooltipText,
} from "~/components";
import { ReviewFragment } from "~/services/types.server";
import { formatDate } from "~/utils/formatters";
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
      gap="sm"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Flex direction="column">
        <Text size="small">{`Rate: ${review.rate}`}</Text>
        <Text size="small">{`Text: ${review.text}`}</Text>
        <Text size="small">{`Date: ${formatDate(review.createdAt)}`}</Text>
      </Flex>
      <Divider />
      <Flex direction="row" gap="sm">
        <TooltipText text="Edit review" asChild>
          <IconLink
            to={routes.editReview(album.id, review.id)}
            aria-label="Edit review"
          >
            <AccessibleIcon label="Edit">
              <Pencil1Icon />
            </AccessibleIcon>
          </IconLink>
        </TooltipText>
        <Form method="delete">
          <input
            type="hidden"
            defaultValue={review.id}
            name="reviewId"
            aria-hidden
          />
          <TooltipText text="Remove review" asChild>
            <IconButton type="submit" aria-label="Remove review">
              <AccessibleIcon label="Trash">
                <TrashIcon />
              </AccessibleIcon>
            </IconButton>
          </TooltipText>
        </Form>
      </Flex>
      <Divider />
    </Flex>
  );
};
