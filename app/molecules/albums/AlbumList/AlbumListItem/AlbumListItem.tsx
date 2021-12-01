import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumListItemProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumListItem = ({ album }: AlbumListItemProps): ReactElement => {
  return (
    <Heading size="medium">
      <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
    </Heading>
  );
};
