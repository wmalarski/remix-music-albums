import { StyledLink } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Container = styled(StyledLink, {
  height: 250,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
});

export const Overlay = styled("div", {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 20%, rgba(255,255,255,0) 100%)",
  display: "flex",
  alignItems: "end",
});
