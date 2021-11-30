import { ReactElement } from "react";
import { AlbumWithArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import * as Styles from "./AlbumList.styles";

type AlbumListProps = {
  albums?: AlbumWithArtistFragment[];
};

export const AlbumList = ({ albums }: AlbumListProps): ReactElement => {
  return (
    <div>
      AlbumList
      <Styles.StyledScroll>
        {albums?.map((album) => (
          <p key={album.id}>
            <StyledLink to={routes.album(album.id)}>{album.title}</StyledLink>
          </p>
        ))}
      </Styles.StyledScroll>
    </div>
  );
};
