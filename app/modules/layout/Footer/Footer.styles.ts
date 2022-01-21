import { Container } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Content = styled(Container, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Footer = styled("footer", {
  borderTop: "$border1White3",
});
