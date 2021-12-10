import { ReactElement } from "react";
import { frontCoverUrl } from "~/api/coverArt";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumsGridItemProps = {
  album: AlbumWithArtistFragment;
};

export const AlbumsGridItem = ({
  album,
}: AlbumsGridItemProps): ReactElement => {
  return (
    <StyledLink to={routes.album(album.id)}>
      <Flex>
        <img src={frontCoverUrl({ mBid: album.sid })} alt="cover" />
        {album.title}
      </Flex>
    </StyledLink>
  );
};
