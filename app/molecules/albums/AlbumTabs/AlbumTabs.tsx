import { ReactElement, ReactNode } from "react";
import { useLocation, useNavigate } from "remix";
import { Tabs, TabsList, TabsTrigger } from "~/components";
import { routes } from "~/utils/routes";
import { useAlbumRoot } from "../..";

type Props = {
  children: ReactNode;
};

export const AlbumTabs = ({ children }: Props): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const album = useAlbumRoot();

  const handleTabChange = (value: string) => navigate(value);

  return (
    <Tabs value={location.pathname} onValueChange={handleTabChange}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger value={routes.album(album.id)}>Reviews</TabsTrigger>
        <TabsTrigger value={routes.newReview(album.id)}>New Review</TabsTrigger>
        <TabsTrigger value={routes.editAlbum(album.id)}>Edit Album</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
