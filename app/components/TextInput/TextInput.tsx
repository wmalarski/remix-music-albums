import { styled } from "~/styles/stitches.config";

export const TextInput = styled("input", {
  display: "block",
  border: "1px solid $border",
  width: "100%",
  font: "inherit",
  lineHeight: 1,
  height: "calc(1ch + 1.5em)",
  paddingRight: "0.5em",
  paddingLeft: "0.5em",
  backgroundColor: "hsl(0 0% 100% / 20%)",
  color: "$foreground",
});
