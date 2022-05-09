import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/fonts.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
