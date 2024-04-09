import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";

import Link from "next/link";

export default function BannerSeller() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="flex relative h-[80vh] lg:h-[120dvh] xl:h-[110dvh] -mt-20">
      <img className="w-1/2" src="/assets/seller/shadowLeftBanner.png" alt="" />
      <img className="w-1/2" src="/assets/home/shadowRight.png" alt="" />
      <div className="absolute top-0 left-0 w-full h-full pt-20">
        <div
          className="container px-4 w-full h-full flex items-center justify-center mx-auto"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className=" text-center lg:mb-20">
            <h2 className="max-w-80 lg:max-w-full font-bold text-4xl lg:text-5xl lg:leading-relaxed 2xl:text-[54px] pb-2 lg:pb-0">
              Join our Community of Merchants
            </h2>
            <p className="text-lg lg:text-xl leading-7 pb-6 lg:pb-10">
              Turn your accounts into opportunities
            </p>
            <Link href={"/auth/sign-up"}>
              <button className="appBtn">Become a Merchant</button>
            </Link>
          </div>
        </div>
      </div>

      {/* this is absolute images  */}
      <img
        className="absolute w-[88px] lg:w-[180px] left-8 top-1/4"
        src="/assets/seller/banner1.png"
        alt=""
      />
      <img
        className="absolute w-[88px] lg:w-[180px] right-8 top-[18%]"
        src="/assets/seller/banner2.png"
        alt=""
      />
      <img
        className="absolute w-[100px] lg:w-[220px] left-[5%] lg:left-[15%] bottom-[5%]"
        src="/assets/seller/banner3.png"
        alt=""
      />
      <img
        className="absolute w-[100px] lg:w-[220px] right-[3%] lg:right-[10%] bottom-[3%]"
        src="/assets/seller/banner4.png"
        alt=""
      />
      <img
        className="absolute w-[43px] lg:w-[78px] right-[18%] top-[10%] lg:top-[50%]"
        src="/assets/seller/banner5.png"
        alt=""
      />
      <img
        className="hidden lg:absolute w-[40px] lg:w-[76px] left-[7%] top-[57%]"
        src="/assets/seller/banner6.png"
        alt=""
      />
      <img
        className="absolute w-[40px] lg:w-[76px] left-[35%] bottom-[15%]"
        src="/assets/seller/banner7.png"
        alt=""
      />
      <img
        className="absolute w-[40px] lg:w-[76px] right-[32%] lg:right-[28%] bottom-[3%] lg:bottom-[7%]"
        src="/assets/seller/banner8.png"
        alt=""
      />
      <img
        className="absolute w-[40px] lg:w-[76px] left-[20%] top-[14%] lg:top-[20%]"
        src="/assets/seller/banner9.png"
        alt=""
      />
      <img
        className="absolute w-[20px] lg:w-[36px] left-[15%] top-[56%]"
        src="/assets/seller/star1.png"
        alt=""
      />
      <img
        className="absolute w-[20px] lg:w-[36px] right-8 top-[15%]"
        src="/assets/seller/star1.png"
        alt=""
      />
      <img
        className="absolute w-[14px] lg:w-[26px] left-[26%] bottom-[2%]"
        src="/assets/seller/star2.png"
        alt=""
      />
      <img
        className="absolute w-[14px] lg:w-[26px] right-[17%] lg:right-[27%] bottom-[45%] lg:bottom-[38%]"
        src="/assets/seller/star2.png"
        alt=""
      />
    </div>
  );
}
