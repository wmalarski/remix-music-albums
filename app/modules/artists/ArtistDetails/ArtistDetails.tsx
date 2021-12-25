import { TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import { Flex, Heading, IconButton, TooltipText } from "~/components";
import { useArtistRoot } from "..";

export const ArtistDetails = (): ReactElement => {
  const artist = useArtistRoot();

  return (
    <Flex direction="row" gap="sm">
      <Heading size="small">{artist.name}</Heading>
      <Form method="delete">
        <TooltipText text="Remove artist" asChild>
          <IconButton type="submit" aria-label="Remove artist">
            <TrashIcon />
          </IconButton>
        </TooltipText>
      </Form>
    </Flex>
  );
};
