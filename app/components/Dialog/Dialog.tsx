import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { styled } from "~/styles/stitches.config";
import { Flex } from "../Flex/Flex";
import { IconButton } from "../IconButton/IconButton";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$white1A9",
  position: "fixed",
  inset: 0,
});

export const DialogRoot = ({
  children,
  ...props
}: DialogPrimitive.DialogProps): ReactElement => (
  <DialogPrimitive.Root {...props}>
    <StyledOverlay />
    {children}
  </DialogPrimitive.Root>
);

export const DialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$white2",
  borderRadius: "$md",
  boxShadow: "$large",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "85vh",
  padding: "$lg",
  "&:focus": { outline: "none" },
});

export const DialogTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: "$regular",
  color: "$heading",
  fontSize: "$lg",
});

export const DialogDescription = styled(DialogPrimitive.Description, {
  margin: "$sm 0 $lg",
  fontSize: "$md",
  lineHeight: 1.5,
});

export const DialogHeader = ({
  onClose,
  ...props
}: DialogPrimitive.DialogTitleProps & {
  onClose: DialogPrimitive.DialogCloseProps["onClick"];
}): ReactElement => (
  <Flex
    direction="row"
    justifyContent="spaceBetween"
    alignItems="start"
    gap="md"
  >
    <DialogTitle {...props} />
    <DialogClose onClick={onClose} asChild>
      <IconButton onClick={onClose} aria-label="Close dialog">
        <AccessibleIcon label="Close">
          <Cross1Icon />
        </AccessibleIcon>
      </IconButton>
    </DialogClose>
  </Flex>
);

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
