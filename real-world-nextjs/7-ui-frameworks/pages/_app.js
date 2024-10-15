import { ChakraProvider, extendTheme } from "@chakra-ui/react"

export default function App({ Component, pageProps }) {
  const customTheme = extendTheme({
    colors: {
      brand: {
        100: '#ffebee',
        200: '#e57373',
        300: '#f44336',
        400: '#e53935',
      },
    }
  })
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
