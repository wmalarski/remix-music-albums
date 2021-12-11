import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { keyframes, styled } from "@stitches/react";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "white",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "$white11",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",

  "&[data-disabled]": {
    color: "$brand7",
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
      color: "$white11",
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
  fill: "white",
});

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
