import { styled } from "~/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",

  variants: {
    direction: {
      column: { flexDirection: "column" },
      row: { flexDirection: "row", flexWrap: "nowrap" },
    },
    gap: {
      0: {},
      0.25: { gap: "$0.25" },
      0.5: { gap: "$0.5" },
      1: { gap: "$1" },
      2: { gap: "$2" },
    },
    justifyContent: {
      flexStart: { justifyContent: "flex-start" },
      spaceBetween: { justifyContent: "space-between" },
    },
    alignItems: {
      center: { alignItems: "center" },
      stretch: { alignItems: "stretch" },
    },
  },

  defaultVariants: {
    direction: "row",
    gap: 0.25,
    justifyContent: "flexStart",
    alignItems: "stretch",
  },
});
