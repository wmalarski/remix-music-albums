import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type ReviewListProps = {
  reviews?: ReviewWithAlbumAndArtistFragment[];
  transition: Transition;
};

export const ReviewList = ({
  reviews,
  transition,
}: ReviewListProps): ReactElement => {
  return (
    <div>
      <p>ReviewList</p>
      <div>
        {reviews?.map((review) => (
          <div key={review.id}>
            <p>
              <StyledLink to={routes.album(review.albumByAlbum.id)}>
                {review.albumByAlbum.title}
              </StyledLink>
            </p>
            <p>
              <StyledLink
                to={routes.artist(review.albumByAlbum.artistByArtist.id)}
              >
                {review.albumByAlbum.artistByArtist.name}
              </StyledLink>
            </p>
            <p>{review.rate}</p>
            <p>{review.text}</p>
            <p>{review.createdAt}</p>
            <Form method="delete">
              <input type="hidden" value={review.id} name="reviewId" />
              <button type="submit">
                {transition.submission ? "Deleting..." : "Delete"}
              </button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
};
