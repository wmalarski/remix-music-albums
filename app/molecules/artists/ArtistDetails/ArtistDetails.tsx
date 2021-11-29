import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type ArtistDetailsProps = {
  artist: ArtistFragment;
  transition: Transition;
};

export const ArtistDetails = ({
  artist,
  transition,
}: ArtistDetailsProps): ReactElement => {
  return (
    <div>
      ArtistDetails
      <p>
        <StyledLink
          to={routes.artist(artist.id)}
        >{`Artist: ${artist.name}`}</StyledLink>
      </p>
      <p>
        <StyledLink to={routes.newAlbum(artist.id)}>New album</StyledLink>
      </p>
      <p>
        <StyledLink to={routes.editArtist(artist.id)}>Edit Artist</StyledLink>
      </p>
      <Form method="delete">
        <button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </div>
  );
};
