import { Grid } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Container = styled(Grid, {
  gridTemplateColumns: "repeat(auto-fit, 250px)",
  justifyContent: "center",
  margin: "0 auto",
});
