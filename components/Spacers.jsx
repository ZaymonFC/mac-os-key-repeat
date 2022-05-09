import { styled } from "../Stitches.config";

export const VSpacer = styled("div", {
  margin: 0,
  padding: 0,
  variants: {
    size: {
      xs: { height: 4 },
      sm: { height: 8 },
      md: { height: 16 },
      lg: { height: 24 },
      xl: { height: 32 },
      xxl: { height: 48 },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
