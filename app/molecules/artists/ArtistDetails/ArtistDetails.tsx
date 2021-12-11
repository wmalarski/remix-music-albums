import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import { useArtistRoot } from "..";

type ArtistDetailsProps = {
  transition: Transition;
};

export const ArtistDetails = ({
  transition,
}: ArtistDetailsProps): ReactElement => {
  const artist = useArtistRoot();

  return (
    <Flex direction="column">
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
