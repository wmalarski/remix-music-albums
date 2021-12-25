import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import {
  AlbumImage,
  Flex,
  IconButton,
  IconLink,
  StyledLink,
  Text,
  TooltipText,
} from "~/components";
import { ReviewWithAlbumAndArtistFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  review: ReviewWithAlbumAndArtistFragment;
};

export const ReviewListItem = ({ row, review }: Props): ReactElement => {
  const album = review.albumByAlbum;

  return (
    <Flex
      ref={row.measureRef}
      direction="row"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <AlbumImage album={review.albumByAlbum} />
      <Flex direction="column">
        <StyledLink to={routes.album(album.id)}>
          <Text size="medium" fontWeight="bold">
            {album.title}
          </Text>
        </StyledLink>
        <StyledLink to={routes.artist(album.artistByArtist.id)}>
          <Text size="medium">{album.artistByArtist.name}</Text>
        </StyledLink>
        <Text size="small">{`Rate: ${review.rate}`}</Text>
        <Text size="small">{`Text: ${review.text}`}</Text>
        <Text size="small">{`Date: ${review.createdAt}`}</Text>
        <Flex direction="row">
          <TooltipText text="Edit review" asChild>
            <IconLink
              to={routes.editReview(review.albumByAlbum.id, review.id)}
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
    </Flex>
  );
};
