import { ReactElement } from "react";
import { RandomAlbumWithArtistFragment } from "~/api/types.server";
import * as Styles from "./AlbumsGrid.styles";
import { AlbumsGridItem } from "./AlbumsGridItem/AlbumsGridItem";

type AlbumsGridProps = {
  albums?: RandomAlbumWithArtistFragment[];
};

export const AlbumsGrid = ({ albums }: AlbumsGridProps): ReactElement => {
  return (
    <Styles.Container>
      {albums?.map((album) => (
        <AlbumsGridItem key={album.id} album={album} />
      ))}
    </Styles.Container>
  );
};
