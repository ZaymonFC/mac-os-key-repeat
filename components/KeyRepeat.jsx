import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import useKeyRepeat from "../hooks/useKeyRepeat";
import { pure } from "../lib/utils";
import { styled } from "../Stitches.config";
import { VSpacer } from "./Spacers";
import { Code, Text } from "./Typography";
import { UpdateIcon, LapTimerIcon, KeyboardIcon } from "@radix-ui/react-icons";
import { AnimatedNumber } from "./AnimatedNumber";

const KeyRepeatInput = styled("textarea", {
  fontFamily: "$mono",
  color: "$typeHighlight",

  width: "100%",
  padding: "$4",

  backgroundColor: "rgba(0, 0, 0, 0.0)",

  borderColor: "$orange",
  borderStyle: "solid",
  borderWidth: "$1",

  "&::placeholder": {
    opacity: "0.8",
    color: "$type",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 1px #ffaa48",
  },
});

const INITIAL_DELAY = 12;
const INITIAL_REPEAT = 2;

const delayAtom = atom(INITIAL_DELAY);
const repeatAtom = atom(INITIAL_REPEAT);
const autoClearAtom = atom(true);

const MillisecondSlider = ({ valueAtom, icon, label }) => {
  const [value, setValue] = useAtom(valueAtom);

  return (
    <Box maxWidth={300}>
      <Stack direction="row" alignItems="center">
        {icon}
        <Text>
          {label}: {value * 15} ms
        </Text>
      </Stack>
      <Slider onChange={setValue} value={value} min={1} max={20}>
        <SliderTrack bg="whiteAlpha.500">
          <SliderFilledTrack bg="white" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

const BufferToggle = () => {
  const [autoClear, setAutoClear] = useAtom(autoClearAtom);

  return (
    <Box maxWidth={300}>
      <Stack direction="row" alignItems="center">
        <KeyboardIcon />
        <Text>Typing mode</Text>
        <Switch
          isChecked={!autoClear}
          onChange={(e) => setAutoClear((a) => !a)}
          size="sm"
          colorScheme="yellow"
          pt={0.5}
        />
      </Stack>
    </Box>
  );
};

const KeyRepeatControls = () => (
  <>
    <MillisecondSlider
      valueAtom={delayAtom}
      icon={<LapTimerIcon />}
      label="Initial delay"
    />
    <MillisecondSlider
      valueAtom={repeatAtom}
      icon={<UpdateIcon />}
      label="Key repeat interval"
    />
    <BufferToggle />
  </>
);

const delayMsAtom = atom((get) => get(delayAtom) * 15);
const repeatMsAtom = atom((get) => get(repeatAtom) * 15);

const KeyRepeat = () => {
  const { down, up, buffer } = useKeyRepeat(
    delayMsAtom,
    repeatMsAtom,
    autoClearAtom,
  );

  return (
    <KeyRepeatInput
      placeholder="Press and hold a key (Implemented in Browser)"
      value={buffer}
      onKeyDown={down}
      onKeyUp={up}
      onBlur={up}
      onChange={pure(null)}
    />
  );
};

const Commands = () => {
  const [delay] = useAtom(delayAtom);
  const [repeat] = useAtom(repeatAtom);

  return (
    <div>
      <VStack spacing={4} align="stretch">
        <Text>
          These <em>terminal commands</em> let you set{" "}
          <strong>key-repeat</strong> values below the minimum available in{" "}
          <em>system preferences</em>. Copy them into your terminal to set the
          chosen key repeat timings:
        </Text>
        <Box>
          <Code>
            defaults write -g InitialKeyRepeat -int{" "}
            <AnimatedNumber value={delay} />
          </Code>
        </Box>
        <Box>
          <Code>
            defaults write -g KeyRepeat -int <AnimatedNumber value={repeat} />
          </Code>
        </Box>

        <VSpacer size="xs" />
        <Text>
          Copy this command to disable <em>press and hold</em> for special
          characters:
        </Text>
        <Box>
          <Code>defaults write -g ApplePressAndHoldEnabled -bool false</Code>
        </Box>
        <VSpacer size="xs" />
        <Text>
          <em>Note:</em> You must log out or restart for these changes to take
          effect.
        </Text>
      </VStack>
    </div>
  );
};

const KeyRepeatApp = () => (
  <>
    <KeyRepeatControls />
    <VSpacer size="lg" />
    <KeyRepeat />
    <VSpacer size="lg" />
    <Commands />
  </>
);

export default KeyRepeatApp;
