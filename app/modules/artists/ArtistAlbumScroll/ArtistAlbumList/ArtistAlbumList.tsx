import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { Flex } from "~/components";
import { AlbumFragment } from "~/services/types.server";
import * as Styles from "./ArtistAlbumList.styles";
import { ArtistAlbumListItem } from "./ArtistAlbumListItem/ArtistAlbumListItem";

type Props = {
  start: number;
  albums?: AlbumFragment[];
  virtualizer: ReturnType<typeof useVirtual>;
};

export const ArtistAlbumList = forwardRef(
  (
    { albums, start, virtualizer }: Props,
    ref?: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    return (
      <Styles.StyledScroll ref={ref}>
        <Flex direction="column" css={{ listContainer: virtualizer.totalSize }}>
          {virtualizer.virtualItems.map((row) => {
            const album = albums?.[row.index - start];
            if (!album) return null;
            return (
              <ArtistAlbumListItem key={album.id} album={album} row={row} />
            );
          })}
        </Flex>
      </Styles.StyledScroll>
    );
  }
);

ArtistAlbumList.displayName = "ArtistAlbumList";
