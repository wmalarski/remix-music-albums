import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useVirtual } from "react-virtual";
import { Flex, StyledLink } from "~/components";
import { ReviewFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "../..";
import * as Styles from "./AlbumReviewsList.styles";
import { AlbumReviewsListItem } from "./AlbumReviewsListItem/AlbumReviewsListItem";

type Props = {
  reviews?: ReviewFragment[];
  start: number;
  virtualizer: ReturnType<typeof useVirtual>;
};

export const AlbumReviewsList = forwardRef(
  (
    { reviews, start, virtualizer }: Props,
    ref?: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const album = useAlbumRoot();

    return (
      <>
        <Styles.StyledScroll ref={ref}>
          <Flex
            direction="column"
            css={{ listContainer: virtualizer.totalSize }}
          >
            {virtualizer.virtualItems.map((row) => {
              const review = reviews?.[row.index - start];
              if (!review) return null;
              return (
                <AlbumReviewsListItem
                  key={review.id}
                  review={review}
                  row={row}
                />
              );
            })}
          </Flex>
        </Styles.StyledScroll>
        {virtualizer.virtualItems.length < 1 && (
          <StyledLink to={routes.newReview(album.id)}>Empty list</StyledLink>
        )}
      </>
    );
  }
);

AlbumReviewsList.displayName = "AlbumReviewsList";
