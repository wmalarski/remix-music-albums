import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumDetailsProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumDetails = ({ album }: AlbumDetailsProps): ReactElement => {
  return (
    <div>
      <Heading>
        <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
      </Heading>
      <Heading>
        <StyledLink to={routes.artist(album.artistByArtist.id)}>
          {album.artistByArtist.name}
        </StyledLink>
      </Heading>
      <p>
        <StyledLink to={routes.newReview(album.id)}>New Review</StyledLink>
      </p>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </div>
  );
};
