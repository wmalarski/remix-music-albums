import { ComponentProps, ReactElement } from "react";
import * as Styles from "./Scroll.styles";

type ScrollProps = ComponentProps<typeof Styles.StyledScrollArea>;

export const Scroll = ({ children, ...props }: ScrollProps): ReactElement => {
  return (
    <Styles.StyledScrollArea {...props}>
      <Styles.StyledViewport>{children}</Styles.StyledViewport>
      <Styles.StyledScrollbar orientation="horizontal">
        <Styles.StyledThumb />
      </Styles.StyledScrollbar>
      <Styles.StyledScrollbar orientation="vertical">
        <Styles.StyledThumb />
      </Styles.StyledScrollbar>
      <Styles.Corner />
    </Styles.StyledScrollArea>
  );
};
