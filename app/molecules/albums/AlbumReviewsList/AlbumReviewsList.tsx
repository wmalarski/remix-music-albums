import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { ReviewFragment } from "~/api/types";
import { Flex } from "~/components";
import * as Styles from "./AlbumReviewsList.styles";
import { AlbumReviewsListItem } from "./AlbumReviewsListItem/AlbumReviewsListItem";

type AlbumReviewsListProps = {
  albumId: number;
  reviews?: ReviewFragment[];
  transition: Transition;
};

export const AlbumReviewsList = ({
  albumId,
  reviews,
  transition,
}: AlbumReviewsListProps): ReactElement => {
  return (
    <Styles.StyledScroll>
      <Flex direction="column">
        {reviews?.map((review) => (
          <AlbumReviewsListItem
            key={review.id}
            albumId={albumId}
            transition={transition}
            review={review}
          />
        ))}
      </Flex>
    </Styles.StyledScroll>
  );
};
