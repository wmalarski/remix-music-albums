import { styled } from "~/styles/stitches.config";

export const Heading = styled("h1", {
  margin: 0,
  fontWeight: "$bold",

  variants: {
    size: {
      small2: { fontSize: "1rem" },
      small: { fontSize: "1.5rem" },
      medium: { fontSize: "2rem" },
      large: { fontSize: "3rem" },
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
