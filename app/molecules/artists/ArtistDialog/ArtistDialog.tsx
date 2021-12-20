import { ReactElement, ReactNode, useState } from "react";
import { useNavigate } from "remix";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { ArtistDetails } from "~/molecules/artists";
import { routes } from "~/utils/routes";
import { ArtistTabs } from "./ArtistTabs/ArtistTabs";

type Props = {
  children: ReactNode;
};

export const ArtistDialog = ({ children }: Props): ReactElement => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  return (
    <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={handleCloseClick} />
          <Flex direction="row">
            <ArtistDetails />
            <ArtistTabs>{children}</ArtistTabs>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
