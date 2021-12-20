import { ReactElement, ReactNode } from "react";
import * as Styles from "./Layout.styles";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props): ReactElement => {
  return <Styles.Root direction="column">{children}</Styles.Root>;
};
