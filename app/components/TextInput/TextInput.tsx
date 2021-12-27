import { styled } from "~/styles/stitches.config";

export const TextInput = styled("input", {
  display: "block",
  border: "$border1White3",
  width: "100%",
  font: "inherit",
  lineHeight: 1,
  height: "calc(1ch + 1.5em)",
  padding: "0 $sm",
  backgroundColor: "$white1",
  color: "$foreground",
});
