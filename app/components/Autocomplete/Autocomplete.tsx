import { styled } from "~/styles/stitches.config";
import { Flex } from "../Flex/Flex";
import * as Primitives from "./Autocomplete.primitives";

export const Autocomplete = Primitives.Autocomplete;

export const AutocompleteContent = styled(Flex, {
  position: "relative",
});

export const AutocompleteTrigger = styled(Primitives.AutocompleteTrigger, {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  height: "calc(1ch + 1.5em)",
});

export const AutocompleteMenu = styled(Primitives.AutocompleteMenu, {
  position: "absolute",
  top: 35,
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
  maxHeight: "80vh",
  width: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: "$white2",
  zIndex: "$header",
  boxShadow: "$regular",
  "&[data-isOpen=true]": {
    padding: "$sm",
  },
});

export const AutocompleteInput = styled(Primitives.AutocompleteInput, {
  display: "block",
  border: "$border1White3",
  borderRadius: "$md 0 0 $md",
  width: "100%",
  font: "inherit",
  lineHeight: 1,
  padding: "0 $sm",
  backgroundColor: "$white1",
  color: "$foreground",
});

export const AutocompleteToggleButton = styled(
  Primitives.AutocompleteToggleButton,
  {
    all: "unset",
    cursor: "pointer",
    border: "$border1White3",
    borderLeft: "unset",
    borderRadius: "0 $md $md 0",
    width: 35,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "$white9",
    backgroundColor: "$white1",
    boxShadow: "$small",
    "&:hover": { backgroundColor: "$white3", color: "$brand8" },
    "&:focus": { outline: "$border2Brand8" },
  }
);

export const AutocompleteItem = styled(Primitives.AutocompleteItem, {
  position: "relative",
  fontSize: "$md",
  borderRadius: "$md",
  display: "flex",
  alignItems: "center",
  padding: "$xs $xs $xs $md",
  userSelect: "none",

  "&[data-disabled]": {
    pointerEvents: "none",
  },
  "&:hover": {
    backgroundColor: "$white1",
  },
  "&:focus": {
    backgroundColor: "$white1",
  },
  "&[data-isSelected]": {
    backgroundColor: "$white1",
  },
});

export const AutocompleteLabel = styled(Primitives.AutocompleteLabel, {
  padding: "$xs",
  fontSize: "$sm",
  color: "$white8",
});
