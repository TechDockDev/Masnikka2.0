import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import "@fontsource/oswald";
import "@fontsource/roboto";

export default function App({ Component, pageProps }) {
   return (
      <ThemeProvider theme={theme}>
         <Component {...pageProps} />
      </ThemeProvider>
   );
}
