'use client';
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import "@fontsource/oswald";
import "@fontsource/roboto";
import { AppProvider } from "@/context/AppContext";


export default function App({ Component, pageProps }) {

   return (
      <ThemeProvider theme={theme}>
         <AppProvider>
            <Component {...pageProps} />
         </AppProvider>
      </ThemeProvider>
   );
}
