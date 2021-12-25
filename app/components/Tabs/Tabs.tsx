import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "~/styles/stitches.config";

export const Tabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  // width: 300,
  boxShadow: `0 2px 10px $white4`,
});

export const TabsList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `1px solid $brand7`,
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
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: "$brand11" },
  '&[data-state="active"]': {
    color: "$brand11",
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

export const TabsContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px black` },
});
