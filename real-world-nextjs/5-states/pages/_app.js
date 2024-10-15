import Head from "next/head";
import Navbar from "../components/Navbar";
import cartContext from "../components/context/CartContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [items, setItems] = useState({});

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <cartContext.Provider value={{ items, setItems }}>
        <Navbar />
        <div className="w-9/12 m-auto pt-10">
          <Component {...pageProps} />
        </div>
      </cartContext.Provider>
    </>
  );
}

export default MyApp;
