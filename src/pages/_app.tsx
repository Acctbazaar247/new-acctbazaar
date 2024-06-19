import { Provider } from "react-redux";
import { store } from "@/redux/app/store";

import "@/styles/globals.css";
import "@/styles/homeBannerAndFooter.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import RootLayout from "@/layout/RootLayout";
import { ToastContainer } from "react-toastify";
import { Plus_Jakarta_Sans } from "next/font/google";
import config from "@/utils/config";
import NextTopLoader from 'nextjs-toploader';
import OnDeployment from "@/components/OnDeployment/OnDeployment";

const plus = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Acctbazaar</title>
        <meta name="description" content="Buy and sell social media accounts" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="keywords" content="buy social media accounts, digital products marketplace, purchase VPN services, buy email services online, WhatsApp numbers for sale, buy online subscriptions, secure digital products, social media accounts marketplace, purchase digital files, buy online services, marketplace for digital products, secure social media accounts, buy digital services online, email accounts for sale, buy digital subscriptions, purchase WhatsApp numbers, buy secure VPN services, digital product shopping, secure online accounts, marketplace for online services, buy verified social media accounts, purchase digital goods, digital marketplace for accounts, buy virtual services, online marketplace for digital assets, buy secure email accounts, social media account sellers, buy digital resources, VPN accounts marketplace, purchase social media followers, digital products for sale, secure online purchases, buy verified email services, online accounts marketplace, digital services for sale, buy WhatsApp virtual numbers, online digital products shop, buy online digital assets, secure your digital presence, purchase digital account bundles, buy Facebook account, buy Facebook Dating accounts, buy Facebook Marketplace account, buy USA Facebook accounts, purchase Facebook profiles, buy verified Facebook accounts, Facebook business accounts for sale, buy Facebook page likes, buy Facebook followers, buy aged Facebook accounts, secure Facebook accounts, Facebook accounts marketplace, purchase Facebook advertising accounts, buy Facebook ad accounts, buy Facebook groups, Facebook accounts with followers, buy Facebook engagement, Facebook account packages, verified Facebook accounts for sale, buy Facebook Marketplace sellers, buy Instagram account, buy Instagram followers, buy Instagram influencer accounts, purchase Instagram profiles, buy USA Instagram accounts, buy verified Instagram accounts, Instagram business accounts for sale, buy Instagram page likes, buy Instagram engagement, buy aged Instagram accounts, secure Instagram accounts, Instagram accounts marketplace, purchase Instagram advertising accounts, buy Instagram ad accounts, buy Instagram stories views, Instagram accounts with followers, buy Instagram growth services, Instagram account packages, verified Instagram accounts for sale, buy Instagram influencer profiles" />
        <meta name="author" content="acctbazaar" />
      </Head>

      <NextTopLoader color="#FF5A35" showSpinner={false} crawl={false} shadow={"0 0 0 0"} />

      <Provider store={store}>
        <RootLayout>
          {config.onDevelopment ? (
            <OnDeployment></OnDeployment>
          ) : (
            <main className={plus.className}>
              {/* <GoogleReCaptchaProvider reCaptchaKey={config.captcha as string}> */}
              <Component {...pageProps} />

              {/* </GoogleReCaptchaProvider> */}
            </main>
          )}
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
