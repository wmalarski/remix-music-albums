import { styled } from "~/styles/stitches.config";

export const Inset = styled("div", {
  variants: {
    space: {
      no: { padding: "unset" },
      xs: { padding: "$xs" },
      sm: { padding: "$sm" },
      md: { padding: "$md" },
      lg: { padding: "$lg" },
      xl: { padding: "$xl" },
    },
    spaceLeft: {
      no: { paddingLeft: "unset" },
      xs: { paddingLeft: "$xs" },
      sm: { paddingLeft: "$sm" },
      md: { paddingLeft: "$md" },
      lg: { paddingLeft: "$lg" },
      xl: { paddingLeft: "$xl" },
    },
    spaceRight: {
      no: { paddingRight: "unset" },
      xs: { paddingRight: "$xs" },
      sm: { paddingRight: "$sm" },
      md: { paddingRight: "$md" },
      lg: { paddingRight: "$lg" },
      xl: { paddingRight: "$xl" },
    },
    spaceTop: {
      no: { paddingTop: "unset" },
      xs: { paddingTop: "$xs" },
      sm: { paddingTop: "$sm" },
      md: { paddingTop: "$md" },
      lg: { paddingTop: "$lg" },
      xl: { paddingTop: "$xl" },
    },
    spaceBottom: {
      no: { paddingBottom: "unset" },
      xs: { paddingBottom: "$xs" },
      sm: { paddingBottom: "$sm" },
      md: { paddingBottom: "$md" },
      lg: { paddingBottom: "$lg" },
      xl: { paddingBottom: "$xl" },
    },
    spaceX: {
      no: { paddingRight: "unset", paddingLeft: "unset" },
      xs: { paddingRight: "$xs", paddingLeft: "$xs" },
      sm: { paddingRight: "$sm", paddingLeft: "$sm" },
      md: { paddingRight: "$md", paddingLeft: "$md" },
      lg: { paddingRight: "$lg", paddingLeft: "$lg" },
      xl: { paddingRight: "$xl", paddingLeft: "$xl" },
    },
    spaceY: {
      no: { paddingTop: "unset", paddingBottom: "unset" },
      xs: { paddingTop: "$xs", paddingBottom: "$xs" },
      sm: { paddingTop: "$sm", paddingBottom: "$sm" },
      md: { paddingTop: "$md", paddingBottom: "$md" },
      lg: { paddingTop: "$lg", paddingBottom: "$lg" },
      xl: { paddingTop: "$xl", paddingBottom: "$xl" },
    },
  },

  defaultVariants: {
    space: "no",
    spaceLeft: "no",
    spaceRight: "no",
    spaceBottom: "no",
    spaceTop: "no",
    spaceX: "no",
    spaceY: "no",
  },
});
