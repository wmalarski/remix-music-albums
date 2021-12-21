import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import { Flex, Heading, IconButton, StyledLink } from "~/components";
import { frontCoverUrl } from "~/services/coverArt";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "..";

export const AlbumDetails = (): ReactElement => {
  const album = useAlbumRoot();

  return (
    <Flex direction="column">
      <img src={frontCoverUrl({ mBid: album.sid })} alt="" />
      <Heading size="small">{album.title}</Heading>
      <StyledLink to={routes.artist(album.artistByArtist.id)}>
        <Heading size="small2">{album.artistByArtist.name}</Heading>
      </StyledLink>
      <Form method="delete">
        <IconButton type="submit">
          <AccessibleIcon label="Delete album">
            <TrashIcon />
          </AccessibleIcon>
        </IconButton>
      </Form>
    </Flex>
  );
};
