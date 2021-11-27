import { Link } from "remix";
import { styled } from "~/styles/stitches.config";

export const StyledLink = styled(Link, {
  color: "var(--color-links)",
  textDecoration: "none",
  "&:hover": {
    color: "var(--color-links-hover)",
    textDecoration: "underline",
  },
});
