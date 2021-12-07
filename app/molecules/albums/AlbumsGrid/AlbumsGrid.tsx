import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { Grid } from "~/components/Grid/Grid";
import { AlbumsGridItem } from "./AlbumsGridItem/AlbumsGridItem";

type AlbumsGridProps = {
  albums?: AlbumWithArtistFragment[];
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
