import { ReactElement } from "react";
import { MetaFunction, Outlet } from "remix";

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
        <Outlet />
      </main>
    </div>
  );
};

export default Albums;
