import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { GlobeIcon, Pencil1Icon, VideoIcon } from "@radix-ui/react-icons";
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
import { redirectToGoogle, redirectToYt } from "~/services/links";
import { VisitWithAlbumAndArtistFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  visit: VisitWithAlbumAndArtistFragment;
};

export const VisitsListItem = ({ visit, row }: Props): ReactElement => {
  const album = visit.albumByAlbum;

  const handleYtClick = () =>
    redirectToYt(album.title, album.artistByArtist.name);

  const handleGoogleClick = () =>
    redirectToGoogle(album.title, album.artistByArtist.name);

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
            <StyledLink to={routes.artist(album.artistByArtist.id)}>
              <Text size="medium">{album.artistByArtist.name}</Text>
            </StyledLink>
            {!!album.year && <Text size="small">{album.year}</Text>}
          </Flex>
          <Divider />
          <Text
            size="small"
            opacity="0.8"
          >{`Date: ${new Intl.DateTimeFormat().format(
            new Date(visit.createdAt)
          )}`}</Text>
          <Divider />
          <Flex direction="row" gap="sm">
            <TooltipText text="Open youtube" asChild>
              <IconButton onClick={handleYtClick} aria-label="Youtube">
                <AccessibleIcon label="Video">
                  <VideoIcon />
                </AccessibleIcon>
              </IconButton>
            </TooltipText>
            <TooltipText text="Open google" asChild>
              <IconButton onClick={handleGoogleClick} aria-label="Google">
                <AccessibleIcon label="Globe">
                  <GlobeIcon />
                </AccessibleIcon>
              </IconButton>
            </TooltipText>
            <TooltipText text="Review album" asChild>
              <IconLink
                to={routes.newReview(album.id)}
                aria-label="Review album"
              >
                <AccessibleIcon label="Review">
                  <Pencil1Icon />
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
