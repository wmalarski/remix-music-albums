import { styled } from "~/styles/stitches.config";
import { Container } from "../Container/Container";

export const Page = styled(Container, {
  "--gap": "1rem",
  "--space": "2rem",
  gap: "var(--gap)",
  padding: "var(--space) 0",
  "@bp1": {
    "--gap": "2rem",
    gridAutoRows: "unset",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@bp2": {
    "--gap": "4rem",
  },
});
