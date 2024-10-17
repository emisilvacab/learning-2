import "@/styles/globals.css";
import { useState } from "react";
import NavBar from "../components/NavBar";
import CartContext from "../lib/context/Cart";
import theme from "@/theme";
const {
  Box,
  Flex,
  ChakraProvider,
  ColorModeScript,
} = require("@chakra-ui/react");

export default function App({ Component, pageProps }) {
  const [items, setItems] = useState({});

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CartContext.Provider value={{ items, setItems }}>
        <Flex w="full" minH="100vh" bgColor="gray.100">
          <NavBar />
          <Box maxW="70vw" m="auto">
            <Component {...pageProps} />
          </Box>
        </Flex>
      </CartContext.Provider>
    </ChakraProvider>
  );
}
