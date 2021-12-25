import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Pencil1Icon, Pencil2Icon, VideoIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
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
import { useArtistRoot } from "~/modules/artists";
import { AlbumFragment } from "~/services/types.server";
import { redirectToYt } from "~/services/youtube";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  album: AlbumFragment;
};

export const ArtistAlbumListItem = ({ album, row }: Props): ReactElement => {
  const artist = useArtistRoot();

  const handleYtClick = () => redirectToYt(album.title, artist.name);

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      gap="xs"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Flex direction="row" gap="sm">
        <AlbumImage album={album} />
        <Flex direction="column" gap="sm" css={{ padding: "$sm", flexGrow: 1 }}>
          <Flex direction="column">
            <StyledLink to={routes.album(album.id)}>
              <Text size="medium" fontWeight="bold">
                {album.title}
              </Text>
            </StyledLink>
            <Text size="medium">{artist.name}</Text>
            {!!album.year && <Text size="small">{album.year}</Text>}
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
            <TooltipText text="Edit album" asChild>
              <IconLink to={routes.editAlbum(album.id)} aria-label="Edit album">
                <AccessibleIcon label="Edit">
                  <Pencil1Icon />
                </AccessibleIcon>
              </IconLink>
            </TooltipText>
            <TooltipText text="Review album" asChild>
              <IconLink
                to={routes.newReview(album.id)}
                aria-label="Review album"
              >
                <AccessibleIcon label="Review">
                  <Pencil2Icon />
                </AccessibleIcon>
              </IconLink>
            </TooltipText>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};
