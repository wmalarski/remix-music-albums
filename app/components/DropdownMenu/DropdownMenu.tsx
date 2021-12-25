import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { slideAnimation, styled } from "~/styles/stitches.config";

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "$dialogBackground",
  borderRadius: "$md",
  padding: "$sm",
  boxShadow: "$regular",
  ...slideAnimation,
});

const itemStyles = {
  all: "unset",
  fontSize: "$md",
  lineHeight: 1,
  borderRadius: "$sm",
  display: "flex",
  alignItems: "center",
  height: "$xl",
  padding: "0 $xs",
  position: "relative",
  paddingLeft: "$md",
  userSelect: "none",

  "&[data-disabled]": {
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$white9",
    color: "$white1",
  },
};

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
});

export const DropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ...itemStyles,
  }
);

export const DropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});

export const DropdownMenuTriggerItem = styled(
  DropdownMenuPrimitive.TriggerItem,
  {
    '&[data-state="open"]': {
      backgroundColor: "$white4",
      color: "$white9",
    },
    ...itemStyles,
  }
);

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$brand11",
});

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$white7",
  margin: 5,
});

export const DropdownMenuItemIndicator = styled(
  DropdownMenuPrimitive.ItemIndicator,
  {
    position: "absolute",
    left: 0,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }
);

export const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$dialogBackground",
});

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
