import { Box, ChakraProvider } from "@chakra-ui/react"
import TopBar from "@/components/TopBar";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TopBar />
      <Box maxWidth="container.xl" margin="auto">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
