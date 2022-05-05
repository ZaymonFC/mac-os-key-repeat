import { styled } from "../Stitches.config";

const TextVariants = { bold: { true: { fontWeight: "bold" } } };

export const Heading = styled("div", {
  fontFamily: "EB Garamond",
  color: "$orange",
  fontWeight: 700,
  lineHeight: 1.5,
  variants: {
    size: {
      sm: { fontSize: "$3" },
      md: { fontSize: "$4" },
      lg: { fontSize: "$5" },
      xl: { fontSize: "$6" },
      hero: { fontSize: "$7" },
    },
  },
  defaultVariants: { size: "md" },
});

export const Text = styled("p", {
  fontFamily: "Iosevka SS05",
  fontSize: "$2",
  fontWeight: "normal",
  variants: {
    ...TextVariants,
  },
});

export const SubText = styled("p", {
  fontSize: "$1",
  variants: {
    ...TextVariants,
  },
});

export const Link = styled("a", {
  color: "white",
  "&:hover": {
    color: "$orange",
  },
  textDecoration: "underline",
  variants: {
    invert: { true: { color: "$orange", "&:hover": { color: "white" } } },
  },
});

export const SubLink = styled(Link, {
  fontSize: "$1",
});
