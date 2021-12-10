import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { frontCoverUrl } from "~/api/coverArt";
import { AlbumWithArtistFragment } from "~/api/types.server";
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
      <img src={frontCoverUrl({ mBid: album.sid })} alt="cover" />
      <Heading size="medium">
        <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
      </Heading>
    </Flex>
  );
};
