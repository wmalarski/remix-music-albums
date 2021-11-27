import { ReactElement } from "react";
import { Link } from "remix";
import { ArtistFragment } from "~/api/types";
import { routes } from "~/utils/routes";

type ArtistDetailsProps = {
  artist: ArtistFragment;
};

export const ArtistDetails = ({ artist }: ArtistDetailsProps): ReactElement => {
  return (
    <div>
      ArtistDetails
      <p>
        <Link to={routes.artist(artist.id)}>{`Artist: ${artist.name}`}</Link>
      </p>
      <p>
        <Link to={routes.newAlbum(artist.id)}>New album</Link>
      </p>
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </div>
  );
};
