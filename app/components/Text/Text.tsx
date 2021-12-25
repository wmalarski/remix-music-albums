import { styled } from "~/styles/stitches.config";

export const Text = styled("p", {
  margin: 0,

  variants: {
    size: {
      small2: { fontSize: "0.5rem" },
      small: { fontSize: "0.75rem" },
      medium: { fontSize: "1rem" },
      large: { fontSize: "2rem" },
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
