import { ReactElement } from "react";
import { Inset } from "~/components";
import * as Styles from "./Footer.styles";

export const Footer = (): ReactElement => {
  return (
    <Styles.Footer>
      <Inset spaceY="md">
        <Styles.Content>
          <p>&copy; You!</p>
        </Styles.Content>
      </Inset>
    </Styles.Footer>
  );
};
