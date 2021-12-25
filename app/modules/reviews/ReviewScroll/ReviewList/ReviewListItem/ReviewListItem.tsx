import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Pencil1Icon, TrashIcon, VideoIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { Form } from "remix";
import {
  AlbumImage,
  Divider,
  Flex,
  IconButton,
  IconLink,
  StyledLink,
  Text,
  TooltipText,
} from "~/components";
import { ReviewWithAlbumAndArtistFragment } from "~/services/types.server";
import { redirectToYt } from "~/services/youtube";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  review: ReviewWithAlbumAndArtistFragment;
};

export const ReviewListItem = ({ row, review }: Props): ReactElement => {
  const album = review.albumByAlbum;

  const handleYtClick = () =>
    redirectToYt(album.title, album.artistByArtist.name);

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      gap="xs"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Flex direction="row" gap="sm">
        <AlbumImage album={review.albumByAlbum} />
        <Flex
          direction="column"
          gap="sm"
          css={{ padding: "$sm", flexGrow: "1" }}
        >
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
            <Text
              size="small"
              opacity="0.8"
            >{`Date: ${new Intl.DateTimeFormat().format(
              new Date(review.createdAt)
            )}`}</Text>
          </Flex>
          <Divider />
          <Flex direction="row" gap="sm">
            <TooltipText text="Open youtube" asChild>
              <IconButton onClick={handleYtClick} aria-label="Youtube">
                <AccessibleIcon label="Video">
                  <VideoIcon />
                </AccessibleIcon>
              </IconButton>
            </TooltipText>
            <TooltipText text="Edit review" asChild>
              <IconLink
                to={routes.editReview(review.albumByAlbum.id, review.id)}
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
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};
