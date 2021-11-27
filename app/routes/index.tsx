import { ReactElement } from "react";
import { MetaFunction } from "remix";
import { Page } from "~/components";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

const Index = (): ReactElement => {
  return (
    <Page>
      <main>Index</main>
    </Page>
  );
};

export default Index;
