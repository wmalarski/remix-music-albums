import { ReactElement, ReactNode, useState } from "react";
import { useNavigate } from "remix";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { routes } from "~/utils/routes";
import { AlbumDetails } from "./AlbumDetails/AlbumDetails";
import { AlbumTabs } from "./AlbumTabs/AlbumTabs";

type Props = {
  children: ReactNode;
};

export const AlbumDialog = ({ children }: Props): ReactElement => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  return (
    <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={handleCloseClick} />
          <Flex direction="row" gap={2}>
            <AlbumDetails />
            <AlbumTabs>{children}</AlbumTabs>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
