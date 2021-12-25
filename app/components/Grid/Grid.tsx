import { styled } from "~/styles/stitches.config";

export const Grid = styled("div", {
  display: "grid",

  variants: {
    form: {
      true: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        rowGap: "$md",
        columnGap: "$md",
      },
    },
  },
});
