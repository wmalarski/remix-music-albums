import { Link } from "remix";
import { styled } from "~/styles/stitches.config";

export const IconLink = styled(Link, {
  textDecoration: "unset",
  outline: "none",
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
