import { Container, Divider, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import KeyRepeat from "../components/KeyRepeat";
import About from "../components/About";

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

        <KeyRepeat />

        <About></About>
      </Container>
    </>
  );
}
