import { Transition } from "@remix-run/react/transition";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { ReviewFragment } from "~/api/types";
import { Flex } from "~/components";
import * as Styles from "./AlbumReviewsList.styles";
import { AlbumReviewsListItem } from "./AlbumReviewsListItem/AlbumReviewsListItem";

type AlbumReviewsListProps = {
  albumId: number;
  reviews?: ReviewFragment[];
  start: number;
  transition: Transition;
  virtualizer: ReturnType<typeof useVirtual>;
};

export const AlbumReviewsList = forwardRef(
  (
    { albumId, reviews, transition, start, virtualizer }: AlbumReviewsListProps,
    ref?: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    return (
      <Styles.StyledScroll ref={ref}>
        <Flex direction="column" css={{ listContainer: virtualizer.totalSize }}>
          {virtualizer.virtualItems.map((row) => {
            const review = reviews?.[row.index - start];
            if (!review) return null;
            return (
              <AlbumReviewsListItem
                key={review.id}
                albumId={albumId}
                transition={transition}
                review={review}
                row={row}
              />
            );
          })}
        </Flex>
      </Styles.StyledScroll>
    );
  }
);

AlbumReviewsList.displayName = "AlbumReviewsList";
