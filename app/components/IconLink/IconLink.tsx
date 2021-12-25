import { Link } from "remix";
import { styled } from "~/styles/stitches.config";

export const IconLink = styled(Link, {
  textDecoration: "unset",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$white9",
  backgroundColor: "$white1",
  boxShadow: `0 2px 10px $overlay`,
  "&:hover": { backgroundColor: "$white4" },
  "&:focus": { boxShadow: `0 0 0 2px $white9` },
});
