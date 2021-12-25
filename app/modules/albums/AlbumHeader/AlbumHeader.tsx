import { ReactElement } from "react";
import { Flex, Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "..";

export const AlbumHeader = (): ReactElement => {
  const album = useAlbumRoot();

  return (
    <Flex direction="row" alignItems="center" gap="md">
      <Heading size="small">{album.title}</Heading>
      <StyledLink to={routes.artist(album.artistByArtist.id)}>
        <Heading size="small2">{album.artistByArtist.name}</Heading>
      </StyledLink>
    </Flex>
  );
};
