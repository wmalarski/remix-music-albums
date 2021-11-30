import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { VisitWithAlbumAndArtistFragment } from "~/api/types";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import * as Styles from "./VisitsList.styles";

type VisitsListProps = {
  visits?: VisitWithAlbumAndArtistFragment[];
  transition: Transition;
};

export const VisitsList = ({ visits }: VisitsListProps): ReactElement => {
  return (
    <div>
      <p>VisitsList</p>
      <Styles.StyledScroll>
        {visits?.map((visit) => (
          <div key={visit.id}>
            <p>
              <StyledLink to={routes.album(visit.albumByAlbum.id)}>
                {visit.albumByAlbum.title}
              </StyledLink>
            </p>
            <p>
              <StyledLink
                to={routes.artist(visit.albumByAlbum.artistByArtist.id)}
              >
                {visit.albumByAlbum.artistByArtist.name}
              </StyledLink>
            </p>
            <p>{visit.createdAt}</p>
          </div>
        ))}
      </Styles.StyledScroll>
    </div>
  );
};
