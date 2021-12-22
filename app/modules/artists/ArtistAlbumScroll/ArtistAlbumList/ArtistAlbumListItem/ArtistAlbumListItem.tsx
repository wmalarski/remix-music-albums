import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { AlbumImage, Flex, StyledLink, Text } from "~/components";
import { useArtistRoot } from "~/modules/artists";
import { AlbumFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";
import * as Styles from "./ArtistAlbumListItem.styles";

type Props = {
  row: VirtualItem;
  album: AlbumFragment;
};

export const ArtistAlbumListItem = ({ album, row }: Props): ReactElement => {
  const artist = useArtistRoot();

  return (
    <Styles.Container
      ref={row.measureRef}
      direction="row"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <AlbumImage album={album} />
      <Flex direction="column">
        <StyledLink to={routes.album(album.id)}>
          <Text size="medium" fontWeight="bold">
            {album.title}
          </Text>
        </StyledLink>
        <Text size="medium">{artist.name}</Text>
        {!!album.year && <Text size="small">{album.year}</Text>}
      </Flex>
    </Styles.Container>
  );
};
