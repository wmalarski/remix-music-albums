import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumsGridItemProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumsGridItem = ({
  album,
}: AlbumsGridItemProps): ReactElement => {
  return (
    <p>
      <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
    </p>
  );
};
