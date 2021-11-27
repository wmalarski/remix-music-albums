import { styled } from "@stitches/react";

export const Button = styled("button", {
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
  "&:hover": {
    backgroundColor: "lightgray",
  },
});

// export const Container = styled("div", {
//   "--gutter": "16px",
//   width: "1024px",
//   maxWidth: "calc(100% - var(--gutter) * 2)",
//   marginRight: "auto",
//   marginLeft: "auto",
// });
