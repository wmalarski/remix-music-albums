import { createContext, ReactElement, ReactNode, useContext } from "react";
import { ArtistFragment } from "~/api/types.server";

const ArtistRootContext = createContext<ArtistFragment | null>(null);

export const useArtistRoot = (): ArtistFragment => {
  const value = useContext(ArtistRootContext);
  if (!value) throw new Error("ArtistRootContext not initialized");
  return value;
};

type Props = {
  artist: ArtistFragment;
  children: ReactNode;
};

export const ArtistRoot = ({ children, artist }: Props): ReactElement => {
  return (
    <ArtistRootContext.Provider value={artist}>
      {children}
    </ArtistRootContext.Provider>
  );
};
