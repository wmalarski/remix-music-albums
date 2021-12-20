import { ReactElement, ReactNode } from "react";
import { useLocation, useNavigate } from "remix";
import { Tabs, TabsList, TabsTrigger } from "~/components";
import { routes } from "~/utils/routes";
import { useArtistRoot } from "../../ArtistRoot/ArtistRoot";

type Props = {
  children: ReactNode;
};

export const ArtistTabs = ({ children }: Props): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const artist = useArtistRoot();

  const handleTabChange = (value: string) => navigate(value);

  return (
    <Tabs value={location.pathname} onValueChange={handleTabChange}>
      <TabsList aria-label="Manage artist">
        <TabsTrigger value={routes.artist(artist.id)}>Albums</TabsTrigger>
        <TabsTrigger value={routes.newAlbum(artist.id)}>New album</TabsTrigger>
        <TabsTrigger value={routes.editArtist(artist.id)}>
          Edit Artist
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
