import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumsGridProps = {
  albums?: AlbumWithArtistFragment[];
};

export const AlbumsGrid = ({ albums }: AlbumsGridProps): ReactElement => {
  return (
    <div>
      AlbumsGrid
      {albums?.map((album) => (
        <p key={album.id}>
          <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
        </p>
      ))}
    </div>
  );
};
