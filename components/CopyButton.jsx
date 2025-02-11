import { useState } from "react";
import { IconButton } from "./Typography";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

const CopyButton = ({ value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <IconButton onClick={handleCopy}>
            {copied ? <CheckIcon /> : <CopyIcon />}
        </IconButton>
    );
};

export default CopyButton; 