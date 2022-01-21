import { Flex } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",
  gap: "$sm",
  flexDirection: "column",
  "@bp2": {
    flexDirection: "row",
  },
});

export const Wrapper = styled(Flex, {
  flexGrow: 1,
});
