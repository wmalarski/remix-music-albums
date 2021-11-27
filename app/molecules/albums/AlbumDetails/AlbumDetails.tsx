import { ReactElement } from "react";
import { Link } from "remix";
import { AlbumWithArtistFragment } from "~/api/types";
import { routes } from "~/utils/routes";

type AlbumDetailsProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumDetails = ({ album }: AlbumDetailsProps): ReactElement => {
  return (
    <div>
      <p>AlbumDetails</p>
      <p>
        <Link to={routes.album(album.id)}>Album</Link>
      </p>
      <p>
        <Link to={routes.artist(album.artistByArtist.id)}>Artist</Link>
      </p>
      <p>
        <Link to={routes.newReview(album.id)}>Review</Link>
      </p>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </div>
  );
};
