import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { AlbumWithArtistFragment } from "~/api/types";
import { Flex, Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumListItemProps = {
  row: VirtualItem;
  album: AlbumWithArtistFragment;
};

export const AlbumListItem = ({
  album,
  row,
}: AlbumListItemProps): ReactElement => {
  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Heading size="medium">
        <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
      </Heading>
    </Flex>
  );
};
