import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Link } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { routes } from "~/utils/routes";

type ReviewListProps = {
  reviews?: ReviewWithAlbumAndArtistFragment[];
  transition: Transition;
};

export const ReviewList = ({ reviews }: ReviewListProps): ReactElement => {
  return (
    <div>
      <p>ReviewList</p>
      <div>
        {reviews?.map((review) => (
          <div key={review.id}>
            <p>
              <Link to={routes.album(review.albumByAlbum.id)}>
                {review.albumByAlbum.title}
              </Link>
            </p>
            <p>
              <Link to={routes.artist(review.albumByAlbum.artistByArtist.id)}>
                {review.albumByAlbum.artistByArtist.name}
              </Link>
            </p>
            <p>{review.rate}</p>
            <p>{review.text}</p>
            <p>{review.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
