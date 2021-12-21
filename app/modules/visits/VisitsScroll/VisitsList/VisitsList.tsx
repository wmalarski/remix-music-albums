import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { Divider, Flex } from "~/components";
import { VisitWithAlbumAndArtistFragment } from "~/services/types.server";
import * as Styles from "./VisitsList.styles";
import { VisitsListItem } from "./VisitsListItem/VisitsListItem";

type Props = {
  start: number;
  visits?: VisitWithAlbumAndArtistFragment[];
  virtualizer: ReturnType<typeof useVirtual>;
};

export const VisitsList = forwardRef(
  (
    { visits, start, virtualizer }: Props,
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
