import Head from "next/head";
import Navbar from "../components/Navbar";
import { useStore } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialreduxState);

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <Navbar />
        <div className="w-9/12 m-auto pt-10">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
