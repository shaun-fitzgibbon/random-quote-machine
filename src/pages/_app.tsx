import { type AppType } from "next/dist/shared/lib/utils";
import Script from "next/script";

import "@/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{`🦾 Random quote machine`}</title>
        <meta
          name="description"
          content="fetches random famous quotes from the internet"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <Script
        async
        defer
        src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
