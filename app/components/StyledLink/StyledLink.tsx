import { Link } from "remix";
import { styled } from "~/styles/stitches.config";

export const StyledLink = styled(Link, {
  color: "$brand9",
  textDecoration: "none",
  "&:hover": {
    color: "$brand8",
    textDecoration: "underline",
  },
});
