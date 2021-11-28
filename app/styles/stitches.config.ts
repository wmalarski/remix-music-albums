import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray400: "gainsboro",
      gray500: "lightgray",
      foreground: "hsl(0, 0%, 7%)",
      background: "hsl(0, 0%, 100%)",
      links: "hsl(213, 100%, 52%)",
      linksHover: "hsl(213, 100%, 43%)",
      border: "hsl(0, 0%, 82%)",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
  },
});

export const darkTheme = createTheme({
  colors: {
    foreground: "hsl(0, 0%, 100%)",
    background: "hsl(0, 0%, 7%)",
    links: "hsl(213, 100%, 73%)",
    linksHover: "hsl(213, 100%, 80%)",
    border: "hsl(0, 0%, 25%)",
  },
});

export const globalStyles = globalCss({
  html: {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
    backgroundColor: "$background",
    color: "$foreground",
  },
  body: {
    padding: 0,
    margin: 0,
    backgroundColor: "$background",
    color: "$foreground",
    fontFamily:
      '-apple-system, "Segoe UI", Helvetica Neue, Helvetica, Roboto, Arial, sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
  },
  "*, *::before, *::after": {
    boxSizing: "inherit",
  },
  ":-moz-focusring": {
    outline: "auto",
  },
  ":focus": {
    outline: "$links solid 2px",
    outlineOffset: "2px",
  },
});
