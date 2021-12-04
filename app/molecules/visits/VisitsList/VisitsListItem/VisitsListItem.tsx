import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { VisitWithAlbumAndArtistFragment } from "~/api/types";
import { Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type VisitsListItemProps = {
  row: VirtualItem;
  visit: VisitWithAlbumAndArtistFragment;
};

export const VisitsListItem = ({
  visit,
  row,
}: VisitsListItemProps): ReactElement => {
  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
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
