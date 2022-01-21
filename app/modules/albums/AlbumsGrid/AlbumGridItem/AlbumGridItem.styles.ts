import { Flex, StyledLink } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Container = styled(Flex, {
  height: "$cover",
  overflow: "hidden",
  position: "relative",
});

export const Overlay = styled(StyledLink, {
  position: "absolute",
  inset: 0,
  background: "$overlay1",
  display: "flex",
  alignItems: "left",
  justifyContent: "end",
  flexDirection: "column",
  padding: "$sm",
});
