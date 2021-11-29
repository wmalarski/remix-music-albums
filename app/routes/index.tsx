import { ReactElement } from "react";
import { MetaFunction } from "remix";
import { Page } from "~/components";
import { HandleFunction } from "~/utils/remix";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const handle: HandleFunction = () => {
  return { route: "home" };
};

const Index = (): ReactElement => {
  return (
    <Page>
      <main>Index</main>
    </Page>
  );
};

export default Index;
