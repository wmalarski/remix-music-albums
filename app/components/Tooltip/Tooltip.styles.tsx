import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "~/styles/stitches.config";

export const TooltipContent = styled(TooltipPrimitive.Content, {
  borderRadius: "$md",
  padding: "$sm $md",
  fontSize: "$md",
  lineHeight: 1,
  color: "$white9",
  backgroundColor: "$white1",
  boxShadow: "$large",
});

export const TooltipArrow = styled(TooltipPrimitive.Arrow, {
  fill: "$white1",
});

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
