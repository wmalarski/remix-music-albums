import { ReactElement } from "react";
import { VisitWithAlbumAndArtistFragment } from "~/api/types";
import { Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type VisitsListItemProps = {
  visit: VisitWithAlbumAndArtistFragment;
};

export const VisitsListItem = ({
  visit,
}: VisitsListItemProps): ReactElement => {
  return (
    <Flex direction="column">
      <StyledLink to={routes.album(visit.albumByAlbum.id)}>
        {visit.albumByAlbum.title}
      </StyledLink>
      <StyledLink to={routes.artist(visit.albumByAlbum.artistByArtist.id)}>
        {visit.albumByAlbum.artistByArtist.name}
      </StyledLink>
      <p>{visit.createdAt}</p>
    </Flex>
  );
};
