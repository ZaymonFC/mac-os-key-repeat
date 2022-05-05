import {
  Box,
  Code,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const KeyRepeat = () => {
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
      <Box w={[128, 256, 512]}>
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
      <Box w={[128, 256, 512]}>
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
        placeholder="Press and hold a key (Implemented in Browser)"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      ></Textarea>

      <VStack spacing={4} mb={8} align="stretch">
        <Text>
          These <em>terminal commands</em> let you set{" "}
          <strong>key-repeat</strong> beyond the minimum available in{" "}
          <Code>system preferences</Code>.{" "}
        </Text>
        <Text>
          Copy them into your terminal to set the chosen key repeat timings:
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

export default KeyRepeat;
