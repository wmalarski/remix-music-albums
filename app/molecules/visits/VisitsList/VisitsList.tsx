import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Link } from "remix";
import { VisitWithAlbumAndArtistFragment } from "~/api/types";
import { routes } from "~/utils/routes";

type VisitsListProps = {
  visits?: VisitWithAlbumAndArtistFragment[];
  transition: Transition;
};

export const VisitsList = ({ visits }: VisitsListProps): ReactElement => {
  return (
    <div>
      <p>VisitsList</p>
      <div>
        {visits?.map((visit) => (
          <div key={visit.id}>
            <p>
              <Link to={routes.album(visit.albumByAlbum.id)}>
                {visit.albumByAlbum.title}
              </Link>
            </p>
            <p>
              <Link to={routes.artist(visit.albumByAlbum.artistByArtist.id)}>
                {visit.albumByAlbum.artistByArtist.name}
              </Link>
            </p>
            <p>{visit.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
