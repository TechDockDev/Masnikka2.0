"use client";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../components/theme";
import "@fontsource/oswald";
import "@fontsource/roboto";
import { AppProvider } from "@/context/AppContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Masnikka</title>
        <meta name="description" content="Masnikka" />
        {/* Add other meta tags, links, etc. here */}
      </Head>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
