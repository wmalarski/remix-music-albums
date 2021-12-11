import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { Link, useSubmit } from "remix";
import { User } from "~/api/auth.server";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
} from "~/components";
import { routes } from "~/utils/routes";

type ProfileDropdownProps = {
  user: User;
};

export const ProfileDropdown = ({
  user,
}: ProfileDropdownProps): ReactElement => {
  const submit = useSubmit();

  const handleLogoutClick = () =>
    submit(null, { action: routes.logout, method: "post" });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="Customise options">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <DropdownMenuLabel>
          {`Signed in as ${user.displayName}`}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={routes.visits}>Your visits</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={routes.reviews}>Your reviews</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={routes.newArtist}>New artist</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>Logout</DropdownMenuItem>
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
