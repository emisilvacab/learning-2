import { useContext, useEffect, useState } from "react";
import cartContext from "../lib/context/Cart";
const { Box, Divider, Text, Flex, Button, Link } = require("@chakra-ui/react");
import getProductsById from "../lib/graphql/queries/getProductsById";
import graphql from "../lib/graphql";

export default function Cart() {
  const { items } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const hasProducts = Object.keys(items).length;

  useEffect(() => {
    // only fetch data if user has selected any product
    if (!hasProducts) return;

    graphql
      .request(getProductsById, {
        ids: Object.keys(items),
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.error(err));
  }, [JSON.stringify(products)]);

  function getTotal() {
    if (!products.length) return 0;
    return Object.keys(items)
      .map(
        (id) =>
          products.find((product) => product.id === id).price *
          (items[id] / 100)
        // Stripe requires the prices to be
        // integers (i.e., €4.99 should be
        // written as 499). That's why
        // we need to divide by 100 the prices
        // we get from GraphCMS, which are
        // already in the correct
        // Stripe format
      )
      .reduce((x, y) => x + y)
      .toFixed(2);
  }

  return (
    <Box rounded="xl" boxShadow="2xl" w="container.lg" p="16" bgColor="white">
      <Text as="h1" fontSize="2xl" fontWeight="bold" textColor="black">
        Cart
      </Text>
      <Divider my="10" />
      <Box>
        {!hasProducts ? (
          <Text textColor="black">The cart is empty.</Text>
        ) : (
          <>
            {products.map((product) => (
              <Flex key={product.id} justifyContent="space-between" mb="4">
                <Box>
                  <Link href={`/product/${product.slug}`} passHref>
                    <Text
                      as="div"
                      fontWeight="bold"
                      textColor="gray.500"
                      _hover={{
                        textDecoration: "underline",
                        color: "blue.500",
                      }}
                    >
                      {product.name}
                      <Text as="span" color="gray.500">
                        {" "}
                        x{items[product.id]}
                      </Text>
                    </Text>
                  </Link>
                </Box>
                <Box>
                  €{(items[product.id] * (product.price / 100)).toFixed(2)}
                </Box>
              </Flex>
            ))}
            <Divider my="10" />
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold" textColor="black">
                Total: €{getTotal()}
              </Text>
              <Button colorScheme="blue"> Pay now </Button>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
}
