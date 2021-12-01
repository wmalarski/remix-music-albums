import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { Divider, Flex } from "~/components";
import * as Styles from "./AlbumList.styles";
import { AlbumListItem } from "./AlbumListItem/AlbumListItem";

type AlbumListProps = {
  albums?: AlbumWithArtistFragment[];
};

export const AlbumList = ({ albums }: AlbumListProps): ReactElement => {
  return (
    <Styles.StyledScroll>
      <Flex direction="column" gap={0.5} divider={<Divider />}>
        {albums?.map((album) => (
          <AlbumListItem key={album.id} album={album} />
        ))}
      </Flex>
    </Styles.StyledScroll>
  );
};
