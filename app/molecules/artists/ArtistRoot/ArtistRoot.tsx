import { createContext, ReactElement, ReactNode, useContext } from "react";
import { ArtistWithAlbumsFragment } from "~/api/types.server";

type ArtistRootValue = ArtistWithAlbumsFragment;

const ArtistRootContext = createContext<ArtistRootValue | null>(null);

export const useArtistRoot = (): ArtistRootValue => {
  const value = useContext(ArtistRootContext);
  if (!value) throw new Error("ArtistRootContext not initialized");
  return value;
};

type Props = {
  artist: ArtistWithAlbumsFragment;
  children: ReactNode;
};

export const ArtistRoot = ({ children, artist }: Props): ReactElement => {
  return (
    <ArtistRootContext.Provider value={artist}>
      {children}
    </ArtistRootContext.Provider>
  );
};
