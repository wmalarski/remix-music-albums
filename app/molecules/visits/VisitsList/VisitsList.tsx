import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { VisitWithAlbumAndArtistFragment } from "~/api/types.server";
import { Divider, Flex } from "~/components";
import * as Styles from "./VisitsList.styles";
import { VisitsListItem } from "./VisitsListItem/VisitsListItem";

type VisitsListProps = {
  start: number;
  visits?: VisitWithAlbumAndArtistFragment[];
  virtualizer: ReturnType<typeof useVirtual>;
};

export const VisitsList = forwardRef(
  (
    { visits, start, virtualizer }: VisitsListProps,
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
            const visit = visits?.[row.index - start];
            if (!visit) return null;
            return <VisitsListItem key={visit.id} visit={visit} row={row} />;
          })}
        </Flex>
      </Styles.StyledScroll>
    );
  }
);

VisitsList.displayName = "VisitsList";
