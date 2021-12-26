import { ReactElement, useState } from "react";
import { Link } from "remix";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components";
import { redirectToGoogle, redirectToYt } from "~/services/links";
import { RandomAlbumWithArtistFragment } from "~/services/types.server";
import { formatAlbum } from "~/utils/formatters";
import { routes } from "~/utils/routes";
import { AlbumImage } from "../../../../components/AlbumImage/AlbumImage";
import { Text } from "../../../../components/Text/Text";
import * as Styles from "./AlbumCover.styles";

type Props = {
  album: RandomAlbumWithArtistFragment;
};

export const AlbumCover = ({ album }: Props): ReactElement | null => {
  const [isHovering, setIsHovering] = useState(false);

  if (!album.id || !album.sid) return null;

  const label = formatAlbum(album);
  const title = album.title ?? "";
  const name = album.artistByArtist?.name ?? "";

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleYtClick = () => redirectToYt(title, name);
  const handleGoogleClick = () => redirectToGoogle(title, name);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Styles.Container
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AlbumImage mBid={album.sid} label={label} />
          {isHovering && (
            <Styles.Overlay to={routes.album(album.id)}>
              <Text size="medium" fontWeight="bold">
                {label}
              </Text>
              {!!album.year && <Text size="small">{album.year}</Text>}
            </Styles.Overlay>
          )}
        </Styles.Container>
      </ContextMenuTrigger>
      <ContextMenuContent sideOffset={5}>
        <ContextMenuLabel>{label}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem asChild>
          <Link to={routes.editAlbum(album.id)}>Edit</Link>
        </ContextMenuItem>
        <ContextMenuItem asChild>
          <Link to={routes.newReview(album.id)}>Review</Link>
        </ContextMenuItem>
        <ContextMenuItem asChild>
          <Link to={routes.album(album.id)}>Details</Link>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleYtClick}>Youtube</ContextMenuItem>
        <ContextMenuItem onClick={handleGoogleClick}>Google</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
