import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { FetcherError } from "~/api/fetcher";
import { AlbumWithArtistFragment } from "~/api/types";
import { Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumDetailsProps = {
  fetcherErrors?: FetcherError[];
  transition: Transition;
  album: AlbumWithArtistFragment;
};

export const AlbumDetails = ({
  album,
  transition,
}: AlbumDetailsProps): ReactElement => {
  return (
    <div>
      <Heading>
        <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
      </Heading>
      <Heading>
        <StyledLink to={routes.artist(album.artistByArtist.id)}>
          {album.artistByArtist.name}
        </StyledLink>
      </Heading>
      <p>
        <StyledLink to={routes.newReview(album.id)}>New Review</StyledLink>
      </p>
      <Form method="delete">
        <button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </div>
  );
};
