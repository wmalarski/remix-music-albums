import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, Heading } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { useArtistRoot } from "..";

export const ArtistDetails = (): ReactElement => {
  const transition = useRouteTransition();
  const artist = useArtistRoot();

  return (
    <Flex direction="column">
      <Heading size="small">{artist.name}</Heading>
      <Form method="delete">
        <Button type="submit">
          {transition.submission ? "Deleting..." : "Delete"}
        </Button>
      </Form>
    </Flex>
  );
};
