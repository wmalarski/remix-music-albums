import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import {
  AlbumActions,
  AlbumCover,
  Divider,
  Flex,
  IconButton,
  StyledLink,
  Text,
  TooltipText,
} from "~/components";
import { ReviewWithAlbumAndArtistFragment } from "~/services/types.server";
import { formatAlbum, formatDate } from "~/utils/formatters";
import { routes } from "~/utils/routes";
import * as Styles from "./ReviewListItem.styles";

type Props = {
  row: VirtualItem;
  review: ReviewWithAlbumAndArtistFragment;
};

export const ReviewListItem = ({ row, review }: Props): ReactElement => {
  const album = review.albumByAlbum;

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      gap="xs"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Styles.Container>
        <AlbumCover label={formatAlbum(album)} mBid={album.sid} />
        <Styles.Wrapper direction="column" gap="sm">
          <Flex direction="column">
            <StyledLink to={routes.album(album.id)}>
              <Text size="medium" fontWeight="bold">
                {album.title}
              </Text>
            </StyledLink>
            <StyledLink to={routes.artist(album.artistByArtist.id)}>
              <Text size="medium">{album.artistByArtist.name}</Text>
            </StyledLink>
            {!!album.year && <Text size="small">{album.year}</Text>}
          </Flex>
          <Divider />
          <Flex direction="column">
            <Text size="small" opacity="0.8">{`Rate: ${review.rate}`}</Text>
            <Text size="small" opacity="0.8">{`Text: ${review.text}`}</Text>
            <Text size="small" opacity="0.8">{`Date: ${formatDate(
              review.createdAt
            )}`}</Text>
          </Flex>
          <Divider />
          <Flex direction="row" gap="sm">
            <AlbumActions
              albumId={album.id}
              title={album.title}
              name={album.artistByArtist.name}
            />
            <Form method="delete">
              <input
                type="hidden"
                defaultValue={review.id}
                name="reviewId"
                aria-hidden
              />
              <TooltipText text="Remove review" asChild>
                <IconButton
                  type="submit"
                  aria-label="Remove review"
                  tabIndex={0}
                >
                  <AccessibleIcon label="Trash">
                    <TrashIcon />
                  </AccessibleIcon>
                </IconButton>
              </TooltipText>
            </Form>
          </Flex>
        </Styles.Wrapper>
      </Styles.Container>
      <Divider />
    </Flex>
  );
};
