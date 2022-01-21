import { ReactElement } from "react";
import { Button, Inset } from "~/components";
import { User } from "~/services/auth.server";
import { routes } from "~/utils/routes";
import * as Styles from "./Header.styles";
import { Logo } from "./Logo/Logo";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";
import { Search } from "./Search/Search";

type Props = {
  user?: User | null;
};

export const Header = ({ user }: Props): ReactElement => {
  return (
    <Styles.Header>
      <Inset spaceY="md">
        <Styles.Content>
          <Styles.HomeLink to={routes.albums} title="Remix">
            <Logo />
          </Styles.HomeLink>
          <Search />
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
      </Inset>
    </Styles.Header>
  );
};
