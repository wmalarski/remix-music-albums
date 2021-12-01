import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form, useFormAction } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { Button, Divider, Flex } from "~/components";
import * as Styles from "./ReviewList.styles";
import { ReviewListItem } from "./ReviewListItem/ReviewListItem";

type ReviewListProps = {
  reviews?: ReviewWithAlbumAndArtistFragment[];
  transition: Transition;
};

export const ReviewList = ({
  reviews,
  transition,
}: ReviewListProps): ReactElement => {
  const loadAction = useFormAction("load");

  return (
    <Styles.StyledScroll>
      <Flex direction="column" gap={0.5} divider={<Divider />}>
        {reviews?.map((review) => (
          <ReviewListItem
            key={review.id}
            review={review}
            transition={transition}
          />
        ))}
      </Flex>
      <Form action={loadAction} method="get">
        <Button type="submit">
          {transition.submission ? "Loading..." : "Load"}
        </Button>
      </Form>
    </Styles.StyledScroll>
  );
};
