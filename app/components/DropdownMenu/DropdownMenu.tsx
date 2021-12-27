import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled } from "~/styles/stitches.config";

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "$white2",
  borderRadius: "$md",
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
  padding: "0 $xs 0 $md",
  position: "relative",
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

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
});

export const DropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  { ...itemStyles }
);

export const DropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});

export const DropdownMenuTriggerItem = styled(
  DropdownMenuPrimitive.TriggerItem,
  {
    '&[data-state="open"]': {
      backgroundColor: "$white1",
      color: "$brand8",
    },
    ...itemStyles,
  }
);

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {
  padding: "0 $sm",
  fontSize: "$md",
  color: "$white6",
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
  fill: "$white2",
});

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
