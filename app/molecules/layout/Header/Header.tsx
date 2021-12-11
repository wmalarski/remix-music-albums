import { ReactElement } from "react";
import { Form } from "remix";
import { Button, StyledLink } from "~/components";
import { routes } from "~/utils/routes";
import { Logo } from "../Logo/Logo";
import * as Styles from "./Header.styles";

type HeaderProps = {
  isAuthorized: boolean;
};

export const Header = ({ isAuthorized }: HeaderProps): ReactElement => {
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
            {isAuthorized ? (
              <Form action={routes.logout} method="post">
                <Button>Logout</Button>
              </Form>
            ) : (
              <form action={routes.auth} method="post">
                <Button>Login with Auth0</Button>
              </form>
            )}
          </Styles.Ul>
        </nav>
      </Styles.Content>
    </Styles.Header>
  );
};
