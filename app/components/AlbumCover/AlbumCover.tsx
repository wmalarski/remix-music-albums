import { ReactElement } from "react";
import { frontCoverUrl } from "~/services/coverArt";
import * as Styles from "./AlbumCover.styles";

type Props = {
  label: string;
  mBid?: string;
};

export const AlbumCover = ({ label, mBid }: Props): ReactElement | null => {
  if (!mBid) return null;

  return (
    <Styles.Image
      src={frontCoverUrl({ mBid })}
      alt={label}
      aria-label={label}
    />
  );
};
