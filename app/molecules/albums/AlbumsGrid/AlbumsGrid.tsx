import { ReactElement } from "react";
import { RandomAlbumWithArtistFragment } from "~/api/types.server";
import { AlbumCover } from "../../../components/AlbumCover/AlbumCover";
import * as Styles from "./AlbumsGrid.styles";

type AlbumsGridProps = {
  albums?: RandomAlbumWithArtistFragment[];
};

export const AlbumsGrid = ({ albums }: AlbumsGridProps): ReactElement => {
  return (
    <Styles.Container>
      {albums?.map((album) => (
        <AlbumCover key={album.id} album={album} />
      ))}
    </Styles.Container>
  );
};
