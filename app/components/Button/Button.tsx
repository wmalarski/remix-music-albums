import { styled } from "~/styles/stitches.config";

export const Button = styled("button", {
  all: "unset",
  cursor: "pointer",
  borderRadius: "$md",
  height: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$white9",
  backgroundColor: "$white1",
  boxShadow: `0 2px 10px $overlay`,
  padding: "0 $md",
  "&:hover": { backgroundColor: "$white1", color: "$brand8" },
  "&:focus": { boxShadow: `0 0 0 2px $white9`, outline: "2px solid $brand8" },

  variants: {
    primary: {
      true: {
        color: "$white1",
        backgroundColor: "$white9",
        "&:hover": { backgroundColor: "$brand9", color: "$white1" },
        "&:focus": {
          outline: "2px solid $brand8",
        },
      },
    },
  },
});
