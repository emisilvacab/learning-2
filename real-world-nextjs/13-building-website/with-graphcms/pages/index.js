import { Grid } from "@chakra-ui/layout";
// const { Grid } = require("@chakra-ui/layout");
import { Inter } from "next/font/google";
import ProductCard from "../components/ProductCard";
import graphql from "@/lib/graphql";
import getAllProducts from "@/lib/graphql/queries/getAllProducts";

export const getStaticProps = async () => {
  const { products } = await graphql.request(getAllProducts);
  return {
    revalidate: 60, // 60 seconds
    props: {
      products,
    },
  };
};

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
}
