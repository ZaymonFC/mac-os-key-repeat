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
        <IconButton onClick={handleCopy} aria-label={copied ? "Copied" : "Copy to clipboard"}>
            <HStack spacing={1}>
                {copied ? <CheckIcon width={20} height={20} /> : <CopyIcon width={20} height={20} />}
                <Text>{copied ? "Copied!" : "Copy"}</Text>
            </HStack>
        </IconButton>
    );
};

export default CopyButton; 