import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { AlbumFragment } from "~/api/types.server";
import { AlbumCover } from "~/components";
import * as Styles from "./ArtistAlbumListItem.styles";

type Props = {
  row: VirtualItem;
  album: AlbumFragment;
};

export const ArtistAlbumListItem = ({ album, row }: Props): ReactElement => {
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