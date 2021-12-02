import { Transition } from "@remix-run/react/transition";
import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { Divider, Flex } from "~/components";
import * as Styles from "./ReviewList.styles";
import { ReviewListItem } from "./ReviewListItem/ReviewListItem";

type ReviewListProps = {
  start: number;
  reviews?: ReviewWithAlbumAndArtistFragment[];
  transition: Transition;
  virtualizer: ReturnType<typeof useVirtual>;
};

export const ReviewList = forwardRef(
  (
    { start, reviews, transition, virtualizer }: ReviewListProps,
    ref?: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    return (
      <Styles.StyledScroll ref={ref}>
        <Flex
          direction="column"
          gap={0.5}
          divider={<Divider />}
          css={{
            height: `${virtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.virtualItems.map((row) => {
            const review = reviews?.[Math.abs(start - row.index)];
            if (!review) return null;
            return (
              <ReviewListItem
                key={review.id}
                review={review}
                transition={transition}
                row={row}
              />
            );
          })}
        </Flex>
      </Styles.StyledScroll>
    );
  }
);

ReviewList.displayName = "ReviewList";
