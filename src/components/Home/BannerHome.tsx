import React, { useEffect } from "react";
import Link from "next/link";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";

export default function BannerHome() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex relative h-[120dvh] xl:h-[110dvh] overflow-hidden -mt-20  ">
      <img className="w-1/2" src="/assets/home/shadowLeft.png" alt="" />
      <img className="w-1/2" src="/assets/home/shadowRight.png" alt="" />
      <div className="absolute top-0 left-0 w-full h-full pt-20">
        <div
          className="container px-4 w-full h-full flex flex-col lg:flex-row mx-auto"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className="w-full lg:w-1/2 my-auto">
            <h2 className="hidden lg:block font-bold text-3xl lg:text-5xl leading-loose 2xl:text-[54px] pb-3">
              <p>Discover Unique Accounts</p>{" "}
              <p className="mt-3">in our Marketplace</p>
            </h2>
            <h2 className="lg:hidden font-bold text-4xl leading-[47px] pb-3 pr-8">
              Discover Unique Accounts In Our Marketplace
            </h2>
            <p className="text-lg lg:text-xl leading-7 max-w-lg pb-12">
              Enhance your online presence: Preview, verify and acquire geniune
              accounts on AcctBazaar
            </p>
            <Link href={"/auth/sign-up"}>
              <button className="appBtn">Get Started</button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 h-[50%] lg:h-full flex justify-center lg:justify-end items-center">
            <img
              className="w-full lg:w-[90%]"
              src="/assets/home/homeBanner.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
