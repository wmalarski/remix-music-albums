import { ReactElement, ReactNode } from "react";
import * as Styles from "./Tooltip.styles";

type Props = {
  children: ReactNode;
  text: string;
  asChild?: boolean;
};

export const TooltipText = ({
  children,
  text,
  asChild,
}: Props): ReactElement => (
  <Styles.Tooltip>
    <Styles.TooltipTrigger asChild={asChild}>{children}</Styles.TooltipTrigger>
    <Styles.TooltipContent sideOffset={5}>
      {text}
      <Styles.TooltipArrow />
    </Styles.TooltipContent>
  </Styles.Tooltip>
);

export { TooltipProvider } from "./Tooltip.styles";
