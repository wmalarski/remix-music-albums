import { ReactElement, ReactNode } from "react";
import * as Styles from "./Dialog.styles";

type DialogProps = {
  children?: ReactNode;
};

export const Dialog = ({ children }: DialogProps): ReactElement => {
  return (
    <Styles.Root>
      <Styles.Overlay />
      <Styles.Content>{children}</Styles.Content>
    </Styles.Root>
  );
};

Dialog.Close = Styles.Close;
