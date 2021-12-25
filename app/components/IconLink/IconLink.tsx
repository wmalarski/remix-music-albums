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
  boxShadow: `0 2px 10px $overlay`,
  "&:hover": { backgroundColor: "$white3", color: "$brand8" },
  "&:focus": { boxShadow: `0 0 0 2px $white9`, outline: "2px solid $brand8" },
});
