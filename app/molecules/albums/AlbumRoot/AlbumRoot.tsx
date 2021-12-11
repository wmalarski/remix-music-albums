import { createContext, ReactElement, ReactNode, useContext } from "react";
import { AlbumWithArtistAndReviewsFragment } from "~/api/types.server";

type AlbumRootValue = AlbumWithArtistAndReviewsFragment;

const AlbumRootContext = createContext<AlbumRootValue | null>(null);

export const useAlbumRoot = (): AlbumRootValue => {
  const value = useContext(AlbumRootContext);
  if (!value) throw new Error("AlbumRootContext not initialized");
  return value;
};

type AlbumRootProps = {
  album: AlbumWithArtistAndReviewsFragment;
  children: ReactNode;
};

export const AlbumRoot = ({
  children,
  album,
}: AlbumRootProps): ReactElement => {
  return (
    <AlbumRootContext.Provider value={album}>
      {children}
    </AlbumRootContext.Provider>
  );
};
