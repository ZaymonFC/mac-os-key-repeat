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
  minHeight: "100vh",
  fontSize: 18,

  paddingBlock: "$6",
  paddingInline: "$4",
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

const Favicons = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff"></meta>
    <link rel="icon" href="/favicon.ico" />
  </>
);

export default function Home() {
  return (
    <>
      <Head>
        <Favicons />
        <title>Mac OS Key-Repeat</title>
      </Head>
      <Page>
        <Container>
          <Header />
          <VSpacer size="xl" />

          <KeyRepeat />

          <VSpacer size="xxl" />
          <About />
        </Container>
      </Page>
    </>
  );
}
