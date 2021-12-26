import * as ScrollArea from "@radix-ui/react-scroll-area";
import { styled } from "~/styles/stitches.config";

export const StyledScrollArea = styled(ScrollArea.Root, {
  overflow: "hidden",
});

export const StyledViewport = styled(ScrollArea.Viewport, {
  width: "100%",
  height: "100%",
});

export const StyledScrollbar = styled(ScrollArea.Scrollbar, {
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  padding: 2,
  width: "$scroll",
});

export const StyledThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: "$white4",
  borderRadius: "$scroll",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 44,
    minHeight: 44,
  },
});

export const Corner = ScrollArea.Corner;
