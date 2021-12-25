import { TrashIcon, VideoIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import { Flex, Heading, IconButton, StyledLink } from "~/components";
import { frontCoverUrl } from "~/services/coverArt";
import { redirectToYt } from "~/services/youtube";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "..";

export const AlbumDetails = (): ReactElement => {
  const album = useAlbumRoot();

  const handleYtClick = () =>
    redirectToYt(album.title, album.artistByArtist.name);

  return (
    <Flex direction="column">
      <img src={frontCoverUrl({ mBid: album.sid })} alt="" />
      <Heading size="small">{album.title}</Heading>
      <StyledLink to={routes.artist(album.artistByArtist.id)}>
        <Heading size="small2">{album.artistByArtist.name}</Heading>
      </StyledLink>
      <Flex direction="row" gap="0.5">
        <Form method="delete">
          <IconButton type="submit" aria-label="Delete album">
            <TrashIcon />
          </IconButton>
        </Form>
        <IconButton onClick={handleYtClick} aria-label="Youtube">
          <VideoIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
};
