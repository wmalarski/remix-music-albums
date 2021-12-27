import { Grid } from "~/components";
import { styled } from "~/styles/stitches.config";

export const Container = styled(Grid, {
  gridTemplateColumns: "repeat(auto-fit, $cover)",
  justifyContent: "center",
  margin: "0 auto",
});
