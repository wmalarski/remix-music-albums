import { styled } from "~/styles/stitches.config";
import { Container } from "../../../components/Container/Container";
import { Flex } from "../../../components/Flex/Flex";

export const Content = styled(Container, {
  flex: "1 1 100%",
});

export const Root = styled(Flex, {
  minHeight: "calc(100vh - env(safe-area-inset-bottom))",
  "& > *": {
    width: "100%",
  },
});
