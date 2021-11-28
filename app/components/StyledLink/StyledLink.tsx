import { Link } from "remix";
import { styled } from "~/styles/stitches.config";

export const StyledLink = styled(Link, {
  color: "$links",
  textDecoration: "none",
  "&:hover": {
    color: "$hover",
    textDecoration: "underline",
  },
});
