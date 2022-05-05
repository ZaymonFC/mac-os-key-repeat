import { Box, Link, VStack } from "@chakra-ui/react";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  return (
    <VStack spacing={4} mt={16}>
      <Box>
        <FontAwesomeIcon icon={faGithub} />
        <Link href="https://github.com/ZaymonFC/mac-os-key-repeat">
          {" "}
          View the source on GitHub
        </Link>
      </Box>
      <Box>
        <FontAwesomeIcon icon={faTwitter} />
        <Link href="https://twitter.com/ZaymonTheUnwise">
          {" "}
          Follow me on twitter @ZaymonTheUnwise
        </Link>
      </Box>
      <Box>
        <Link href="https://ko-fi.com/zaymon_antonio">
          Find this useful? Buy me a coffee on Ko-Fi ☕️ ✌️
        </Link>
      </Box>
    </VStack>
  );
};

export default About;
