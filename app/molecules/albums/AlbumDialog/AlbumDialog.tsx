import { ReactElement, ReactNode } from "react";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { useIsOpen } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { AlbumDetails } from "./AlbumDetails/AlbumDetails";
import { AlbumTabs } from "./AlbumTabs/AlbumTabs";

type Props = {
  children: ReactNode;
};

export const AlbumDialog = ({ children }: Props): ReactElement => {
  const { isOpen, onClose, onOpen } = useIsOpen(routes.albums);

  return (
    <DialogRoot open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={onClose} />
          <Flex direction="row" gap={2}>
            <AlbumDetails />
            <AlbumTabs>{children}</AlbumTabs>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
