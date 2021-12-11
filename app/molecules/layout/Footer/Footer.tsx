import { ReactElement } from "react";
import * as Styles from "./Footer.styles";

export const Footer = (): ReactElement => {
  return (
    <Styles.Footer>
      <Styles.Content>
        <p>&copy; You!</p>
      </Styles.Content>
    </Styles.Footer>
  );
};
