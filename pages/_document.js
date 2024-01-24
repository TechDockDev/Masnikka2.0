import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Arimo|Arial|Arial+Black|Book+Antiqua|Bookman+Old+Style|Calibri|Cambria|Candara|Century+Gothic|Comic+Sans+MS|Consolas|Courier+New|DejaVu+Sans+Mono|Domine|Domine:wght@700|Domine:wght@700&family=Georgia|Geneva|Gill+Sans|Helvetica|Impact|Liberation+Mono|Lucida+Console|Lucida+Grande|Lucida+Sans+Typewriter|Lucida+Sans+Unicode|Menlo|Monaco|Oswald|Oswald:wght@700|Palatino|Papyrus|Roboto|Roboto:wght@400;700|Snell+Roundhand|Tahoma|Times|Times+New+Roman|Verdana&display=swap"
        ></link> */}
        <link rel="icon" href="/assets/logoSmall.svg" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
