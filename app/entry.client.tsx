import { IdProvider } from "@radix-ui/react-id";
import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

// eslint-disable-next-line jest/require-hook
hydrate(
  <IdProvider>
    <RemixBrowser />
  </IdProvider>,
  document
);
