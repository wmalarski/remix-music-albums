import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { VisitWithAlbumAndArtistFragment } from "~/api/types";
import { Divider, Flex } from "~/components";
import * as Styles from "./VisitsList.styles";
import { VisitsListItem } from "./VisitsListItem/VisitsListItem";

type VisitsListProps = {
  visits?: VisitWithAlbumAndArtistFragment[];
  transition: Transition;
};

export const VisitsList = ({ visits }: VisitsListProps): ReactElement => {
  return (
    <Styles.StyledScroll>
      <Flex direction="column" gap={0.5} divider={<Divider />}>
        {visits?.map((visit) => (
          <VisitsListItem key={visit.id} visit={visit} />
        ))}
      </Flex>
    </Styles.StyledScroll>
  );
};
