import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { AlbumCover } from "~/components";
import { useArtistRoot } from "~/modules/artists";
import { AlbumFragment } from "~/services/types.server";
import * as Styles from "./ArtistAlbumListItem.styles";

type Props = {
  row: VirtualItem;
  album: AlbumFragment;
};

export const ArtistAlbumListItem = ({ album, row }: Props): ReactElement => {
  const artist = useArtistRoot();

  return (
    <Styles.Container
      ref={row.measureRef}
      direction="column"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <AlbumCover album={{ ...album, artistByArtist: artist }} />
    </Styles.Container>
  );
};
