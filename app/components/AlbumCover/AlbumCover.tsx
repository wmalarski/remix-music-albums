import { ReactElement, useState } from "react";
import { RandomAlbumWithArtistFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { AlbumImage } from "../AlbumImage/AlbumImage";
import { Text } from "../Text/Text";
import * as Styles from "./AlbumCover.styles";

type Props = {
  album: RandomAlbumWithArtistFragment;
};

export const AlbumCover = ({ album }: Props): ReactElement | null => {
  const [isHovering, setIsHovering] = useState(false);

  if (!album.id || !album.sid) return null;

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const label = `${album.title}${
    album.artistByArtist ? `- ${album.artistByArtist.name}` : ""
  }`;

  return (
    <Styles.Container
      to={routes.album(album.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AlbumImage album={album} />
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
