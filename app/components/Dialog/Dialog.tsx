import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { keyframes, styled } from "~/styles/stitches.config";
import { Flex } from "../Flex/Flex";
import { IconButton } from "../IconButton/IconButton";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$white1A9",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
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
  backgroundColor: "$dialogBackground",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

export const DialogTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: "$heading",
  fontSize: 17,
});

export const DialogDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  fontSize: 15,
  lineHeight: 1.5,
});

export const DialogHeader = ({
  onClose,
  ...props
}: DialogPrimitive.DialogTitleProps & {
  onClose: DialogPrimitive.DialogCloseProps["onClick"];
}): ReactElement => (
  <Flex direction="row" justifyContent="spaceBetween" alignItems="center">
    <DialogTitle {...props} />
    <DialogClose onClick={onClose} asChild>
      <IconButton onClick={onClose} aria-label="Close dialog">
        <Cross1Icon />
      </IconButton>
    </DialogClose>
  </Flex>
);

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
