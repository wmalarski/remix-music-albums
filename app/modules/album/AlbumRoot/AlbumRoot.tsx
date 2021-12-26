import { createContext, ReactElement, ReactNode, useContext } from "react";
import { AlbumWithArtistFragment } from "~/services/types.server";

const AlbumRootContext = createContext<AlbumWithArtistFragment | null>(null);

export const useAlbumRoot = (): AlbumWithArtistFragment => {
  const value = useContext(AlbumRootContext);
  if (!value) throw new Error("AlbumRootContext not initialized");
  return value;
};

type Props = {
  album: AlbumWithArtistFragment;
  children: ReactNode;
};

export const AlbumRoot = ({ children, album }: Props): ReactElement => {
  return (
    <AlbumRootContext.Provider value={album}>
      {children}
    </AlbumRootContext.Provider>
  );
};
