import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { Divider, Flex } from "~/components";
import * as Styles from "./AlbumList.styles";
import { AlbumListItem } from "./AlbumListItem/AlbumListItem";

type AlbumListProps = {
  start: number;
  albums?: AlbumWithArtistFragment[];
  virtualizer: ReturnType<typeof useVirtual>;
};

export const AlbumList = forwardRef(
  (
    { albums, start, virtualizer }: AlbumListProps,
    ref?: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    return (
      <Styles.StyledScroll ref={ref}>
        <Flex
          direction="column"
          gap={0.5}
          divider={<Divider />}
          css={{ listContainer: virtualizer.totalSize }}
        >
          {virtualizer.virtualItems.map((row) => {
            const album = albums?.[row.index - start];
            if (!album) return null;
            return <AlbumListItem key={album.id} album={album} row={row} />;
          })}
        </Flex>
      </Styles.StyledScroll>
    );
  }
);

AlbumList.displayName = "AlbumList";
