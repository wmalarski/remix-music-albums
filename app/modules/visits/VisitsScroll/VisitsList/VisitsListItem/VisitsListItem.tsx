import { ReactElement } from "react";
import { VirtualItem } from "react-virtual";
import { AlbumImage, Flex, StyledLink, Text } from "~/components";
import { VisitWithAlbumAndArtistFragment } from "~/services/types.server";
import { routes } from "~/utils/routes";

type Props = {
  row: VirtualItem;
  visit: VisitWithAlbumAndArtistFragment;
};

export const VisitsListItem = ({ visit, row }: Props): ReactElement => {
  const album = visit.albumByAlbum;

  return (
    <Flex
      ref={row.measureRef}
      direction="row"
      gap={1}
      css={{ listRow: `${row.size} ${row.start}` }}
    >
      <AlbumImage album={album} />
      <Flex direction="column">
        <StyledLink to={routes.album(album.id)}>
          <Text size="medium" fontWeight="bold">
            {album.title}
          </Text>
        </StyledLink>
        <StyledLink to={routes.artist(album.artistByArtist.id)}>
          <Text size="medium">{album.artistByArtist.name}</Text>
        </StyledLink>
        {!!album.year && <Text size="small">{album.year}</Text>}
        <Text size="small">{visit.createdAt}</Text>
      </Flex>
    </Flex>
  );
};
