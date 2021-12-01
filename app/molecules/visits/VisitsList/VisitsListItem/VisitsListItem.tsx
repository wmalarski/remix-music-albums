import { ReactElement } from "react";
import { VisitWithAlbumAndArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type VisitsListItemProps = {
  visit: VisitWithAlbumAndArtistFragment;
};

export const VisitsListItem = ({
  visit,
}: VisitsListItemProps): ReactElement => {
  return (
    <div>
      <p>
        <StyledLink to={routes.album(visit.albumByAlbum.id)}>
          {visit.albumByAlbum.title}
        </StyledLink>
      </p>
      <p>
        <StyledLink to={routes.artist(visit.albumByAlbum.artistByArtist.id)}>
          {visit.albumByAlbum.artistByArtist.name}
        </StyledLink>
      </p>
      <p>{visit.createdAt}</p>
    </div>
  );
};
