import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ArtistFragment } from "~/api/types";
import { Button, Flex, StyledLink } from "~/components";
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
    <Flex direction="column">
      <StyledLink
        to={routes.artist(artist.id)}
      >{`Artist: ${artist.name}`}</StyledLink>
      <StyledLink to={routes.newAlbum(artist.id)}>New album</StyledLink>
      <StyledLink to={routes.editArtist(artist.id)}>Edit Artist</StyledLink>
      <Form method="delete">
        <Button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </Button>
      </Form>
    </Flex>
  );
};
