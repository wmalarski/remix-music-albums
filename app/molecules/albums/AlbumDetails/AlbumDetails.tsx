import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { AlbumWithArtistFragment } from "~/api/types";
import { Heading, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumDetailsProps = {
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
        <StyledLink to={routes.editAlbum(album.id)}>Edit Album</StyledLink>
      </p>
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
