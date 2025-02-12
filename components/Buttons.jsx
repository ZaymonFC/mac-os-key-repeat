import { styled } from "../Stitches.config";

export const IconButton = styled("button", {
  paddingInline: "$3",
  paddingBlock: "$1",

  fontFamily: "$mono",
  fontSize: "$2",

  color: "$orange",
  backgroundColor: "transparent",

  borderColor: "$orange",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: "$3",

  "&:hover": { backgroundColor: "$orange", color: "white" },
  "&:active": { transform: "scale(0.98)" },
});
