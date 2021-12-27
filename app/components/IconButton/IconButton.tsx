import { styled } from "~/styles/stitches.config";

export const IconButton = styled("button", {
  all: "unset",
  cursor: "pointer",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$white9",
  backgroundColor: "$white1",
  boxShadow: "$small",
  "&:hover": { backgroundColor: "$white3", color: "$brand8" },
  "&:focus": { outline: "$border2Brand8" },
});
