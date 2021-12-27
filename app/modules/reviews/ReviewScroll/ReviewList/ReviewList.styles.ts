import { Scroll } from "~/components";
import { styled } from "~/styles/stitches.config";

export const StyledScroll = styled(Scroll, {
  height: "60vh",
  width: "$cover",

  "@bp2": {
    width: "calc(2 * $cover)",
  },
});
