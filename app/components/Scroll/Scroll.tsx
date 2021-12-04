import { ComponentProps, ForwardedRef, forwardRef, ReactElement } from "react";
import * as Styles from "./Scroll.styles";

type ScrollProps = ComponentProps<typeof Styles.StyledScrollArea>;

export const Scroll = forwardRef(
  (
    { children, ...props }: ScrollProps,
    ref?: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    return (
      <Styles.StyledScrollArea {...props}>
        <Styles.StyledViewport ref={ref}>{children}</Styles.StyledViewport>
        <Styles.StyledScrollbar orientation="horizontal">
          <Styles.StyledThumb />
        </Styles.StyledScrollbar>
        <Styles.StyledScrollbar orientation="vertical">
          <Styles.StyledThumb />
        </Styles.StyledScrollbar>
        <Styles.Corner />
      </Styles.StyledScrollArea>
    );
  }
);

Scroll.displayName = "Scroll";
