import { ReactElement, ReactNode, useState } from "react";
import { useNavigate } from "remix";
import {
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../../components/Dialog/Dialog";
import { Flex } from "../../../components/Flex/Flex";

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
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);
  const onOpen = () => navigate(to);

  return (
    <DialogRoot open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <Flex direction="column" gap="md">
          <DialogHeader onClose={onClose}>{header}</DialogHeader>
          {children}
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
