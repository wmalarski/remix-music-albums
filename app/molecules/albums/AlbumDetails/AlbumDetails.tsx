import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumDetailsProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumDetails = ({ album }: AlbumDetailsProps): ReactElement => {
  return (
    <div>
      <p>AlbumDetails</p>
      <p>
        <StyledLink to={routes.album(album.id)}>Album</StyledLink>
      </p>
      <p>
        <StyledLink to={routes.artist(album.artistByArtist.id)}>
          Artist
        </StyledLink>
      </p>
      <p>
        <StyledLink to={routes.newReview(album.id)}>Review</StyledLink>
      </p>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </div>
  );
};
