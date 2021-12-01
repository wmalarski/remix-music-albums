import { styled } from "~/styles/stitches.config";

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gridTemplateRows: "repeat(6, 200px)",
  gridGap: "1rem",
  gridAutoFlow: "dense",
});
