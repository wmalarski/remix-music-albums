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
  },

  defaultVariants: {
    size: "medium",
    fontWeight: "regular",
  },
});
