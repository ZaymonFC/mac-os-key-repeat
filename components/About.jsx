import { VStack } from "@chakra-ui/react";
import { Link } from "./Typography";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  return (
    <VStack spacing={4} mt={16}>
      <div>
        <FontAwesomeIcon icon={faGithub} />
        <Link href="https://github.com/ZaymonFC/mac-os-key-repeat">
          {" "}
          View the source on GitHub
        </Link>
      </div>
      <div>
        <FontAwesomeIcon icon={faTwitter} />
        <Link href="https://twitter.com/ZaymonAntonio">
          {" "}
          Follow me on twitter @ZaymonAntonio
        </Link>
      </div>
      <div>
        <Link href="https://www.zaymon.dev">About me</Link>
      </div>
    </VStack>
  );
};

export default About;
