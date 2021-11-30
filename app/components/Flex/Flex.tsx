import { styled } from "~/styles/stitches.config";

export const Flex = styled("div", {
  display: "flex",

  variants: {
    direction: {
      column: { flexDirection: "column" },
      row: { flexDirection: "row", flexWrap: "nowrap" },
    },
  },
  defaultVariants: {
    direction: "row",
  },
});
