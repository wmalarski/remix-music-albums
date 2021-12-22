import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import { Flex, Heading, IconButton } from "~/components";
import { useArtistRoot } from "..";

export const ArtistDetails = (): ReactElement => {
  const artist = useArtistRoot();

  return (
    <Flex direction="row">
      <Heading size="small">{artist.name}</Heading>
      <Form method="delete">
        <IconButton type="submit">
          <AccessibleIcon label="Remove review">
            <TrashIcon />
          </AccessibleIcon>
        </IconButton>
      </Form>
    </Flex>
  );
};
