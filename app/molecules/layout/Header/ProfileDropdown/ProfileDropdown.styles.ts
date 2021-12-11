import { styled } from "~/styles/stitches.config";

export const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: "$brand11",
  ":focus > &": { color: "white" },
  "[data-disabled] &": { color: "$brand7" },
});
