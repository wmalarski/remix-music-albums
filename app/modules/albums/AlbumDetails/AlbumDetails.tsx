import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { GlobeIcon, TrashIcon, VideoIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Form } from "remix";
import { Divider, Flex, IconButton, TooltipText } from "~/components";
import { frontCoverUrl } from "~/services/coverArt";
import { redirectToGoogle, redirectToYt } from "~/services/links";
import { useAlbumRoot } from "..";

export const AlbumDetails = (): ReactElement => {
  const album = useAlbumRoot();

  const handleYtClick = () =>
    redirectToYt(album.title, album.artistByArtist.name);

  const handleGoogleClick = () =>
    redirectToGoogle(album.title, album.artistByArtist.name);

  return (
    <Flex direction="column" gap="sm">
      <img src={frontCoverUrl({ mBid: album.sid })} alt="" />
      <Divider />
      <Flex direction="row" gap="sm">
        <TooltipText text="Open youtube" asChild>
          <IconButton onClick={handleYtClick} aria-label="Youtube">
            <AccessibleIcon label="Video">
              <VideoIcon />
            </AccessibleIcon>
          </IconButton>
        </TooltipText>
        <TooltipText text="Open google" asChild>
          <IconButton onClick={handleGoogleClick} aria-label="Google">
            <AccessibleIcon label="Globe">
              <GlobeIcon />
            </AccessibleIcon>
          </IconButton>
        </TooltipText>
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
