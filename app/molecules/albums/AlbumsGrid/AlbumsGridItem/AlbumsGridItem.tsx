import { ReactElement } from "react";
import { frontCoverUrl } from "~/api/coverArt";
import { RandomAlbumWithArtistFragment } from "~/api/types.server";
import { Flex, StyledLink } from "~/components";
import { routes } from "~/utils/routes";

type AlbumsGridItemProps = {
  album: RandomAlbumWithArtistFragment;
};

export const AlbumsGridItem = ({
  album,
}: AlbumsGridItemProps): ReactElement | null => {
  if (!album.id || !album.sid) return null;
  return (
    <StyledLink to={routes.album(album.id)}>
      <Flex>
        <img src={frontCoverUrl({ mBid: album.sid })} alt="cover" />
        {album.title}
      </Flex>
    </StyledLink>
  );
};
