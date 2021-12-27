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
      foreground: "hsl(0, 0%, 100%)",
      background: "hsl(0, 0%, 15%)",
      brand1: "hsl(0, 100%, 10%)",
      brand2: "hsl(0, 100%, 20%)",
      brand3: "hsl(0, 100%, 30%)",
      brand4: "hsl(0, 100%, 40%)",
      brand5: "hsl(0, 100%, 50%)",
      brand6: "hsl(0, 100%, 60%)",
      brand7: "hsl(0, 100%, 70%)",
      brand8: "hsl(0, 100%, 80%)",
      brand9: "hsl(0, 100%, 90%)",
      white1: "hsl(0, 0%, 10%)",
      white2: "hsl(0, 0%, 20%)",
      white3: "hsl(0, 0%, 30%)",
      white4: "hsl(0, 0%, 40%)",
      white5: "hsl(0, 0%, 50%)",
      white6: "hsl(0, 0%, 60%)",
      white7: "hsl(0, 0%, 70%)",
      white8: "hsl(0, 0%, 85%)",
      white9: "hsl(0, 0%, 90%)",
      white1A9: "hsl(0, 0%, 10%, 0.9)",
      border1White3: "1px solid $white3",
      border2Brand8: "2px solid $brand8",
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
      sm: 3,
      md: "6px",
    },
    sizes: {
      scroll: "10px",
      cover: "250px",
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    space: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    zIndices: {
      header: 1000,
    },
    shadows: {
      small: "0 2px 10px $white1A9",
      regular:
        "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
      large:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    listRow: (value: string) => {
      const [size, start] = value.split(" ");
      return {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        transform: `translateY(${start}px)`,
        height: `${size}px`,
      };
    },
    listContainer: (totalSize: number) => ({
      height: `${totalSize}px`,
      width: "100%",
      position: "relative",
    }),
  },
});

export const darkTheme = createTheme({});

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
    outline: "$brand8 solid 2px",
    outlineOffset: "2px",
  },
});
