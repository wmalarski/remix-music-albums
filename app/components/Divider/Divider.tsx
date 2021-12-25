import * as Separator from "@radix-ui/react-separator";
import { styled } from "~/styles/stitches.config";

export const Divider = styled(Separator.Root, {
  backgroundColor: "$white3",

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: "100%",
        margin: "0 $sm",
      },
      vertical: {
        height: "100%",
        width: 1,
        margin: "$sm 0",
      },
    },
  },

  defaultVariants: {
    orientation: "horizontal",
  },
});
