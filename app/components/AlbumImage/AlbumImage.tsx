import { ReactElement } from "react";
import { frontCoverUrl } from "~/services/coverArt";
import { RandomAlbumWithArtistFragment } from "~/services/types.server";
import * as Styles from "./AlbumImage.styles";

type Props = {
  album: RandomAlbumWithArtistFragment;
};

export const AlbumImage = ({ album }: Props): ReactElement | null => {
  if (!album.sid) return null;

  const label = `${album.title}${
    album.artistByArtist ? ` - ${album.artistByArtist?.name}` : ""
  }`;

  return (
    <Styles.Image
      src={frontCoverUrl({ mBid: album.sid })}
      alt={label}
      aria-label={label}
    />
  );
};
