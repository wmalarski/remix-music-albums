import React, {
  cloneElement,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import { getValidChildren } from "../utils/getValidChildren";
import * as Styles from "./Flex.styles";

type Props = ComponentProps<typeof Styles.Container> & {
  divider?: ReactElement;
  children: ReactNode;
};

export const Flex = forwardRef<HTMLDivElement, Props>(
  (
    { divider, children, ...props }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const hasDivider = !!divider;

    const validChildren = getValidChildren(children);

    const clones = !hasDivider
      ? validChildren
      : validChildren.map((child, index) => (
          <Fragment key={typeof child.key !== "undefined" ? child.key : index}>
            {child}
            {index + 1 !== validChildren.length && cloneElement(divider)}
          </Fragment>
        ));

    return (
      <Styles.Container {...props} ref={ref}>
        {clones}
      </Styles.Container>
    );
  }
);

Flex.displayName = "Flex";
