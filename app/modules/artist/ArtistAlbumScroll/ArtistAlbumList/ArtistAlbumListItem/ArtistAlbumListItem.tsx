import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import {
  AlbumActions,
  AlbumCover,
  Divider,
  Flex,
  StyledLink,
  Text,
} from "~/components";
import { useArtistRoot } from "~/modules/artist";
import { AlbumFragment } from "~/services/types.server";
import { formatAlbum } from "~/utils/formatters";
import { routes } from "~/utils/routes";
import * as Styles from "./ArtistAlbumListItem.styles";

type Props = {
  row: VirtualItem;
  album: AlbumFragment;
};

export const ArtistAlbumListItem = ({ album, row }: Props): ReactElement => {
  const artist = useArtistRoot();

  return (
    <Flex
      ref={row.measureRef}
      direction="column"
      gap="xs"
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <Flex direction="row" gap="sm">
        <AlbumCover label={formatAlbum(album)} mBid={album.sid} />
        <Styles.Wrapper direction="column" gap="sm" space="sm">
          <Flex direction="column">
            <StyledLink to={routes.album(album.id)}>
              <Text size="medium" fontWeight="bold">
                {album.title}
              </Text>
            </StyledLink>
            <Text size="medium">{artist.name}</Text>
            {!!album.year && <Text size="small">{album.year}</Text>}
          </Flex>
          <Divider />
          <AlbumActions
            albumId={album.id}
            title={album.title}
            name={artist.name}
          />
        </Styles.Wrapper>
      </Flex>
      <Divider />
    </Flex>
  );
};
