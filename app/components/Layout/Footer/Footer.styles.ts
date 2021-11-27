import { Container } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Content = styled(Container, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Footer = styled("footer", {
  paddingTop: "1rem",
  paddingBottom: "1rem",
  borderTop: "1px solid var(--color-border)",
});
