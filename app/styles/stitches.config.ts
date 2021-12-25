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
      dialogBackground: "hsl(0, 0%, 20%)",
      background: "hsl(0, 0%, 15%)",
      border: "hsl(0, 0%, 25%)",
      overlay: "hsl(0, 0%, 10%, 0.9)",
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
      review: "40px",
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
      regular:
        "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
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

export const slideAnimation = css({
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': {
        animationName: keyframes({
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }),
      },
      '&[data-side="right"]': {
        animationName: keyframes({
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        }),
      },
      '&[data-side="bottom"]': {
        animationName: keyframes({
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }),
      },
      '&[data-side="left"]': {
        animationName: keyframes({
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        }),
      },
    },
  },
});
