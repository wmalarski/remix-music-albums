import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import {
  AlbumActions,
  AlbumCover,
  Divider,
  Flex,
  IconButton,
  TooltipText,
} from "~/components";
import { formatAlbum } from "~/utils/formatters";
import { useAlbumRoot } from "..";

export const AlbumDetails = (): ReactElement => {
  const album = useAlbumRoot();

  return (
    <Flex direction="column" gap="sm">
      <AlbumCover mBid={album.sid} label={formatAlbum(album)} />
      <Divider />
      <Flex direction="row" gap="sm">
        <AlbumActions
          albumId={album.id}
          title={album.title}
          name={album.artistByArtist.name}
        />
        <Form method="delete">
          <TooltipText text="Delete album" asChild>
            <IconButton type="submit" aria-label="Delete album">
              <AccessibleIcon label="Trash">
                <TrashIcon />
              </AccessibleIcon>
            </IconButton>
          </TooltipText>
        </Form>
      </Flex>
    </Flex>
  );
};
