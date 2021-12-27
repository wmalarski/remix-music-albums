import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "~/styles/stitches.config";

export const Tabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
});

export const TabsList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `$border2Brand8`,
});

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  padding: "0 $lg",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$sm",
  lineHeight: 1,
  userSelect: "none",
  color: "$brand9",
  "&:first-child": { borderTopLeftRadius: "$md" },
  "&:last-child": { borderTopRightRadius: "$md" },
  "&:hover": { color: "$brand8", backgroundColor: "$white3" },
  '&[data-state="active"]': {
    color: "$brand8",
    backgroundColor: "$white1",
  },
  "&:focus": { position: "relative", outline: `$border2Brand8` },
});

export const TabsContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: "$lg",
  outline: "none",
  "&:focus": { outline: `$border2Brand8` },
});
