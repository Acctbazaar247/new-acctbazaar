import { Provider } from "react-redux";
import { store } from "@/redux/app/store";

import "@/styles/globals.css";
import "@/styles/homeBannerAndFooter.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import RootLayout from "@/layout/RootLayout";
import { ToastContainer } from "react-toastify";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Acctbazaar</title>
        <meta name="description" content="Buy and sell social media accounts" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />

        <meta
          name="keywords"
          content="buy, sell, social media accounts, acctbazaar"
        />
        <meta name="author" content="acctbazaar" />
      </Head>
      <Provider store={store}>
        <RootLayout>
          <main className={plus.className}>
            <Component {...pageProps} />
          </main>
        </RootLayout>
      </Provider>
      <ToastContainer
        position="bottom-left"
        hideProgressBar={true}
        autoClose={3500}
        limit={1}
        toastStyle={{ background: "#000" }}
        pauseOnFocusLoss={false}
      ></ToastContainer>
    </>
  );
}
