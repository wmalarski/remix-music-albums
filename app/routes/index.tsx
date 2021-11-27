import { ReactElement } from "react";
import { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

const Index = (): ReactElement => {
  return (
    <div className="remix__page">
      <main>Index</main>
    </div>
  );
};

export default Index;
