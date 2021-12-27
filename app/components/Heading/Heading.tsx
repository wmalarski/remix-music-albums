import { styled } from "~/styles/stitches.config";

export const Heading = styled("h1", {
  margin: 0,
  fontWeight: "$bold",

  variants: {
    size: {
      small2: { fontSize: "$md" },
      small: { fontSize: "$xl" },
      medium: { fontSize: "$xl2" },
      large: { fontSize: "$xl3" },
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
