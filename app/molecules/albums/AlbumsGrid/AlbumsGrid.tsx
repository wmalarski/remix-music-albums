import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Link } from "remix";
import { AlbumWithArtistFragment } from "~/api/types";
import { routes } from "~/utils/routes";

type AlbumsGridProps = {
  albums?: AlbumWithArtistFragment[];
  transition: Transition;
};

export const AlbumsGrid = ({ albums }: AlbumsGridProps): ReactElement => {
  return (
    <div>
      AlbumsGrid
      {albums?.map((album) => (
        <p key={album.id}>
          <Link to={routes.album(album.id)}>{album.title}</Link>
        </p>
      ))}
    </div>
  );
};
