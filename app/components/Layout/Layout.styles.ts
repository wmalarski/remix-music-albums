import { styled } from "@stitches/react";

export const Main = styled("div", {
  flex: "1 1 100%",
});

export const App = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - env(safe-area-inset-bottom))",
  "& > *": {
    width: "100%",
  },
});
