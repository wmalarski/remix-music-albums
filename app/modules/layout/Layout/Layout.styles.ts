import { styled } from "~/styles/stitches.config";
import { Flex } from "../../../components/Flex/Flex";

export const Root = styled(Flex, {
  minHeight: "calc(100vh - env(safe-area-inset-bottom))",
  "& > *": {
    width: "100%",
  },
});
