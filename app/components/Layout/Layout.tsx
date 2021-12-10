import { ReactElement, ReactNode } from "react";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import * as Styles from "./Layout.styles";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return <Styles.Root direction="column">{children}</Styles.Root>;
};

export const LayoutContent = Styles.Content;

export const LayoutHeader = Header;

export const LayoutFooter = Footer;
