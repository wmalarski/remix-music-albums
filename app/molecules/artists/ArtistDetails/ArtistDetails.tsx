import { ReactElement } from "react";
import { ArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type ArtistDetailsProps = {
  artist: ArtistFragment;
};

export const ArtistDetails = ({ artist }: ArtistDetailsProps): ReactElement => {
  return (
    <div>
      ArtistDetails
      <p>
        <StyledLink
          to={routes.artist(artist.id)}
        >{`Artist: ${artist.name}`}</StyledLink>
      </p>
      <p>
        <StyledLink to={routes.newAlbum(artist.id)}>New album</StyledLink>
      </p>
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </div>
  );
};
