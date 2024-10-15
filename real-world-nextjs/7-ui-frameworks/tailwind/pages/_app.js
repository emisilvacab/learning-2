import { ThemeProvider } from "next-themes";
import TopBar from "../components/TopBar";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return (
    // attribute="class" will set a "dark" CSS class
    // to the main <html> tag
    <ThemeProvider attribute="class">
      <div className="dark:bg-gray-900 bg-gray-50 w-full min-h-screen">
        <TopBar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
