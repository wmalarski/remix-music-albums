import { styled } from "~/styles/stitches.config";

export const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$white11",
  backgroundColor: "white",
  boxShadow: `0 2px 10px $overlay`,
  "&:hover": { backgroundColor: "$white4" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});
