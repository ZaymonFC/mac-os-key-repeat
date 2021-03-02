import {
  Box,
  Code,
  Container,
  Divider,
  Heading,
  Link,
  Slider,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import Head from "next/head";
import {
  Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Form = () => {
  const initialDelay = 12;
  const initialRepeat = 2;
  let [delay, setDelay] = useState(initialDelay);
  let [repeat, setRepeat] = useState(initialRepeat);
  let [isHolding, setIsHolding] = useState(null);
  let [buffer, setBuffer] = useState(undefined);
  let [counter, setCounter] = useState(0);

  const onKeyDown = (event) => {
    if (isHolding) return; // Don't set the initial state again for OS key repeats

    let key = event.key;
    setIsHolding([true, key]);
    setBuffer(key);
  };

  const onKeyUp = () => {
    setIsHolding(null);
    setBuffer("");
    setCounter(0);
  };

  const doTheThing = useCallback(() => {
    if (!isHolding) {
      return;
    }

    let [d, r] = [delay, repeat];

    if (counter > d && (counter - d) % r == 0) {
      setBuffer((buffer += isHolding[1]));
    }

    setCounter(counter + 1);
  }, [isHolding, delay, repeat, counter, setCounter, buffer, setBuffer]);

  useEffect(() => {
    const t = setInterval(doTheThing, 15);
    return () => clearInterval(t);
  });

  return (
    <>
      <Box w={(128, 256, 512)}>
        <Text>Initial delay: {delay * 15} ms</Text>
        <Slider
          aria-label="slider-ex-1"
          onChange={setDelay}
          defaultValue={initialDelay}
          min={1}
          max={40}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Box w={(128, 256, 512)}>
        <Text>Key repeat speed: {repeat * 15} ms</Text>
        <Slider
          aria-label="slider-ex-1"
          onChange={setRepeat}
          defaultValue={initialRepeat}
          min={1}
          max={20}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Textarea
        mt={8}
        mb={8}
        value={buffer}
        placeholder="Press and hold a key in me. (Implemented in Browser)"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      ></Textarea>

      <VStack spacing={4} mb={8} align="stretch">
        <Text>
          Copy these commands into your terminal to set the chosen key repeat
          timings:
        </Text>
        <Box>
          <Code>defaults write -g InitialKeyRepeat -int {delay}</Code>
        </Box>
        <Box>
          <Code>defaults write -g KeyRepeat -int {repeat}</Code>
        </Box>
      </VStack>
      <VStack spacing={4} align="stretch">
        <Text>
          Copy this command to disable <em>press and hold</em> for special
          characters:
        </Text>
        <Box>
          <Code>defaults write -g ApplePressAndHoldEnabled -bool false</Code>
        </Box>
      </VStack>
    </>
  );
};

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
    </VStack>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Mac OS Key-Repeat</title>
      </Head>
      <Container p={16}>
        <Heading mb={2} as="h1">
          Mac OS Key-Repeat Tester
        </Heading>
        <Text mb={2}>
          Tune key-repeat preferences without restarting or logging out of your
          computer... <em>more than once</em> 😅
        </Text>
        <Divider mb={8}></Divider>
        <Form></Form>

        <About></About>
      </Container>
    </>
  );
}
