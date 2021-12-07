import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumsGridItemProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumsGridItem = ({
  album,
}: AlbumsGridItemProps): ReactElement => {
  return <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>;
};
