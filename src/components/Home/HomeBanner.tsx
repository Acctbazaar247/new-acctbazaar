import Link from "next/link";
import React from "react";

type Props = {};

const HomeBanner = (props: Props) => {
  return (
    <div>
      <>
        {/*==================== MAIN ====================*/}
        <main className=" ">
          {/*==================== HOME ====================*/}
          <section className=" ">
            <div className="flex flex-col items-center lg:flex-row justify-between mt-10 gap-5 lg:px-20 ">
              <div className="home__data max-w-[600px]">
                <h1 className="text-2xl mb-4 lg:text-5xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Your Premier P2P Marketplace for Social Media Accounts
                </h1>
                <p className="w-[60%] mx-auto md:m-0 md:w-full">
                  Enhance your online presence: Preview, verify,
                  <br className="md:inline-block hidden" />
                  and acquire geniune accounts on AcctBazaar
                </p>
                <br />
                <div className="social-icons">
                  <div className="social-icon">
                    <img src="/assets/facebook.png" alt="facebook" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/snapchat.png" alt="snapchat" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/whatsapp.png" alt="whatsapp" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/twitter.png" alt="twitter" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/instagram.png" alt="instagram" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/windscribe.png" alt="windscribe" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/tiktok.png" alt="tiktok" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/telegram.png" alt="telegram" />
                  </div>
                </div>
                <div className="btn">
                  <Link
                    href={"/signUp"}
                    className="home__button create_account"
                  >
                    Create Account
                  </Link>
                  <Link href="/signIn" className="home__button ml-4">
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="home__img">
                <img src="/assets/img1.png" alt="" />
                <div className="home__shadow" />
              </div>
            </div>
          </section>
        </main>
      </>
    </div>
  );
};

export default HomeBanner;
