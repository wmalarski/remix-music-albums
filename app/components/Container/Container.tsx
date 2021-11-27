import { styled } from "~/styles/stitches.config";

export const Container = styled("div", {
  "--gutter": "16px",
  width: "1024px",
  maxWidth: "calc(100% - var(--gutter) * 2)",
  marginRight: "auto",
  marginLeft: "auto",
});
