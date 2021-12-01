import * as Separator from "@radix-ui/react-separator";
import { styled } from "~/styles/stitches.config";

export const Divider = styled(Separator.Root, {
  backgroundColor: "$foreground",

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: "100%",
        margin: "0 $space2",
      },
      vertical: {
        height: "100%",
        width: 1,
        margin: "$space2 0",
      },
    },
  },

  defaultVariants: {
    orientation: "horizontal",
  },
});
