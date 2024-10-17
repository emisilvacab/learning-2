// theme.js
const { extendTheme } = require("@chakra-ui/react");

const theme = extendTheme({
  config: {
    initialColorMode: "light",  // Puedes cambiar a "dark" si prefieres el modo oscuro por defecto
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  fonts: {
    heading: "'Open Sans', sans-serif",
    body: "'Roboto', sans-serif",
  },
  // Puedes añadir más configuraciones personalizadas aquí
});

export default theme;
