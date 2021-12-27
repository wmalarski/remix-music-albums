import { styled } from "~/styles/stitches.config";

export const Text = styled("p", {
  margin: 0,

  variants: {
    size: {
      small2: { fontSize: "$xs" },
      small: { fontSize: "$sm" },
      medium: { fontSize: "$md" },
      large: { fontSize: "$xl" },
    },
    fontWeight: {
      thin: { fontWeight: "$thin" },
      regular: { fontWeight: "$regular" },
      bold: { fontWeight: "$bold" },
    },
    opacity: {
      0.8: { opacity: 0.8 },
      1: { opacity: 1 },
    },
  },

  defaultVariants: {
    size: "medium",
    fontWeight: "regular",
    opacity: "1",
  },
});
