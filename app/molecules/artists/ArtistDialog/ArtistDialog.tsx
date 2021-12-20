import { ReactElement, ReactNode } from "react";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { ArtistDetails } from "~/molecules/artists";
import { useIsOpen } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { ArtistTabs } from "./ArtistTabs/ArtistTabs";

type Props = {
  children: ReactNode;
};

export const ArtistDialog = ({ children }: Props): ReactElement => {
  const { isOpen, onClose, onOpen } = useIsOpen(routes.albums);

  return (
    <DialogRoot open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={onClose} />
          <Flex direction="row">
            <ArtistDetails />
            <ArtistTabs>{children}</ArtistTabs>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
