import { useState } from "react";
import { IconButton } from "./Buttons";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { HStack } from "@chakra-ui/react";
import { Text } from "./Typography";

const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <IconButton
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      style={{ userSelect: "none" }}
    >
      <HStack spacing={1}>
        {copied ? <CheckIcon /> : <CopyIcon />}
        <Text>{copied ? "Copied" : "Copy"}</Text>
      </HStack>
    </IconButton>
  );
};

export default CopyButton;
