import { Container, Divider } from "@chakra-ui/react";
import { Heading, Text } from "../components/Typography";
import Head from "next/head";
import KeyRepeat from "../components/KeyRepeat";
import About from "../components/About";
import { styled } from "../Stitches.config";
import { VSpacer } from "../components/Spacers";

const Page = styled("div", {
  backgroundColor: "$background",
  color: "white",
  height: "100vh",
  fontSize: 18,
});

const Header = () => (
  <>
    <Heading size="xl">Mac OS Key-Repeat Tester</Heading>
    <Text>
      Tune key-repeat preferences without restarting or logging out of your
      computer... <em>more than once</em> 😅
    </Text>

    <VSpacer size="md" />
    <Divider />
  </>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Mac OS Key-Repeat</title>
      </Head>
      <Page>
        <Container>
          <VSpacer size="lg" />
          <Header />
          <VSpacer size="xl" />
          <KeyRepeat />

          <About></About>
        </Container>
      </Page>
    </>
  );
}
