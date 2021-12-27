import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import {
  GlobeIcon,
  Pencil1Icon,
  Pencil2Icon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Flex, IconButton, IconLink, TooltipText } from "~/components";
import { redirectToGoogle, redirectToYt } from "~/services/links";
import { routes } from "~/utils/routes";

type Props = {
  albumId: number;
  title: string;
  name: string;
};

export const AlbumActions = ({ albumId, title, name }: Props): ReactElement => {
  const handleYtClick = () => redirectToYt(title, name);

  const handleGoogleClick = () => redirectToGoogle(title, name);

  return (
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
      <TooltipText text="Edit album" asChild>
        <IconLink to={routes.editAlbum(albumId)} aria-label="Edit album">
          <AccessibleIcon label="Edit">
            <Pencil1Icon />
          </AccessibleIcon>
        </IconLink>
      </TooltipText>
      <TooltipText text="Review album" asChild>
        <IconLink to={routes.newReview(albumId)} aria-label="Review album">
          <AccessibleIcon label="Review">
            <Pencil2Icon />
          </AccessibleIcon>
        </IconLink>
      </TooltipText>
    </Flex>
  );
};
