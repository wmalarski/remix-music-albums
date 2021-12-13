import { ReactElement, useState } from "react";
import { frontCoverUrl } from "~/api/coverArt";
import { RandomAlbumWithArtistFragment } from "~/api/types.server";
import { Heading } from "~/components";
import { routes } from "~/utils/routes";
import * as Styles from "./AlbumsGridItem.styles";

type AlbumsGridItemProps = {
  album: RandomAlbumWithArtistFragment;
};

export const AlbumsGridItem = ({
  album,
}: AlbumsGridItemProps): ReactElement | null => {
  const [isHovering, setIsHovering] = useState(false);

  if (!album.id || !album.sid) return null;

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const label = `${album.title} - ${album.artistByArtist?.name}`;

  return (
    <Styles.Container
      to={routes.album(album.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={frontCoverUrl({ mBid: album.sid })}
        alt={label ?? "cover"}
        aria-label={label}
      />
      {isHovering && (
        <Styles.Overlay>
          <Heading size="small" fontWeight="bold">
            {label}
          </Heading>
        </Styles.Overlay>
      )}
    </Styles.Container>
  );
};
