import { IconButton } from "./Typography";
import { CopyIcon } from "@radix-ui/react-icons";

const CopyButton = ({ value }) => {
    return (
        <IconButton onClick={() => navigator.clipboard.writeText(value)}>
            <CopyIcon />
        </IconButton>
    );
};

export default CopyButton; 