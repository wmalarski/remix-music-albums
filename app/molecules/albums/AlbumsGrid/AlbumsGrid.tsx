import { ReactElement } from "react";
import { RandomAlbumWithArtistFragment } from "~/api/types.server";
import { Grid } from "~/components/Grid/Grid";
import { AlbumsGridItem } from "./AlbumsGridItem/AlbumsGridItem";

type AlbumsGridProps = {
  albums?: RandomAlbumWithArtistFragment[];
};

export const AlbumsGrid = ({ albums }: AlbumsGridProps): ReactElement => {
  return (
    <Grid>
      {albums?.map((album) => (
        <AlbumsGridItem key={album.id} album={album} />
      ))}
    </Grid>
  );
};
