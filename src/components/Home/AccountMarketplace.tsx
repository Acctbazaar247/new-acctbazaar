import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

export default function AccountMarketplace() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-[#F8F6F6] text-textBlack" id="about">
      <div className="container flex flex-col-reverse lg:grid grid-cols-2 gap-16 lg:gap-8 2xl:gap-20 px-4 py-20 lg:py-32">
        <div
          className="relative"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Image
            className="w-[95%] lg:w-[512px] h-[275px] lg:h-[430px] 2xl:h-[454px]"
            width={512}
            height={460}
            src={"/assets/home/accounts-marketplace.png"}
            alt="marketplace image"
          />
          <Image
            className="absolute -right-2 lg:right-8 top-[50%] rotate-6 w-16 lg:w-24"
            width={90}
            height={37}
            src={"/assets/home/sd.png"}
            alt="curve line"
          />
        </div>

        <div
          className=""
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h2 className="font-bold text-3xl lg:text-4xl 2xl:text-5xl pb-5">
            Accounts Marketplace
          </h2>
          <p className="pb-10 lg:pb-12 font-medium lg:text-lg 2xl:text-xl leading-7 lg:leading-8 2xl:leading-9">
            At Acctbazaar, we believe in the power of community-driven commerce.
            Explore a diverse marketplace filled with all types of accounts,
            curated by individual sellers just like you. Whether you&apos;re
            searching for games, video, work, or everyday social media accounts,
            our platform connects you directly with sellers passionate about
            providing authentic accounts.
          </p>
          <Link href={"/auth/sign-in"}>
            <button className="appBtn">Purchase an account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
