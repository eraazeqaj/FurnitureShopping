import MainLayout from "@/components/MainLayout";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  let title = pageProps.title ?? "My Platform";
  let description = pageProps.description ?? "My Platform Description";
  let image = pageProps.image ?? "https://my-domain/meta.svg";
  let url = pageProps.url ?? "https://my-domain.com";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* Other SEO meta tags */}
      </Head>
      <SessionProvider session = {pageProps.session}> 

      {/* Wrap all pages inside MainLayout */}
      <MainLayout name={title}>
        <Component {...pageProps} />
      </MainLayout>
      </SessionProvider>
    </>
  );
}

