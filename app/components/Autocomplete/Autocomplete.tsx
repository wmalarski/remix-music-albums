import { styled } from "@stitches/react";

export const Autocomplete = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

export const AutocompleteTrigger = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginLeft: "5px",
});

export const AutocompleteContent = styled("ul", {
  maxHeight: "80vh",
  maxWidth: 300,
  overflowY: "scroll",
  backgroundColor: "$dialogBackground",
  listStyle: "none",
  position: "absolute",
  minWidth: 220,
  borderRadius: 6,
  padding: 5,
  zIndex: "$header",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

export const AutocompleteItem = styled("li", {
  fontSize: "$sm",
  lineHeight: 1,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",

  "&[data-disabled]": {
    pointerEvents: "none",
  },
  "&:focus": {
    backgroundColor: "$white9",
  },

  variants: {
    active: {
      true: { backgroundColor: "$background" },
    },
  },

  defaultVariants: {
    active: false,
  },
});

export const AutocompleteLabel = styled("p", {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
});
