import { ReactElement, ReactNode } from "react";
import { useIsOpen } from "~/utils/remix";
import { DialogContent, DialogHeader, DialogRoot } from "../Dialog/Dialog";
import { Flex } from "../Flex/Flex";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  to: string;
};

export const NavigationDialog = ({
  children,
  header,
  to,
}: Props): ReactElement => {
  const { isOpen, onClose, onOpen } = useIsOpen(to);

  return (
    <DialogRoot open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={onClose}>{header}</DialogHeader>
          {children}
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
