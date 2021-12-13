import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { AlbumCover } from "~/components";
import * as Styles from "./ArtistAlbumListItem.styles";

type ArtistAlbumListItemProps = {
  row: VirtualItem;
  album: AlbumWithArtistFragment;
};

export const ArtistAlbumListItem = ({
  album,
  row,
}: ArtistAlbumListItemProps): ReactElement => {
  return (
    <Styles.Container
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <AlbumCover album={album} />
    </Styles.Container>
  );
};
