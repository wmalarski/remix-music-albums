import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { Divider, Flex } from "~/components";
import { ReviewWithAlbumAndArtistFragment } from "~/services/types.server";
import * as Styles from "./ReviewList.styles";
import { ReviewListItem } from "./ReviewListItem/ReviewListItem";

type Props = {
  start: number;
  reviews?: ReviewWithAlbumAndArtistFragment[];
  virtualizer: ReturnType<typeof useVirtual>;
};

export const ReviewList = forwardRef(
  (
    { start, reviews, virtualizer }: Props,
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
            const review = reviews?.[row.index - start];
            if (!review) return null;

            return <ReviewListItem key={review.id} review={review} row={row} />;
          })}
        </Flex>
      </Styles.StyledScroll>
    );
  }
);

ReviewList.displayName = "ReviewList";
