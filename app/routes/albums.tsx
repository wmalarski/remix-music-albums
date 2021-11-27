import { ReactElement } from "react";
import { Link, MetaFunction, Outlet } from "remix";
import { routes } from "~/utils/routes";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

const Albums = (): ReactElement => {
  return (
    <div className="remix__page">
      <main>
        Albums
        <Link to={routes.albums}>Albums</Link>
        <Link to={routes.newArtist}>New Artist</Link>
        <Outlet />
      </main>
    </div>
  );
};

export default Albums;
