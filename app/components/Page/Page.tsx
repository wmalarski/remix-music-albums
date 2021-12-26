import { styled } from "~/styles/stitches.config";
import { Container } from "../Container/Container";

export const Page = styled(Container, {
  "--gap": "1rem",
  "--space": "2rem",
  gap: "var(--gap)",
  paddingTop: "var(--space)",
  paddingBottom: "var(--space)",
  "@media print, screen and (min-width: 640px)": {
    "--gap": "2rem",
    gridAutoRows: "unset",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media screen and (min-width: 1024px)": {
    "--gap": "4rem",
  },
});
