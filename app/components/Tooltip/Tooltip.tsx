import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "@stitches/react";
import { ReactElement, ReactNode } from "react";

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

type TooltipTextProps = {
  children: ReactNode;
  text: string;
  asChild?: boolean;
};

export const TooltipText = ({
  children,
  text,
  asChild,
}: TooltipTextProps): ReactElement => (
  <Tooltip>
    <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
    <TooltipContent sideOffset={5}>
      {text}
      <TooltipArrow />
    </TooltipContent>
  </Tooltip>
);
