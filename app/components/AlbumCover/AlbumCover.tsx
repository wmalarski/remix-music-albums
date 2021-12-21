import { ReactElement, useState } from "react";
import { Text } from "~/components";
import { frontCoverUrl } from "~/services/coverArt";
import { RandomAlbumWithArtistFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";
import * as Styles from "./AlbumCover.styles";

type Props = {
  album: RandomAlbumWithArtistFragment;
};

export const AlbumCover = ({ album }: Props): ReactElement | null => {
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
          <Text size="medium" fontWeight="bold">
            {label}
          </Text>
          {!!album.year && <Text size="small">{album.year}</Text>}
        </Styles.Overlay>
      )}
    </Styles.Container>
  );
};
