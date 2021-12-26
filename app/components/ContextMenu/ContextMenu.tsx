import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { styled } from "@stitches/react";

export const ContextMenuContent = styled(ContextMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "$white2",
  borderRadius: "$md",
  overflow: "hidden",
  padding: "$md",
  boxShadow: "$regular",
});

const itemStyles = {
  all: "unset",
  fontSize: "$md",
  lineHeight: 1,
  borderRadius: "$md",
  display: "flex",
  alignItems: "center",
  height: "$xl",
  padding: "0 $xs",
  position: "relative",
  paddingLeft: "$md",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$white4",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$white3",
    color: "$brand8",
  },
};

export const ContextMenuItem = styled(ContextMenuPrimitive.Item, {
  ...itemStyles,
});

export const ContextMenuCheckboxItem = styled(
  ContextMenuPrimitive.CheckboxItem,
  { ...itemStyles }
);

export const ContextMenuRadioItem = styled(ContextMenuPrimitive.RadioItem, {
  ...itemStyles,
});

export const ContextMenuTriggerItem = styled(ContextMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "$white1",
    color: "$brand8",
  },
  ...itemStyles,
});

export const ContextMenuLabel = styled(ContextMenuPrimitive.Label, {
  padding: "0 $sm",
  fontSize: "$md",
  color: "$white6",
});

export const ContextMenuSeparator = styled(ContextMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$white7",
  margin: 5,
});

export const ContextMenuItemIndicator = styled(
  ContextMenuPrimitive.ItemIndicator,
  {
    position: "absolute",
    left: 0,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }
);

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
