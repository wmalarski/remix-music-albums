import { Link } from "remix";
import { Container } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Ul = styled("ul", {
  listStyle: "none",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "1.5em",
});

export const Li = styled("li", {
  fontWeight: "bold",
});

export const HomeLink = styled(Link, {
  width: "106px",
  height: "30px",
  color: "$foreground",
});

export const Content = styled(Container, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Header = styled("header", {
  paddingTop: "1rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid $white3",
});
