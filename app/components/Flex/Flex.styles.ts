import { styled } from "~/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",

  variants: {
    direction: {
      column: { flexDirection: "column" },
      row: { flexDirection: "row", flexWrap: "nowrap" },
    },
    gap: {
      no: {},
      xs: { gap: "$xs" },
      sm: { gap: "$sm" },
      md: { gap: "$md" },
      lg: { gap: "$lg" },
      xl: { gap: "$xl" },
    },
    justifyContent: {
      flexStart: { justifyContent: "flex-start" },
      spaceBetween: { justifyContent: "space-between" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
    },
    alignItems: {
      center: { alignItems: "center" },
      stretch: { alignItems: "stretch" },
      left: { alignItems: "left" },
      start: { alignItems: "start" },
    },
  },

  defaultVariants: {
    direction: "row",
    gap: "no",
    justifyContent: "flexStart",
    alignItems: "stretch",
  },
});
