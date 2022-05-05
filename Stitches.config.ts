import { createStitches } from "@stitches/react";

const shadows = {
  1: `
      0.2px 0.2px 0.3px hsl($colors$shadowColor / 0.67),
      0.8px 0.9px 1.2px -3.3px hsl($colors$shadowColor / 0.51)
    `,

  2: `
      0.2px 0.2px 0.3px hsl($colors$shadowColor / 0.93),
      4px 4.5px 6.1px -3.3px hsl($colors$shadowColor / 0.71)
      `,

  3: `
      0.2px 0.2px 0.3px hsl($colors$shadowColor / 0.87),
      2.1px 2.3px 3.1px -1.1px hsl($colors$shadowColor / 0.76),
      7.2px 7.9px 10.7px -2.2px hsl($colors$shadowColor / 0.66),
      20px 22px 29.9px -3.3px hsl($colors$shadowColor / 0.55)
      `,
};

export const { styled, css, getCssText } = createStitches({
  theme: {
    colors: {
      background: "rgb(20, 18, 32)",
      gray500: "hsl(206,10%,76%)",
      blue500: "hsl(206,100%,50%)",
      purple500: "hsl(252,78%,60%)",
      green500: "hsl(148,60%,60%)",
      red500: "hsl(352,100%,62%)",
      orange: "#ffaa48",
      shadowColor: "254deg 38% 3%",
    },
    space: {
      1: "1px",
      2: "2px",
      3: "4px",
      4: "8px",
      5: "16px",
      6: "24px",
      7: "48px",
      8: "64px",
    },
    fontSizes: {
      1: "0.8em",
      2: "1em",
      3: "1.2em",
      4: "1.4em",
      5: "1.6em",
      6: "2.2em",
      7: "4.5em",
    },
    fonts: {
      mono: "Söhne Mono, menlo, monospace",
      serif: "Georgia, 'Times New Roman', Times, serif",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {
      1: "1px",
      2: "2px",
      3: "4px",
    },
    borderStyles: {},
    radii: {
      1: "1px",
      2: "2px",
      3: "4px",
      4: "8px",
      5: "12px",
      6: "16px",
      7: "24px",
    },
    shadows: shadows,
    zIndices: {},
    transitions: {},
  },
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
  },
  utils: {
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
