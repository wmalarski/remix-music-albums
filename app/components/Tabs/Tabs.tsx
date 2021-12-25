import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "~/styles/stitches.config";

export const Tabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
});

export const TabsList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `1px solid $brand8`,
});

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  userSelect: "none",
  color: "$brand9",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: "$brand8", backgroundColor: "$white3" },
  '&[data-state="active"]': {
    color: "$brand8",
    backgroundColor: "$white1",
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },
  "&:focus": { position: "relative", outline: `1px solid $brand9` },
});

export const TabsContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  outline: "none",
  "&:focus": { outline: `1px solid $brand9` },
});
