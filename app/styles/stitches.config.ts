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
      foreground: "hsl(0, 0%, 7%)",
      background: "hsl(0, 0%, 100%)",
      dialogBackground: "hsl(0, 0%, 20%)",
      links: "hsl(213, 100%, 52%)",
      linksHover: "hsl(213, 100%, 43%)",
      border: "hsl(0, 0%, 82%)",
      overlay: "hsl(0, 0%, 7%, 0.2)",
      brand4: "hsl(0, 0%, 70%)",
      brand7: "hsl(0, 0%, 15%)",
      brand11: "hsl(0, 0%, 10%)",
      white4: "hsl(0, 100%, 70%)",
      white7: "hsl(0, 100%, 15%)",
      white11: "hsl(0, 100%, 10%)",
    },
    fontSizes: {
      xs: "8px",
      sm: "10px",
      md: "15px",
      lg: "20px",
      xl: "35px",
    },
    fontWeights: {
      thin: 100,
      regular: 400,
      bold: 700,
    },
    radii: {
      scroll: "10px",
    },
    sizes: {
      scroll: "10px",
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
    overlay: "hsl(0, 0%, 7%, 0.5)",
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
