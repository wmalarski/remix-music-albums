import { ReactElement } from "react";
import { RandomAlbumWithArtistFragment } from "~/services/types.server";
import { AlbumGridItem } from "./AlbumGridItem/AlbumGridItem";
import * as Styles from "./AlbumsGrid.styles";

type Props = {
  albums?: RandomAlbumWithArtistFragment[];
};

export const AlbumsGrid = ({ albums }: Props): ReactElement => {
  return (
    <Styles.Container>
      {albums?.map((album) => (
        <AlbumGridItem key={album.id} album={album} />
      ))}
    </Styles.Container>
  );
};
