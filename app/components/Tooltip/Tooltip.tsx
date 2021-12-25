import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { keyframes, styled } from "@stitches/react";
import { ReactElement, ReactNode } from "react";

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

export const TooltipContent = styled(TooltipPrimitive.Content, {
  borderRadius: 4,
  padding: "10px 15px",
  fontSize: 15,
  lineHeight: 1,
  color: "$white9",
  backgroundColor: "$white1",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
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
