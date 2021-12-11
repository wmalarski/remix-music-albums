import { ReactElement, ReactNode } from "react";
import * as Styles from "./Layout.styles";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return <Styles.Root direction="column">{children}</Styles.Root>;
};
