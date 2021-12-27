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

export const HomeLink = styled(Link, {
  height: "$xl",
  color: "$foreground",
});

export const Content = styled(Container, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Header = styled("header", {
  paddingTop: "$md",
  paddingBottom: "$md",
  borderBottom: "$border1White3",
});
