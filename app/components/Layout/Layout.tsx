import { ReactElement, ReactNode } from "react";
import { Container } from "~/components";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import * as Styles from "./Layout.styles";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <Styles.App>
      <Header />
      <Styles.Main>
        <Container>{children}</Container>
      </Styles.Main>
      <Footer />
    </Styles.App>
  );
};
