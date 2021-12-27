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
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 20%, rgba(255,255,255,0) 100%)",
  display: "flex",
  alignItems: "left",
  justifyContent: "end",
  flexDirection: "column",
  padding: "$sm",
});
