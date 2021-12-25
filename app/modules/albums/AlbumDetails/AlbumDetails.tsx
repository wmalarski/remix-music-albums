import { TrashIcon, VideoIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import { Divider, Flex, IconButton, TooltipText } from "~/components";
import { frontCoverUrl } from "~/services/coverArt";
import { redirectToYt } from "~/services/youtube";
import { useAlbumRoot } from "..";

export const AlbumDetails = (): ReactElement => {
  const album = useAlbumRoot();

  const handleYtClick = () =>
    redirectToYt(album.title, album.artistByArtist.name);

  return (
    <Flex direction="column" gap="sm">
      <img src={frontCoverUrl({ mBid: album.sid })} alt="" />
      <Divider />
      <Flex direction="row" gap="sm">
        <TooltipText text="Open youtube" asChild>
          <IconButton onClick={handleYtClick} aria-label="Youtube">
            <VideoIcon />
          </IconButton>
        </TooltipText>
        <Form method="delete">
          <TooltipText text="Delete album" asChild>
            <IconButton type="submit" aria-label="Delete album">
              <TrashIcon />
            </IconButton>
          </TooltipText>
        </Form>
      </Flex>
    </Flex>
  );
};
