import { ReactElement } from "react";
import { StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import { Logo } from "../Logo/Logo";
import * as Styles from "./Header.styles";

export const Header = (): ReactElement => {
  return (
    <Styles.Header>
      <Styles.Content>
        <Styles.HomeLink to={routes.home} title="Remix">
          <Logo />
        </Styles.HomeLink>
        <nav aria-label="Main navigation">
          <Styles.Ul>
            <Styles.Li>
              <StyledLink to={routes.home}>Home</StyledLink>
            </Styles.Li>
            <Styles.Li>
              <StyledLink to={routes.albums}>Albums</StyledLink>
            </Styles.Li>
            <Styles.Li>
              <StyledLink to={routes.newArtist}>New Artist</StyledLink>
            </Styles.Li>
            <Styles.Li>
              <StyledLink to={routes.reviews}>Reviews</StyledLink>
            </Styles.Li>
            <Styles.Li>
              <StyledLink to={routes.visits}>Visits</StyledLink>
            </Styles.Li>
          </Styles.Ul>
        </nav>
      </Styles.Content>
    </Styles.Header>
  );
};
