import { ReactElement } from "react";
import { User } from "~/api/auth.server";
import { Button } from "~/components";
import { routes } from "~/utils/routes";
import * as Styles from "./Header.styles";
import { Logo } from "./Logo/Logo";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";

type HeaderProps = {
  user?: User | null;
};

export const Header = ({ user }: HeaderProps): ReactElement => {
  return (
    <Styles.Header>
      <Styles.Content>
        <Styles.HomeLink to={routes.albums} title="Remix">
          <Logo />
        </Styles.HomeLink>
        <nav aria-label="Main navigation">
          <Styles.Ul>
            {user ? (
              <ProfileDropdown user={user} />
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
